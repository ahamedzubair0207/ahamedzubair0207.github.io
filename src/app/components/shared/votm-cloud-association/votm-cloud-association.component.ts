import { VotmCloudConfimDialogComponent } from './../votm-cloud-confim-dialog/votm-cloud-confim-dialog.component';
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
  styleUrls: ['./votm-cloud-association.component.scss']
})
export class VotmCloudAssociationComponent {

  derivedSignalModal: any;
  organizationId: string; // to store selected organization's id
  selectedSignal; // selected signal to display overlay panel.
  toaster: Toaster = new Toaster(this.toastr);
  isGetAvailableSignalsAPILoading = false; // flag for loader for get available signals api
  isGetdroppedListAPILoading = false; // flag for loader for get associated signals api
  isCreateSignalAssociationAPILoading = false; // flag for loader for create signals association api
  @ViewChild('editOP', null) editOPanel: OverlayPanel; // signal association edit modal refference
  @ViewChild('alertOP', null) alertOPanel: OverlayPanel; // signal association alert modal refference
  isAlarmRuleAssociationAPILoading = false;
  isSignalAssociationAPILoading = false;
  selectedAlertRule: string[] = [];
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
  imgOffsetWidth = null;
  imgOffsetHeight = null;
  grabElement: any = null;
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
  @Input() locationId: string = null;
  @Input() assetId: string = null;
  @Input() customImageOverlay = false;
  @Output() detach: EventEmitter<any> = new EventEmitter<any>();
  @Output() saveAssociation: EventEmitter<any> = new EventEmitter<any>();
  @Output() reload: EventEmitter<any> = new EventEmitter<any>();
  @Output() saveAlarmAssociation: EventEmitter<any> = new EventEmitter<any>();
  @Output() resetPage: EventEmitter<any> = new EventEmitter<any>();
  @Output() returnToList: EventEmitter<any> = new EventEmitter<any>();
  @Output() createAssociateRule: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('confirmBox', null) confirmBox: VotmCloudConfimDialogComponent;
  batterySignalType = 'battery';
  signalSignalType = 'signal';
  signalRemoveMessage: string;
  deletedSignalIndex: number;
  constructor(
    private router: Router,
    private toastr: ToastrService,
    private eleRef: ElementRef
  ) { }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    // console.log(this.dragList);
    // console.log(this.droppedList);
  }

  getLocationSignalAssociation() {
    this.reload.next();
  }

  toggleDisable() {
    // console.log(this.dragList);
    this.disable = !this.disable;
    this.disabled = (this.disable) ? '' : null;
    this.showUnassoc = !this.disable;
  }

  onLoadLocImg() {
    const el = this.elLocImg.nativeElement;
    const imgType = el.currentSrc.split(/\#|\?/)[0].split('.').pop().trim();
    this.imgOffsetLeft = el.offsetLeft;
    this.imgOffsetTop = el.offsetTop;
    this.imgOffsetWidth = el.offsetWidth;
    this.imgOffsetHeight = el.offsetHeight;
    this.imgParentHeight = el.offsetParent.clientHeight;
    this.imgParentWidth = el.offsetParent.clientWidth;

    if (imgType !== 'svg') {
      this.imgSourceHeight = el.naturalHeight;
      this.imgSourceWidth = el.naturalWidth;
    } else {
      this.imgSourceWidth = 5000;
      this.imgSourceHeight = (5000.0 * parseFloat(el.naturalHeight) / parseFloat(el.naturalWidth)).toFixed(0);
    }
    // console.log(this.imgOffsetLeft, '[[[[[[[[[[[[[[[[', this.imgOffsetTop);
    // console.log(this.imgParentHeight, ']]]]]]]]]]]]]]]', this.imgParentWidth);
    // console.log(this.imgSourceHeight, '======', this.imgSourceWidth);
    // if (!this.isDragDropRequired) {
    //   // console.log(JSON.stringify(this.droppedList));
    //   for (const asset of this.droppedList) {
    //     if (Object.keys(asset.pctPos).length === 0) {
    //       asset.pctPos = { left: .1, top: .1 };
    //     }
    //   }
    // }
    // // console.log(this.droppedList);
  }

  onResize(event) {
    if (this.elLocImg) {
      this.imgOffsetTop = this.elLocImg.nativeElement.offsetTop;
      this.imgOffsetLeft = this.elLocImg.nativeElement.offsetLeft;
      this.imgOffsetWidth = this.elLocImg.nativeElement.offsetWidth;
      this.imgOffsetHeight = this.elLocImg.nativeElement.offsetHeight;
    }
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
    // newSignal['pos'] = {
    //   left: (100 * this.imgOffsetLeft / this.imgParentWidth),
    //   top: (100 * this.imgOffsetTop / this.imgParentHeight)
    // };
    newSignal['pctPos'] = { left: 0, top: 0 };
    this.droppedList.push(newSignal);
    // console.log(newSignal);
    this.closeModal(this.derivedSignalModal);
  }

  onStart(event: any, index1, index2) {
    this.closeAlertOPanel();
    this.closeEditOpanel();
    // console.log(index1, index2);
    if (index2 === undefined) {
      this.droppedList[index1].isClicked = false;
    }
    this.draggingSensorIx = event.srcElement.getAttribute('sensorIx');
    this.draggingSignalIx = event.srcElement.getAttribute('signalIx');
    this.grabOffset = { x: event.offsetX, y: event.offsetY };
    this.grabElement = event.srcElement;
  }

  onDrop(event: any) {
    const signal = event.data;
    let pos = {
      left: event.event.offsetX - this.grabOffset.x + 16,
      top: event.event.offsetY - this.grabOffset.y + 16
    };
    // console.log(pos);
    signal.pctPos = {
      left: (pos.left / event.event.srcElement.offsetWidth).toFixed(5),
      top: (pos.top / event.event.srcElement.offsetHeight).toFixed(5)
    };

    // console.log(signal.pctPos);
      // signal.pos = { 'left.%': pos.left, 'top.%': pos.top };

    // console.log(signal.pctPos.left, '========', signal.pctPos.top);
    if (!signal.associated) {
      signal.associated = true;
      signal.did = this.droppedList.length;
      signal.isClicked = false;
      signal.bound = this.dragList[this.draggingSensorIx].isLink;
      signal.sourceSensor = this.dragList[this.draggingSensorIx].sensorId;
      signal.sourceSignal = this.dragList[this.draggingSensorIx].node[this.draggingSignalIx].type;
      this.droppedList.push(signal);
      if (this.showSensorsDetail) {
        this.dragList[this.draggingSensorIx].node[this.draggingSignalIx].associated = true;
      } else {
        this.dragList[this.draggingSignalIx].associated = true;
      }
      setTimeout( () => {
        const index = this.droppedList.findIndex(signalObj => signalObj.did === signal.did);
        const elem = this.eleRef.nativeElement.querySelector('#sig_edit_' + index);
        // console.log(elem);
        if (elem) {
          elem.dispatchEvent(new Event('click'));
        }
      }, 50);
      const index = this.droppedList.findIndex(signalObj => signalObj.did === signal.did);
      this.droppedList[index].isClicked = true;
    } else {
      // console.log(this.droppedList);
      // console.log(signal);
      let id = this.droppedList.findIndex(signalObj => {
        // console.log(signalObj.did, '=========', signal.did);
        return signalObj.did === signal.did;
      });
      this.droppedList[id]['pctPos'] = signal.pctPos;
    }
    this.closeAllIconsDisplay();

    // console.log(this.droppedList);
  }

  // getPositionStyle(signal) {
  //   const style = {
  //     left: 'calc(' + signal.pos.left + '% - 16px)',
  //     top: 'calc(' + signal.pos.top + '% - 16px)'
  //   };
  //   return style;
  // }

  onClickOfAssociatedSignal(signal) {

    signal.isClicked = !signal.isClicked;
    this.selectedSignal = {...signal};
  }

  onClickOfEditIcon(index, event) {

    if (this.selectedSignal) {
      this.droppedList[this.selectedSignal.selectedIndex].isClicked = false;
      this.editOPanel.hide();
      this.alertOPanel.hide();
    }
    setTimeout( () => {
      this.droppedList[index].isClicked = true;
      this.selectedSignal = this.droppedList[index];
      this.selectedSignal['selectedIndex'] = index;
      this.selectedSignal.imageCordinates = {
        x:  this.selectedSignal.pctPos['left'] * 100,
        y: this.selectedSignal.pctPos['top'] * 100
      };
      this.editOPanel.show(event);
    }, 300);

    event.preventDefault();
    event.stopPropagation();
    event.cancelBubble = true;
  }

  closeAllIconsDisplay() {
    this.droppedList.forEach(signal => signal.isClicked = false);
  }

  onClickOfAlertIcon(index, event) {
    if (this.selectedSignal) {
      this.droppedList[this.selectedSignal.selectedIndex].isClicked = false;
      this.editOPanel.hide();
      this.alertOPanel.hide();
    }
    setTimeout( () => {
      this.droppedList[index].isClicked = true;
      this.selectedSignal = this.droppedList[index];
      this.selectedSignal['selectedIndex'] = index;
      this.selectedAlertRule = this.selectedSignal.alertRule;
      this.alertOPanel.show(event);
      this.droppedList[index].isClicked = true;
    }, 300);
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
    this.selectedSignal.pctPos = {
      left: this.selectedSignal.imageCordinates.x / 100,
      top: this.selectedSignal.imageCordinates.y / 100
    };
    // console.log(JSON.stringify(this.droppedList));
    const index = this.droppedList.findIndex(signalObj => signalObj.did === this.selectedSignal.did);
    // console.log(index);
    this.droppedList.splice(index, 1, this.selectedSignal);
    this.dragList.forEach(dragItem => {
      if (dragItem.node) {
        dragItem.node.forEach(dragNode => {
          if (dragNode.signalId === this.selectedSignal.signalId &&
            dragNode.sensorId === this.selectedSignal.sensorId) {
              dragNode.associationName = this.selectedSignal.associationName;
          }
        });
      } else {
        dragItem.associationName = this.selectedSignal.associationName;
      }
    });
    // console.log(this.droppedList);
    this.closeEditOpanel();
  }

  closeEditOpanel() {
    this.editOPanel.hide();
    if (this.selectedSignal) {
      this.droppedList[this.selectedSignal.selectedIndex].isClicked = false;
    }
  }

  closeAlertOPanel() {
    this.alertOPanel.hide();
    if (this.selectedSignal) {
      this.droppedList[this.selectedSignal.selectedIndex].isClicked = false;
    }
  }

  clear(item) {
    const index = this.selectedAlertRule.findIndex(ruleId => ruleId === item.alertRuleId);
    this.selectedAlertRule.splice(index, 1);
  }

  openConfirmDialog(index) {
    const selectedSignal = this.droppedList[index];
    if (this.customImageOverlay) {
      this.signalRemoveMessage = 'Are you sure you want to unlink the ' + selectedSignal.signalName + ' signal.';
    } else {
      this.signalRemoveMessage = 'Are you sure you want to unlink the ' + selectedSignal.signalName +
    ' signal? The historical data for this signal will be lost.';
    }
    this.confirmBox.open();
    this.deletedSignalIndex = index;
  }

  onDetachSignalFromAsset() {
    this.selectedSignal = this.droppedList[this.deletedSignalIndex];
    if (this.selectedSignal.signalMappingId) {
      this.detach.emit(this.selectedSignal.signalMappingId);
      this.dragList = [];
      this.selectedSignal = undefined;
      this.derivedSignals = [];
    } else {
      if (this.selectedSignal.derived) {
        const ix = this.derivedSignals.findIndex(derivedSignal => derivedSignal.derivedSigid === this.selectedSignal.derivedSigid);
        this.derivedSignals.splice(ix, 1);
        this.droppedList.splice(this.deletedSignalIndex, 1);
      } else {
        for (const sensor of this.dragList) {
          for (const signal of sensor.node) {
            if (signal.signalId === this.droppedList[this.deletedSignalIndex].signalId &&
            signal.sensorId === this.droppedList[this.deletedSignalIndex].sensorId) {
              signal.associated = false;
              signal.associationName = signal.signalName;
            }
          }
        }
        this.droppedList.splice(this.deletedSignalIndex, 1);
      }
      this.selectedSignal = undefined;
    }
  }

  onClickOfAlarmRuleAssociation() {
    if (this.selectedSignal.signalMappingId) {
      this.isAlarmRuleAssociationAPILoading = true;

      const alerts = [];
      this.alertRules.forEach(alertRule => {
        if (this.selectedAlertRule.indexOf(alertRule.alertRuleId) !== -1) {

          alerts.push({
            signalMappingId: this.selectedSignal.signalMappingId,
            alertRuleId: alertRule.alertRuleId,
            locationId: this.locationId,
            assetId: this.assetId
          });
        }
      });
      // console.log(alerts);

      this.saveAlarmAssociation.emit(alerts);
      this.closeAlertOPanel();
      this.isAlarmRuleAssociationAPILoading = false;
    } else {
      this.toaster.onFailure('Please save the signal association first to set the alarm rule association', 'Association Error!');
      this.closeAlertOPanel();
    }
  }

  onClickOfCreateAssociateRule() {
    this.createAssociateRule.emit(this.selectedSignal);
  }

  onSaveSignalAssociation() {
    // console.log(this.droppedList);
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
    // console.log(asset);
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
    this.returnToList.emit();
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
