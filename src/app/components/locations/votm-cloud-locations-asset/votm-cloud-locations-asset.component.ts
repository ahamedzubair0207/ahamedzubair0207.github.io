import { async } from '@angular/core/testing';
import { SharedService } from 'src/app/services/shared.service';
import { LocationService } from './../../../services/locations/location.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Toaster } from '../../shared/votm-cloud-toaster/votm-cloud-toaster';
import { OverlayPanel } from 'primeng/overlaypanel';
import { Alert } from 'src/app/models/alert.model';
import { Asset } from 'src/app/models/asset.model';
import { Location } from 'src/app/models/location.model';
import { ActivatedRoute, Router } from '@angular/router';
import { AssetsService } from 'src/app/services/assets/assets.service';
import { DomSanitizer } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { Location as RouterLocation } from '@angular/common';

@Component({
  selector: 'app-votm-cloud-locations-asset',
  templateUrl: './votm-cloud-locations-asset.component.html',
  styleUrls: ['./votm-cloud-locations-asset.component.scss']
})
export class VotmCloudLocationsAssetComponent implements OnInit {

  imgURL: any; // to store the base64 of asset image.
  modal: any;
  availableSignals: any[] = []; // to store list of available signals based on sensors.
  copyAvailableSignals: any[] = []; // to store list of available signals based on sensors.
  associatedAssets: any[] = [];
  selectedChildAsset; // selected signal to display overlay panel.
  location: Location; // to store selected asset's data
  assetImageURL: any;
  display: string; // to store thedisplay style value of bootstrap modal pf add calculated signal
  toaster: Toaster = new Toaster(this.toastr);
  isGetChildAssetsAPILoading = false; // flag for loader for get available signals api
  isGetassociatedAssetsAPILoading = false; // flag for loader for get associated signals api
  isCreateSignalAssociationAPILoading = false; // flag for loader for create signals association api
  curOrganizationId: string;
  curOrganizationName: string;
  locationId: string;
  locationName: string;
  @ViewChild('editOP', null) editOPanel: OverlayPanel; // signal association edit modal refference
  @ViewChild('alertOP', null) alertOPanel: OverlayPanel; // signal association alert modal refference
  alertRules: Alert[] = [];
  isAlarmRuleAssociationAPILoading = false;
  isChildAssetAssociationAPILoading = false;
  selectedAlertRule: Alert;
  assetsList: any[] = [];
  derivedSignals: any = [];
  showAssoc = true;
  disable = true;
  showUnassoc = false;
  draggingChildAssetIx: number = null;
  grabOffset: any = null;
  asset: Asset;
  pageType: string;
  constructor(
    private activatedRoute: ActivatedRoute,
    private route: Router,
    private sharedService: SharedService,
    private locationService: LocationService,
    private assetService: AssetsService,
    private domSanitizer: DomSanitizer,
    private toastr: ToastrService
  ) { }

  ngOnInit() {

    this.pageType = this.activatedRoute.snapshot.data['type'];
    console.log(this.pageType);
    if (this.pageType.toLowerCase() === 'edit') {
      this.toggleDisable();
    }
    this.activatedRoute.paramMap.subscribe(params => {
      console.log(params);
      this.curOrganizationId = params.get('curOrgId');
      this.curOrganizationName = params.get('curOrgName');
      this.locationId = params.get('locId');
      this.getLocationById();
    });

  }

  getLocationById() {
    this.locationService.getLocationById(this.locationId).subscribe(
      response => {
        this.location = response;
        if (this.location.logo && this.location.logo.imageName) {
          let fileExtension = this.location.logo.imageName.slice(
            (Math.max(0, this.location.logo.imageName.lastIndexOf('.')) || Infinity) + 1);
          // For svg type files use svg+xml as extention
          if (fileExtension === 'svg') {
            fileExtension = 'svg+xml';
          }
          this.imgURL = this.domSanitizer.bypassSecurityTrustUrl(`data:image/${fileExtension};base64,${this.location.logo.image}`);
        } else {
          this.imgURL = '../../../../assets/images/default-image-svg.svg';
        }
        this.getAssets();
      }
    );
  }

  /**
   * To get all available signals for that location and organization.
   * Location id and Organization Id will fetch from current route.
   * This function sets the sensor disable which are already associated.
   */
  getAssets() {
    this.isGetChildAssetsAPILoading = true;
    this.assetService.getAssetTreeByLocId(this.locationId)
      .subscribe(async response => {
        // const list = [];
        // for (const childAsset of this.assetsList) {
        //   childAsset.associated = false;
        //   childAsset.icon = 'icon-asset-robot';
        //   childAsset.associationName = childAsset.name;
        //   childAsset.associated = false;
        // }
        response = await this.getAssetChildNode(response, []);
        this.assetsList = this.sharedService.toSortListAlphabetically(response, 'name');
        console.log('aftererrrrrrrrrrrrrrr ', this.assetsList.length);
        this.getAssetAssociation();
        this.isGetChildAssetsAPILoading = false;
      },
        () => {
          this.isGetChildAssetsAPILoading = false;
        });
  }

  getAssetChildNode(assets, actualAssets) {
    for (const item of assets) {
      item.associated = false;
      item.icon = 'icon-asset-robot';
      item.associationName = item.name;
      item.associated = false;
      actualAssets.push(item);
    }
    return actualAssets;
  }

  getAssetAssociation() {
    this.isGetassociatedAssetsAPILoading = true;
    this.locationService.getAssetAssociation(this.locationId)
      .subscribe(
        response => {
          this.isGetassociatedAssetsAPILoading = false;
          for (let i = 0; i < response.length; i++) {
            const childAsset = response[i];
            childAsset.isClicked = false;
            childAsset.icon = 'icon-asset-robot';
            childAsset.associated = true;
            childAsset.did = i;
            childAsset.bound = true;
            childAsset.imageCordinates = childAsset.imageCoordinates[childAsset.assetId];
            childAsset.pctPos = {};

            childAsset.pctPos['left'] = childAsset.imageCordinates.x;
            childAsset.pctPos['top'] = childAsset.imageCordinates.y;
          }
          this.associatedAssets = [...response];
          for (let i = 0; i < this.assetsList.length; i++) {
            const childAsset = this.assetsList[i];
            const index = this.associatedAssets.findIndex(assChild => assChild.assetId === childAsset.id);
            console.log(index);
            if (index !== -1) {
              childAsset.associated = true;
              console.log(this.location);
              this.associatedAssets[index].organizationId = this.location.organizationId;
              this.associatedAssets[index].locationId = this.location.locationId;
              this.associatedAssets[index].locationName = this.location.locationName;
              this.associatedAssets[index].associationName = childAsset.name;
              console.log(this.associatedAssets[index]);
            } else {
              childAsset.pctPos = { left: 0, top: 0};
              childAsset.isClicked = false;
              childAsset.icon = 'icon-asset-robot';
              childAsset.associated = true;
              childAsset.did = this.associatedAssets.length;
              childAsset.bound = true;
              this.associatedAssets.push(childAsset);
            }
          }
          console.log('aftererrrrrrrrrrrrr    ', this.associatedAssets.length);

        },
        () => {
          this.isGetassociatedAssetsAPILoading = false;
        }
      );
  }

  toggleDisable() {
    this.disable = !this.disable;
    this.showUnassoc = !this.disable;
  }

  onSaveChildAssetAssociation(associatedAssets) {
    const data = associatedAssets.map(asset => {
      console.log(asset);
      const obj = {
        locationId: this.locationId,
        assetId: asset.assetMappingId ? asset.assetId : asset.id,
        imageCoordinates: {},
        assetMappingId: asset.assetMappingId ? asset.assetMappingId : null
      };
      obj.imageCoordinates[asset.associationName] = {
        x: asset.pctPos['left'],
        y: asset.pctPos['top']
      };
      return obj;
    });
    this.locationService.addAssetAssociation(data)
      .subscribe(
        () => {
          // this.asset = undefined;
          this.associatedAssets = [];
          this.toaster.onSuccess('Asset associated successfully', 'Saved');
          this.getAssets();
          this.toggleDisable();
        }, () => {
          this.toaster.onFailure('Error while saving asset assocition', 'Error');
        }
      );
  }

  onReset() {
    this.getAssets();
    this.toggleDisable();
  }

  onReturnToList() {
    this.route.navigate(['loc', 'home', this.curOrganizationId, this.curOrganizationName]);
  }

}

