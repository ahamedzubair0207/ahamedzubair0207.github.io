import { Alert } from './../../../models/alert.model';
import { AlertsService } from 'src/app/services/alerts/alerts.service';
import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit, ViewEncapsulation, ElementRef, Input, Output, EventEmitter, AfterContentInit } from '@angular/core';
import { Location as RouterLocation } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { OverlayPanel } from 'primeng/overlaypanel';
import { LocationService } from 'src/app/services/locations/location.service';
import { DomSanitizer } from '@angular/platform-browser';
import { LocationSignalService } from '../../../services/locationSignal/location-signal.service';
import { ToastrService } from 'ngx-toastr';
import { Toaster } from '../../shared/votm-cloud-toaster/votm-cloud-toaster';
import { Location } from 'src/app/models/location.model';
declare var $: any;

@Component({
  selector: 'app-votm-cloud-association',
  templateUrl: './votm-cloud-association.component.html',
  styleUrls: ['./votm-cloud-association.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class VotmCloudAssociationComponent implements OnInit {

  derivedSignalModal: any;
  organizationId: string; // to store selected organization's id
  selectedSignal; // selected signal to display overlay panel.
  toaster: Toaster = new Toaster(this.toastr);
  isGetAvailableSignalsAPILoading = false; // flag for loader for get available signals api
  isGetdroppedListAPILoading = false; // flag for loader for get associated signals api
  isCreateSignalAssociationAPILoading = false; // flag for loader for create signals association api
  curOrganizationId: string;
  curOrganizationName: string;
  @ViewChild('editOP', null) editOPanel: OverlayPanel; // signal association edit modal refference
  @ViewChild('alertOP', null) alertOPanel: OverlayPanel; // signal association alert modal refference
  isAlarmRuleAssociationAPILoading = false;
  isSignalAssociationAPILoading = false;
  selectedAlertRule: Alert;
  derivedSignals: any = [];
  @Input() showAssoc = true;
  @Input() showUnassoc = false;
  draggingSensorIx: number = null;
  draggingSignalIx: number = null;
  grabOffset: any = null;
  pageType = 'view';
  @Input() disable = true;
  disabled = (this.disable) ? '' : null;
  @ViewChild('locationImage', { static: false }) elLocImg: ElementRef;
  imgOffsetLeft = null;
  imgOffsetTop = null;
  imgParentWidth = null;
  imgParentHeight = null;
  imgSourceHeight = null;
  imgSourceWidth = null;
  @Input() isDragDropRequired;
  @Input() model = 'Signal';
  @Input() imageURL: string;
  @Input() dragList: any[] = [];
  @Input() droppedList: any[] = [];
  @Input() showDerivedSignal: boolean;
  @Input() showEditIcon: boolean;
  @Input() showAlertIcon: boolean;
  @Input() showDetachIcon: boolean;
  @Input() showSensorsDetail: boolean;
  @Input() alertRules: Alert[] = [];
  @Output() detach: EventEmitter<any> = new EventEmitter<any>();
  @Output() saveAssociation: EventEmitter<any> = new EventEmitter<any>();
  @Output() reload: EventEmitter<any> = new EventEmitter<any>();
  @Output() saveAlarmAssociation: EventEmitter<any> = new EventEmitter<any>();
  @Output() resetPage: EventEmitter<any> = new EventEmitter<any>();
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private routerLocation: RouterLocation,
    private toastr: ToastrService,
    private eleRef: ElementRef
  ) { }

  ngOnInit() {

    this.activatedRoute.paramMap.subscribe(params => {
      console.log(params);
      this.curOrganizationId = params.get('curOrgId');
      this.curOrganizationName = params.get('curOrgName');
      this.organizationId = params.get('orgId');
      console.log(this.curOrganizationId, '====', this.curOrganizationName, '====', this.organizationId);
      this.getLocationSignalAssociation();
    });
    this.pageType = this.activatedRoute.snapshot.data['type'];
    if (this.pageType.toLowerCase() === 'edit') {
      this.toggleDisable();
    }
  }

  // ngAfterContentInit() {
  //   console.log('in view init');
  //   this.onLoadLocImg();
  // }

  getLocationSignalAssociation() {
    this.reload.next();
  }


  toggleDisable() {
    console.log(this.dragList);
    this.disable = !this.disable;
    this.disabled = (this.disable) ? '' : null;
    this.showUnassoc = !this.disable;
  }

  onLoadLocImg() {
    const el = this.elLocImg.nativeElement;
    const imgType = el.currentSrc.split(/\#|\?/)[0].split('.').pop().trim();
    this.imgOffsetLeft = el.offsetLeft;
    this.imgOffsetTop = el.offsetTop;
    this.imgParentHeight = el.offsetParent.offsetHeight;
    this.imgParentWidth = el.offsetParent.offsetWidth;
    if (imgType !== 'svg') {
      this.imgSourceHeight = el.naturalHeight;
      this.imgSourceWidth = el.naturalWidth;
    } else {
      this.imgSourceWidth = 5000;
      this.imgSourceHeight = (5000.0 * parseFloat(el.naturalHeight) / parseFloat(el.naturalWidth)).toFixed(0);
    }
    console.log(this.imgOffsetLeft, '[[[[[[[[[[[[[[[[', this.imgOffsetTop);
    console.log(this.imgParentHeight, ']]]]]]]]]]]]]]]', this.imgParentWidth);
    console.log(this.imgSourceHeight, '======', this.imgSourceWidth);
    if (!this.isDragDropRequired) {
      for (const asset of this.droppedList) {
        if (Object.keys(asset.pos).length === 0) {
          asset.pos = {
            left: (100 * this.imgOffsetLeft / this.imgParentWidth),
            top: (100 * this.imgOffsetTop / this.imgParentHeight)
          };
        }
      }
    }
    console.log(this.droppedList);
  }

  getOriginPos() {
    const style = {
      left: 'calc(' + (100 * this.imgOffsetLeft / this.imgParentWidth) + '% + 1px)',
      top: (100 * this.imgOffsetTop / this.imgParentHeight) + '%'
    };
    return style;
  }

  getExtentPos() {
    const style = {
      right: 'calc(' + (100 * this.imgOffsetLeft / this.imgParentWidth) + '% + 1px)',
      bottom: (100 * this.imgOffsetTop / this.imgParentHeight) + '%'
    };
    return style;
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

  addDerived() {
    const newSignal = { signalName: 'My Derived Signal', associationName: 'My Derived Signal', bound: true,
      icon: 'icon-sig-function', associated: true, derived: true, isClicked: false, derivedSigid: this.derivedSignals.length};
    this.derivedSignals.push(newSignal);
    // tslint:disable-next-line: no-string-literal
    newSignal['did'] = this.droppedList.length;
    // tslint:disable-next-line: no-string-literal
    newSignal['pos'] = {
      left: (100 * this.imgOffsetLeft / this.imgParentWidth),
      top: (100 * this.imgOffsetTop / this.imgParentHeight)
    };
    this.droppedList.push(newSignal);
    console.log(newSignal);
    this.closeModal(this.derivedSignalModal);
  }

  onStart(event: any, index1, index2) {
    this.closeAlertOPanel();
    this.closeEditOpanel();
    console.log(index1, index2);
    if (index2 === undefined) {
      this.droppedList[index1].isClicked = false;
    }
    this.draggingSensorIx = event.srcElement.getAttribute('sensorIx');
    this.draggingSignalIx = event.srcElement.getAttribute('signalIx');
    this.grabOffset = { x: event.offsetX, y: event.offsetY };
  }

  onDrop(event: any) {
    let pos = {
      left: event.event.offsetX,
      top: event.event.offsetY
    };

    event.data.pixelPos = pos;
    console.log(event.data.pixelPos);
    event.data.pos = {
      left: (((event.event.layerX - this.grabOffset.x + 16) / event.event.srcElement.offsetParent.offsetWidth) * 100.0).toFixed(2),
      top: (((event.event.layerY - this.grabOffset.y + 16) / event.event.srcElement.offsetParent.offsetHeight) * 100.0).toFixed(2)
    };
    console.log(event.data.pos);
      // event.data.pos = { 'left.%': pos.left, 'top.%': pos.top };

    console.log(event.data.pos.left, '========', event.data.pos.top);
    if (!event.data.associated) {
      event.data.associated = true;
      event.data.did = this.droppedList.length;
      event.data.isClicked = false;
      event.data.bound = true;
      this.droppedList.push(event.data);
      if (this.showSensorsDetail) {
        this.dragList[this.draggingSensorIx].node[this.draggingSignalIx].associated = true;
      } else {
        this.dragList[this.draggingSignalIx].associated = true;
      }
      setTimeout( () => {
        const index = this.droppedList.findIndex(signal => signal.did === event.data.did);
        const elem = this.eleRef.nativeElement.querySelector('#sig_edit_' + index);
        console.log(elem);
        if (elem) {
          elem.dispatchEvent(new Event('click'));
        }
      }, 50);
      const index = this.droppedList.findIndex(signal => signal.did === event.data.did);
      this.droppedList[index].isClicked = true;
    } else {
      console.log(this.droppedList);
      console.log(event.data);
      let id = this.droppedList.findIndex(signal => {
        console.log(signal.did, '=========', event.data.did);
        return signal.did === event.data.did;
      });
      this.droppedList[id]['pos'] = event.data.pos;
      this.droppedList[id]['pixelPos'] = event.data.pixelPos;
    }
    this.closeAllIconsDisplay();

    console.log(this.droppedList);
  }

  // getPositionStyle(signal) {
  //   const style = {
  //     left: 'calc(' + signal.pos.left + '% - 16px)',
  //     top: 'calc(' + signal.pos.top + '% - 16px)'
  //   };
  //   return style;
  // }

  getPositionStyle(signal) {
    console.log(signal);
    const style = {
      left: 'calc(' + signal.pos.left + '% - 16px)',
      top: 'calc(' + signal.pos.top + '% - 16px)'
    };
    return style;
  }

  onClickOfAssociatedSignal(signal) {

    signal.isClicked = !signal.isClicked;
    this.selectedSignal = {...signal};
  }

  onClickOfEditIcon(index, event) {
    this.alertOPanel.hide();
    this.droppedList[index].isClicked = true;
    this.selectedSignal = this.droppedList[index];
    this.selectedSignal.imageCordinates = {
      x:  this.selectedSignal.pos['left'],
      y: this.selectedSignal.pos['top']
    };
    this.editOPanel.show(event);
    event.preventDefault();
    event.stopPropagation();
    event.cancelBubble = true;
  }

  closeAllIconsDisplay() {
    this.droppedList.forEach(signal => signal.isClicked = false);
  }

  onClickOfAlertIcon(index, event) {
    this.editOPanel.hide();
    this.droppedList[index].isClicked = true;
    this.selectedSignal = this.droppedList[index];
    this.alertOPanel.show(event);
    this.droppedList[index].isClicked = true;
    event.preventDefault();
    event.stopPropagation();
    event.cancelBubble = true;
  }

  onClickOfSaveSignalAssociationPanel() {
    // if (this.selectedSignal.imageCordinates.x === 0) {
    //   this.selectedSignal.pos = {
    //     left: (100 * this.imgOffsetLeft / this.imgParentWidth),
    //     top: this.selectedSignal.imageCordinates.y
    //   };
    // } else if (this.selectedSignal.imageCordinates.y === 0) {
    //   this.selectedSignal.pos = {
    //     top: (100 * this.imgOffsetTop / this.imgParentHeight),
    //     left: this.selectedSignal.imageCordinates.x
    //   };
    // } else if (this.selectedSignal.imageCordinates.x === 100) {
    //   this.selectedSignal.pos = {
    //     left: (100 * this.imgOffsetLeft / this.imgParentWidth),
    //     top: this.selectedSignal.imageCordinates.y
    //   };
    // } else if (this.selectedSignal.imageCordinates.y === 100) {
    //   this.selectedSignal.pos = {
    //     top: (100 * this.imgOffsetTop / this.imgParentHeight),
    //     left: this.selectedSignal.imageCordinates.x
    //   };
    // }
    this.selectedSignal.pos = {
      left: this.selectedSignal.imageCordinates.x,
      top: this.selectedSignal.imageCordinates.y
    };
    const index = this.droppedList.findIndex(
      signal => signal.signalId === this.selectedSignal.signalId &&
      signal.sensorId === this.selectedSignal.sensorId
    );
    this.droppedList.splice(index, 1, this.selectedSignal);
    console.log(this.droppedList);
    this.closeEditOpanel();
  }

  closeEditOpanel() {
    this.editOPanel.hide();
    if (this.selectedSignal) {
      const index = this.droppedList.findIndex(
        signal => signal.signalId === this.selectedSignal.signalId &&
        signal.sensorId === this.selectedSignal.sensorId
      );
      this.droppedList[index].isClicked = false;
    }
  }

  closeAlertOPanel() {
    this.alertOPanel.hide();
    if (this.selectedSignal) {
      const index = this.droppedList.findIndex(
        signal => signal.signalId === this.selectedSignal.signalId &&
        signal.sensorId === this.selectedSignal.sensorId
      );
      this.droppedList[index].isClicked = false;
    }
  }

  onDetachSignalFromAsset(index) {
    this.selectedSignal = this.droppedList[index];
    if (this.selectedSignal.signalMappingId) {
      this.detach.emit(this.selectedSignal.signalMappingId);
      this.dragList = [];
      this.selectedSignal = undefined;
      this.derivedSignals = [];
    } else {
      if (this.selectedSignal.derived) {
        const ix = this.derivedSignals.findIndex(derivedSignal => derivedSignal.derivedSigid === this.selectedSignal.derivedSigid);
        this.derivedSignals.splice(ix, 1);
        this.droppedList.splice(index, 1);
      } else {
        for (const sensor of this.dragList) {
          for (const signal of sensor.node) {
            if (signal.signalId === this.droppedList[index].signalId &&
            signal.sensorId === this.droppedList[index].sensorId) {
              signal.associated = false;
            }
          }
        }
        this.droppedList.splice(index, 1);
      }

    }
  }

  onClickOfAlarmRuleAssociation() {
    if (this.selectedSignal.signalMappingId) {
      this.isAlarmRuleAssociationAPILoading = true;
      const alertObj = {...this.selectedAlertRule};
      console.log(alertObj);
      alertObj.alertRuleSignalMapping = [];
      alertObj.alertRuleSignalMapping.push({
        signalMappingId: this.selectedSignal.signalMappingId,
        active: true
      });
      this.saveAlarmAssociation.emit(alertObj);
      this.closeAlertOPanel();
      this.isAlarmRuleAssociationAPILoading = false;
    } else {
      this.toaster.onFailure('Please save the signal association first to set the alarm rule association', 'Association Error!');
      this.closeAlertOPanel();
    }
  }

  onClickOfCreateAssociateRule() {
    this.router.navigate(['org', 'view', this.curOrganizationId, this.curOrganizationName,
      this.organizationId ? this.organizationId : this.curOrganizationId, 'alertRule', 'create']);
  }

  onSaveSignalAssociation() {
    console.log(this.droppedList);
    this.editOPanel.hide();
    this.alertOPanel.hide();
    this.isSignalAssociationAPILoading = true;
    this.saveAssociation.emit(this.droppedList);
    this.dragList = [];
    this.selectedSignal = undefined;
    this.derivedSignals = [];
    this.isSignalAssociationAPILoading = false;
  }

  onClickOfReset() {
    this.editOPanel.hide();
    this.alertOPanel.hide();
    this.dragList = [];
    this.selectedSignal = undefined;
    this.derivedSignals = [];
    this.resetPage.emit();
  }

  onClickOfAssetName(asset) {
    console.log(asset);
    if (asset.parentId) {
      this.router.navigate(['asset', 'view', asset.parentOrganizationId, asset.parentOrganizationName,
        asset.parentLocationId, asset.parentLocationName, asset.parentId, asset.parentName, asset.id]);
    } else {
      if (asset.parentLocationId) {
        this.router.navigate(['asset', 'view', asset.parentOrganizationId, asset.parentOrganizationName,
          asset.parentLocationId, asset.parentLocationName, asset.id]);
      } else {
        this.router.navigate(['asset', 'view', asset.parentOrganizationId, asset.parentOrganizationName, asset.id]);
      }
    }
  }

  // end


  onCancelClick(event) {
    this.routerLocation.back();
  }

  openmodal(id) {
    // Get the modal
    const modal = document.getElementById(id);
    modal.style.display = 'block';
    this.derivedSignalModal = document.getElementById(id);
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = (event) => {
      if (event.target === modal) {
        modal.style.display = 'none';
      }
    };
   }

  closeModal(key) {
    key.style.display = 'none';
  }

}
