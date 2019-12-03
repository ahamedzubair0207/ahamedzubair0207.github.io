import { SharedService } from 'src/app/services/shared.service';
import { AssetsService } from './../../../services/assets/assets.service';
import { Alert } from './../../../models/alert.model';
import { AlertsService } from 'src/app/services/alerts/alerts.service';
import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit, ViewEncapsulation, ElementRef, Input } from '@angular/core';
import { Location as RouterLocation } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { OverlayPanel } from 'primeng/overlaypanel';
import { LocationService } from 'src/app/services/locations/location.service';
import { DomSanitizer } from '@angular/platform-browser';
import { LocationSignalService } from '../../../services/locationSignal/location-signal.service';
import { ToastrService } from 'ngx-toastr';
import { Toaster } from '../../shared/votm-cloud-toaster/votm-cloud-toaster';
import { Location } from 'src/app/models/location.model';
import { Asset } from 'src/app/models/asset.model';
declare var $: any;

@Component({
  selector: 'app-votm-cloud-asset-child',
  templateUrl: './votm-cloud-asset-child.component.html',
  styleUrls: ['./votm-cloud-asset-child.component.scss']
})
export class VotmCloudAssetChildComponent implements OnInit {

  // tslint:disable-next-line: no-input-rename
  imgURL: any; // to store the base64 of asset image.
  modal: any;
  availableSignals: any[] = []; // to store list of available signals based on sensors.
  copyAvailableSignals: any[] = []; // to store list of available signals based on sensors.
  associatedChildAssets: any[] = [];
  selectedChildAsset; // selected signal to display overlay panel.
  location: Location = new Location(); // to store selected asset's data
  assetImageURL: any;
  display: string; // to store thedisplay style value of bootstrap modal pf add calculated signal
  toaster: Toaster = new Toaster(this.toastr);
  isGetChildAssetsAPILoading = false; // flag for loader for get available signals api
  isGetassociatedChildAssetsAPILoading = false; // flag for loader for get associated signals api
  isCreateSignalAssociationAPILoading = false; // flag for loader for create signals association api
  curOrganizationId: string;
  curOrganizationName: string;
  parentLocationId: string;
  parentLocationName: string;
  parentAssetId: string;
  parentAssetName: string;
  assetId: string;
  @ViewChild('editOP', null) editOPanel: OverlayPanel; // signal association edit modal refference
  @ViewChild('alertOP', null) alertOPanel: OverlayPanel; // signal association alert modal refference
  alertRules: Alert[] = [];
  isAlarmRuleAssociationAPILoading = false;
  isChildAssetAssociationAPILoading = false;
  selectedAlertRule: Alert;
  childAssets: any[] = [];
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
    private assetService: AssetsService,
    private alertsService: AlertsService,
    private domSanitizer: DomSanitizer,
    private toastr: ToastrService,
  ) { }

  ngOnInit() {
    this.pageType = this.activatedRoute.snapshot.data['type'];
    if (this.pageType.toLowerCase() === 'edit') {
      this.toggleDisable();
    }
    this.activatedRoute.paramMap.subscribe(params => {
      this.curOrganizationId = params.get('parentOrgId');
      this.curOrganizationName = params.get('parentOrgName');
      this.parentLocationId = params.get('parentLocId');
      this.parentLocationName = params.get('parentLocName');
      this.parentAssetId = params.get('parentAssetId');
      this.parentAssetName = params.get('parentAssetName');
      this.assetId = params.get('assetId');
      this.getAssetById();
    });

  }

  getAssetById() {
    this.assetService.getAssetById(this.assetId).subscribe(
      response => {
        this.asset = response;
        if (this.asset.logo && this.asset.logo.imageName) {
          let fileExtension = this.asset.logo.imageName.slice(
            (Math.max(0, this.asset.logo.imageName.lastIndexOf('.')) || Infinity) + 1);
          // For svg type files use svg+xml as extention
          if (fileExtension === 'svg') {
            fileExtension = 'svg+xml';
          }
          this.imgURL = this.domSanitizer.bypassSecurityTrustUrl(`data:image/${fileExtension};base64,${this.asset.logo.image}`);
        } else {
          this.imgURL = '../../../../assets/images/assetPlaceholder.svg';
        }
        this.getChildAssets();
      }
    );
  }

  /**
   * To get all available signals for that location and organization.
   * Location id and Organization Id will fetch from current route.
   * This function sets the sensor disable which are already associated.
   */
  getChildAssets() {
    console.log(this.assetId);
    this.isGetChildAssetsAPILoading = true;
    this.assetService.getAssetTreeByAssetId(this.assetId)
      .subscribe(async response => {
        response = await this.getAssetChildNode(response[0].node, []);
        this.childAssets = this.sharedService.toSortListAlphabetically(response, 'name');
        this.getChildAssetAssociation();
        this.isGetChildAssetsAPILoading = false;
      },
        error => {
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


  getChildAssetAssociation() {
    this.isGetassociatedChildAssetsAPILoading = true;
    this.assetService.getParentChildAssetAssociation(this.assetId)
      .subscribe(
        response => {
          this.isGetassociatedChildAssetsAPILoading = false;
          for (let i = 0; i < response.length; i++) {
            const childAsset = response[i];
            childAsset.isClicked = false;
            childAsset.icon = 'icon-asset-robot';
            childAsset.associated = true;
            childAsset.did = i;
            childAsset.bound = true;
            childAsset.imageCordinates = childAsset.imageCoordinates[childAsset.childAssetId];
            childAsset.pctPos = {};
            childAsset.pctPos['left'] = childAsset.imageCordinates.x;
            childAsset.pctPos['top'] = childAsset.imageCordinates.y;
          }
          this.associatedChildAssets = [...response];
          for (let i = 0; i < this.childAssets.length; i++) {
            const childAsset = this.childAssets[i];
            const index = this.associatedChildAssets.findIndex(assChild => assChild.childAssetId === childAsset.id);
            console.log(index);
            if (index !== -1) {
              childAsset.associated = true;
              this.associatedChildAssets[index].organizationId = this.asset.organizationId;
              this.associatedChildAssets[index].organizationName = this.asset.organizationName;
              this.associatedChildAssets[index].parentAssetId = this.asset.assetId;
              this.associatedChildAssets[index].parentAssetName = this.asset.assetName;
              this.associatedChildAssets[index].locationId = this.asset.locationId;
              this.associatedChildAssets[index].locationName = this.asset.locationName;
              this.associatedChildAssets[index].associationName = childAsset.name;
              console.log(this.associatedChildAssets[index]);
            } else {
              childAsset.pctPos = { left: 0, top: 0};
              childAsset.isClicked = false;
              childAsset.icon = 'icon-asset-robot';
              childAsset.associated = true;
              childAsset.did = this.associatedChildAssets.length;
              childAsset.bound = true;
              this.associatedChildAssets.push(childAsset);
            }
          }
          console.log(JSON.stringify(this.associatedChildAssets));

        },
        error => {
          this.isGetassociatedChildAssetsAPILoading = false;
        }
      );
  }
  toggleDisable() {
    this.disable = !this.disable;
    this.showUnassoc = !this.disable;
  }


  onSaveChildAssetAssociation(associatedChildAssets) {
    const data = associatedChildAssets.map(asset => {
      console.log(asset);
      const obj = {
        locationId: this.parentLocationId,
        parentAssetId: this.assetId,
        childAssetId: asset.assetMappingId ? asset.childAssetId : asset.id,
        imageCoordinates: {},
        name: asset.name,
        assetMappingId: asset.assetMappingId ? asset.assetMappingId : null
      };
      obj.imageCoordinates[asset.associationName] = {
        x: asset.pctPos['left'],
        y: asset.pctPos['top']
      };
      return obj;
    });
    this.assetService.addParentChildAssetAssociation(this.assetId, data)
      .subscribe(
        response => {
          // this.asset = undefined;
          this.associatedChildAssets = [];
          this.toaster.onSuccess('Child Asset associated successfully', 'Saved');
          this.getChildAssets();
          this.toggleDisable();
        }, error => {
          this.toaster.onFailure('Error while saving child asset assocition', 'Error');
        }
      );
  }

  onReset() {
    this.getChildAssets();
    this.toggleDisable();
  }

  onReturnToList() {
    if (this.parentLocationId) {
      this.route.navigate(['asset', 'home', this.curOrganizationId, this.curOrganizationName, this.parentLocationId]);
      return;
    }
    this.route.navigate(['asset', 'home', this.curOrganizationId, this.curOrganizationName]);
  }

}
