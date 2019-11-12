import { LocationService } from './../../../services/locations/location.service';
import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Toaster } from '../../shared/votm-cloud-toaster/votm-cloud-toaster';
import { OverlayPanel } from 'primeng/overlaypanel';
import { Alert } from 'src/app/models/alert.model';
import { Asset } from 'src/app/models/asset.model';
import { Location } from 'src/app/models/location.model';
import { ActivatedRoute, Router } from '@angular/router';
import { LocationSignalService } from 'src/app/services/locationSignal/location-signal.service';
import { AssetsService } from 'src/app/services/assets/assets.service';
import { AlertsService } from 'src/app/services/alerts/alerts.service';
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
  constructor(
    private activatedRoute: ActivatedRoute,
    private route: Router,
    private routerLocation: RouterLocation,
    private locationSignalService: LocationSignalService,
    private locationService: LocationService,
    private assetService: AssetsService,
    private domSanitizer: DomSanitizer,
    private toastr: ToastrService,
    private eleRef: ElementRef
  ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      console.log(params);
      this.curOrganizationId = params.get('curOrgId');
      this.curOrganizationName = params.get('curOrgName');
      this.locationId = params.get('locId');
      this.getLocationById();
      this.disable = true;
      this.showUnassoc = false;
    });
    this.getAssets();
  }

  getLocationById() {
    this.locationService.getLocationById(this.locationId).subscribe(
      response => {
        this.location = response;
        if (this.location.logo && this.location.logo.imageName) {
          const fileExtension = this.location.logo.imageName.slice(
            (Math.max(0, this.location.logo.imageName.lastIndexOf('.')) || Infinity) + 1);
          this.imgURL = this.domSanitizer.bypassSecurityTrustUrl(`data:image/${fileExtension};base64,${this.location.logo.image}`);
        } else {
          this.imgURL = '../../../../assets/images/default-image.svg';
        }
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
      .subscribe(response => {
        this.assetsList = response;
        for (const childAsset of this.assetsList) {
          childAsset.associated = false;
          childAsset.icon = 'icon-asset-robot';
          childAsset.associationName = childAsset.name;
          childAsset.associated = false;
        }
        for (let i = 0; i < this.assetsList.length; i++) {
          const asset = {...this.assetsList[i]};
          asset.pos = {};
          // asset.pos['left'] = asset.imageCordinates.x;
          // asset.pos['top'] = asset.imageCordinates.y;
          asset.isClicked = false;
          asset.icon = 'icon-sig-humidity';
          asset.associated = true;
          asset.did = i;
          asset.bound = true;
          this.associatedAssets.push(asset);
        }
        this.isGetChildAssetsAPILoading = false;
      },
        error => {
          this.isGetChildAssetsAPILoading = false;
        });
  }


  getAssetAssociation() {
    this.isGetassociatedAssetsAPILoading = true;


    // this.locationSignalService.getSignalAssociation(this.parentLocationId)
    //   .subscribe(
    //     response => {
    //       this.isGetassociatedAssetsAPILoading = false;
    //       for (let i = 0; i < response.length; i++) {
    //         const signal = response[i];
    //         signal.imageCordinates = signal.imageCordinates[signal.associationName];
    //         signal.pos = {};
    //         signal.pos['left'] = signal.imageCordinates.x;
    //         signal.pos['top'] = signal.imageCordinates.y;
    //         signal.isClicked = false;
    //         signal.icon = 'icon-sig-humidity';
    //         signal.associated = true;
    //         signal.id = i;
    //       }
    //       this.associatedAssets = [...response];
    //     },
    //     error => {
    //       this.isGetassociatedAssetsAPILoading = false;
    //     }
    //   );
  }

  toggleDisable() {
    this.disable = !this.disable;
    this.showUnassoc = !this.disable;
  }

  showSignal(signal: any): boolean {
    return (signal.associated && this.showAssoc) || ((!signal.associated) && this.showUnassoc);
  }

  showSensor(signals: any): boolean {
    let hasAssocSignals = false;
    signals.forEach(signal => {
      hasAssocSignals = hasAssocSignals || ((signal.associated && this.showAssoc) || ((!signal.associated) && this.showUnassoc));
    });
    return hasAssocSignals;
  }



  onStart(event: any, index1) {
    this.closeEditOpanel();
    this.draggingChildAssetIx = event.srcElement.getAttribute('assetIx');
    this.grabOffset = { x: event.offsetX, y: event.offsetY };
  }

  getPositionStyle(signal) {
    const style = {
      left: 'calc(' + signal.pos.left + '% - 16px)',
      top: 'calc(' + signal.pos.top + '% - 16px)'
    };
    return style;
  }

  onClickOfAssociatedSignal(signal) {

    signal.isClicked = !signal.isClicked;
    this.selectedChildAsset = {...signal};
  }

  onClickOfEditIcon(index, event) {
    this.associatedAssets[index].isClicked = true;
    this.selectedChildAsset = this.associatedAssets[index];
    this.selectedChildAsset.imageCordinates = {
      x:  this.selectedChildAsset.pos['left'],
      y: this.selectedChildAsset.pos['top']
    };
    this.editOPanel.show(event);
    event.preventDefault();
    event.stopPropagation();
    event.cancelBubble = true;
  }

  closeAllIconsDisplay() {
    this.associatedAssets.forEach(signal => signal.isClicked = false);
  }


  onClickOfSaveSignalAssociationPanel() {
    this.selectedChildAsset.pos = {
      left: this.selectedChildAsset.imageCordinates.x,
      top: this.selectedChildAsset.imageCordinates.y
    };
    const index = this.associatedAssets.findIndex(
      signal => signal.signalId === this.selectedChildAsset.signalId &&
      signal.sensorId === this.selectedChildAsset.sensorId
    );
    this.associatedAssets.splice(index, 1, this.selectedChildAsset);
    this.closeEditOpanel();
  }

  closeEditOpanel() {
    this.editOPanel.hide();
    if (this.selectedChildAsset) {
      const index = this.associatedAssets.findIndex(
        signal => signal.signalId === this.selectedChildAsset.signalId &&
        signal.sensorId === this.selectedChildAsset.sensorId
      );
      this.associatedAssets[index].isClicked = false;
    }
  }

  onSaveChildAssetAssociation(associatedAssets) {
    // const data = associatedAssets.map(asset => {
    //   const obj = {
    //     locationId: this.parentLocationId,
    //     parentAssetId: this.assetId,
    //     childAssetId: asset.id,
    //     imageCoordinates: {},
    //     name: asset.name,
    //     assetMappingId: asset.assetMappingId ? asset.assetMappingId : undefined
    //   };
    //   obj.imageCoordinates[asset.name] = {
    //     x: asset.pos['left'],
    //     y: asset.pos['top']
    //   };
    //   return obj;
    // });
    // this.assetService.addParentChildAssetAssociation(this.assetId, data)
    //   .subscribe(
    //     response => {
    //       // this.asset = undefined;
    //       this.associatedAssets = [];
    //       this.toaster.onSuccess('Child Asset associated successfully', 'Saved');
    //       this.getChildAssets();
    //     }, error => {
    //       this.toaster.onFailure('Error while saving child asset assocition', 'Error');
    //     }
    //   );
  }

  // end

  onCancelClick(event) {
    this.routerLocation.back();
  }

  onReset() {
    this.getAssets();
    this.toggleDisable();
  }


  openmodal() {
   // Get the modal
   var modal = document.getElementById('alertModal');
   modal.style.display = 'block';
   this.modal = document.getElementById('alertModal');

   // When the user clicks anywhere outside of the modal, close it
   window.onclick = function (event) {
     if (event.target == modal) {
       // modal.style.display = 'none';
     }
   };
  }

}

