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
  @Input('image') imgURL: any; // to store the base64 of asset image.
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
  asset: any;
  derivedSignals: any = [];
  showAssoc = true;
  showUnassoc = true;
  draggingChildAssetIx: number = null;
  grabOffset: any = null;
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
    });
    this.getChildAssets();
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
        this.asset = response[0];
        for(const childAsset of this.asset.node) {
          childAsset.associated = false;
        }
        this.isGetChildAssetsAPILoading = false;
      },
        error => {
          this.isGetChildAssetsAPILoading = false;
        });
  }


  getLocationSignalAssociation() {
    this.isGetassociatedChildAssetsAPILoading = true;
    this.locationSignalService.getSignalAssociation(this.parentLocationId)
      .subscribe(
        response => {
          this.isGetassociatedChildAssetsAPILoading = false;
          for (let i = 0; i < response.length; i++) {
            const signal = response[i];
            signal.imageCordinates = signal.imageCordinates[signal.associationName];
            signal.pos = {};
            signal.pos['left'] = signal.imageCordinates.x;
            signal.pos['top'] = signal.imageCordinates.y;
            signal.isClicked = false;
            signal.icon = 'icon-sig-humidity';
            signal.associated = true;
            signal.id = i;
          }
          this.associatedChildAssets = [...response];
        },
        error => {
          this.isGetassociatedChildAssetsAPILoading = false;
        }
      );
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
    console.log(index1);
    this.draggingChildAssetIx = event.srcElement.getAttribute('assetIx');
    this.grabOffset = { x: event.offsetX, y: event.offsetY };
  }

  onDrop(event: any) {

    event.data.pos = {
      left: (((event.event.layerX - this.grabOffset.x + 16) / event.event.srcElement.offsetParent.offsetWidth) * 100.0).toFixed(2),
      top: (((event.event.layerY - this.grabOffset.y + 16) / event.event.srcElement.offsetParent.offsetHeight) * 100.0).toFixed(2)
    };
      // event.data.pos = { 'left.%': pos.left, 'top.%': pos.top };

    console.log(event.data.pos.left, '========', event.data.pos.top);
    if (!event.data.associated) {
      event.data.associated = true;
      event.data.assetid = this.associatedChildAssets.length;
      event.data.isClicked = false;
      this.associatedChildAssets.push(event.data);
      this.asset.node[this.draggingChildAssetIx].associated = true;
    } else {
      let assetid = this.associatedChildAssets.findIndex(asset => asset.assetid === event.data.assetid);
      this.associatedChildAssets[assetid]['pos'] = event.data.pos;
    }
    this.closeAllIconsDisplay();
    const index = this.associatedChildAssets.findIndex(asset => asset.assetid === event.data.assetid);
    this.associatedChildAssets[index].isClicked = true;

    setTimeout( () => {
      const elem = this.eleRef.nativeElement.querySelector('#asset_edit_' + index);
      console.log(elem);
      if (elem) {
        elem.dispatchEvent(new Event('click'));
      }
    }, 50);
    console.log(this.associatedChildAssets);
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
    console.log(this.associatedChildAssets);
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

  onSaveSignalAssociation() {
    console.log(this.associatedChildAssets);
    this.editOPanel.hide();
    this.isChildAssetAssociationAPILoading = true;
    const data = this.associatedChildAssets.map(asset => {
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
    console.log(data);
    this.assetService.addParentChildAssetAssociation(this.assetId, data)
      .subscribe(
        response => {
          console.log(response);
          // this.asset = undefined;
          this.selectedChildAsset = undefined;
          this.toaster.onSuccess('Child Asset associated successfully', 'Saved');
          // this.getLocationSignalAssociation();
          this.isChildAssetAssociationAPILoading = false;

        }, error => {
          this.toaster.onFailure('Error while saving child asset assocition', 'Error');
          this.isChildAssetAssociationAPILoading = false;
        }
      );
  }

  // end


  onCancelClick(event) {
    this.routerLocation.back();
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
