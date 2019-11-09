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
    this.getChildAssets();
  }

  getAssetById() {
    this.assetService.getAssetById(this.assetId).subscribe(
      response => {
        this.asset = response;
        if (this.asset.logo && this.asset.logo.imageName) {
          const fileExtension = this.asset.logo.imageName.slice(
            (Math.max(0, this.asset.logo.imageName.lastIndexOf('.')) || Infinity) + 1);
          this.imgURL = this.domSanitizer.bypassSecurityTrustUrl(`data:image/${fileExtension};base64,${this.asset.logo.image}`);
        }
      }
    );
  }

  /**
   * To get all available signals for that location and organization.
   * Location id and Organization Id will fetch from current route.
   * This function sets the sensor disable which are already associated.
   */
  getChildAssets() {
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
        for (let i = 0; i < this.childAssets.length; i++) {
          const asset = {...this.childAssets[i]};
          asset.pos = {};
          // asset.pos['left'] = asset.imageCordinates.x;
          // asset.pos['top'] = asset.imageCordinates.y;
          asset.isClicked = false;
          asset.icon = 'icon-sig-humidity';
          asset.associated = true;
          asset.did = i;
          asset.bound = true;
          this.associatedChildAssets.push(asset);
        }
        this.isGetChildAssetsAPILoading = false;
      },
        error => {
          this.isGetChildAssetsAPILoading = false;
        });
  }


  getChildAssetAssociation() {
    this.isGetassociatedChildAssetsAPILoading = true;


    // this.locationSignalService.getSignalAssociation(this.parentLocationId)
    //   .subscribe(
    //     response => {
    //       this.isGetassociatedChildAssetsAPILoading = false;
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
    //       this.associatedChildAssets = [...response];
    //     },
    //     error => {
    //       this.isGetassociatedChildAssetsAPILoading = false;
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
    this.associatedChildAssets[index].isClicked = true;
    this.selectedChildAsset = this.associatedChildAssets[index];
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
    this.associatedChildAssets.forEach(signal => signal.isClicked = false);
  }


  onClickOfSaveSignalAssociationPanel() {
    this.selectedChildAsset.pos = {
      left: this.selectedChildAsset.imageCordinates.x,
      top: this.selectedChildAsset.imageCordinates.y
    };
    const index = this.associatedChildAssets.findIndex(
      signal => signal.signalId === this.selectedChildAsset.signalId &&
      signal.sensorId === this.selectedChildAsset.sensorId
    );
    this.associatedChildAssets.splice(index, 1, this.selectedChildAsset);
    this.closeEditOpanel();
  }

  closeEditOpanel() {
    this.editOPanel.hide();
    if (this.selectedChildAsset) {
      const index = this.associatedChildAssets.findIndex(
        signal => signal.signalId === this.selectedChildAsset.signalId &&
        signal.sensorId === this.selectedChildAsset.sensorId
      );
      this.associatedChildAssets[index].isClicked = false;
    }
  }

  onSaveChildAssetAssociation(associatedChildAssets) {
    const data = associatedChildAssets.map(asset => {
      const obj = {
        locationId: this.parentLocationId,
        parentAssetId: this.assetId,
        childAssetId: asset.id,
        imageCoordinates: {},
        name: asset.name,
        assetMappingId: asset.assetMappingId ? asset.assetMappingId : undefined
      };
      obj.imageCoordinates[asset.name] = {
        x: asset.pos['left'],
        y: asset.pos['top']
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
        }, error => {
          this.toaster.onFailure('Error while saving child asset assocition', 'Error');
        }
      );
  }

  // end

  onCancelClick(event) {
    this.routerLocation.back();
  }

  onReset() {
    this.getChildAssets();
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
