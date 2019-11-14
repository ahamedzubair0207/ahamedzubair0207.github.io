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
    private routerLocation: RouterLocation,
    private locationSignalService: LocationSignalService,
    private assetService: AssetsService,
    private alertsService: AlertsService,
    private domSanitizer: DomSanitizer,
    private toastr: ToastrService,
    private eleRef: ElementRef
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
          const fileExtension = this.asset.logo.imageName.slice(
            (Math.max(0, this.asset.logo.imageName.lastIndexOf('.')) || Infinity) + 1);
          this.imgURL = this.domSanitizer.bypassSecurityTrustUrl(`data:image/${fileExtension};base64,${this.asset.logo.image}`);
        } else {
          this.imgURL = '../../../../assets/images/default-image-svg.svg';
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
      .subscribe(response => {
        this.childAssets = response[0].node;
        for (const childAsset of this.childAssets) {
          childAsset.associated = false;
          childAsset.icon = 'icon-asset-robot';
          childAsset.associationName = childAsset.name;
          childAsset.associated = false;
        }
        this.getChildAssetAssociation();
        this.isGetChildAssetsAPILoading = false;
      },
        error => {
          this.isGetChildAssetsAPILoading = false;
        });
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
              childAsset.did = i;
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
        assetMappingId: asset.assetMappingId ? asset.assetMappingId : undefined
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

}
