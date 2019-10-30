import { Alert } from './../../../models/alert.model';
import { AlertsService } from 'src/app/services/alerts/alerts.service';
import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit, ViewEncapsulation } from '@angular/core';
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
  selector: 'app-votm-cloud-locations-signal',
  templateUrl: './votm-cloud-locations-signal.component.html',
  styleUrls: ['./votm-cloud-locations-signal.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class VotmCloudLocationsSignalComponent implements OnInit {

  locationId: string; // to store selected location's id.
  organizationId: string; // to store selected organization's id
  availableSignals: any[] = []; // to store list of available signals based on sensors.
  copyAvailableSignals: any[] = []; // to store list of available signals based on sensors.
  associatedSignals: any[] = [];
  selectedSignal; // selected signal to display overlay panel.
  location: Location = new Location(); // to store selected asset's data
  assetImageURL: any;
  display: string; // to store thedisplay style value of bootstrap modal pf add calculated signal
  toaster: Toaster = new Toaster(this.toastr);
  isGetAvailableSignalsAPILoading = false; // flag for loader for get available signals api
  isGetAssociatedSignalsAPILoading = false; // flag for loader for get associated signals api
  isCreateSignalAssociationAPILoading = false; // flag for loader for create signals association api
  imgURL: any; // to store the base64 of location image.
  curOrganizationId: string;
  curOrganizationName: string;
  @ViewChild('editOP', null) editOPanel: OverlayPanel; // signal association edit modal refference
  @ViewChild('alertOP', null) alertOPanel: OverlayPanel; // signal association alert modal refference
  alertRules: Alert[] = [];
  isAlarmRuleAssociationAPILoading = false;
  isSignalAssociationAPILoading = false;
  selectedAlertRule: Alert;
  sensors = [
  ];
  sensorsCreated = null;
  sensorCharCode = {
    Temperature: 'E802',
    Humidity: 'E801',
    'Dew Point': 'E807',
    Battery: 'E803',
    'Signal Strength': 'E804'
  };
  derivedSignals: any = [];
  showAssoc = true;
  showUnassoc = true;
  draggingSensorIx: number = null;
  draggingSignalIx: number = null;
  grabOffset: any = null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private route: Router,
    private routerLocation: RouterLocation,
    private locationSignalService: LocationSignalService,
    private locationService: LocationService,
    private alertsService: AlertsService,
    private domSanitizer: DomSanitizer,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.locationId = this.activatedRoute.snapshot.paramMap.get('locId');
    this.getLocationById();

    this.activatedRoute.paramMap.subscribe(params => {
      this.curOrganizationId = params.get('curOrgId');
      this.curOrganizationName = params.get('curOrgName');
      this.organizationId = params.get('orgId');
      this.getLocationSignalAssociation();
      this.getAlertRulesList();
    });
  }
  // David's code
  showSignal(signal: any): boolean {
    return (signal.associated && this.showAssoc) || ((!signal.associated) && this.showUnassoc);
  }

  showSensor(signals: any): boolean {
    let hasAssocSignals: boolean = false;
    signals.forEach(signal => {
      hasAssocSignals = hasAssocSignals || ((signal.associated && this.showAssoc) || ((!signal.associated) && this.showUnassoc));
    });
    return hasAssocSignals;
  }

  addDerived() {
    const newSignal = { name: 'my Formula', icon: 'icon-sig-function', associated: true, lastReading: [1434356256, 123, ''] };
    this.derivedSignals.push(newSignal);
    // tslint:disable-next-line: no-string-literal
    newSignal['id'] = this.associatedSignals.length;
    // tslint:disable-next-line: no-string-literal
    newSignal['pos'] = { 'left.px': 10, 'top.px': 10 };
    this.associatedSignals.push(newSignal);
  }

  onStart(event: any, index1, index2) {
    console.log(index1, index2);
    if (index2 === undefined) {
      this.associatedSignals[index1].isClicked = false;
    }
    this.draggingSensorIx = event.srcElement.getAttribute('sensorIx');
    this.draggingSignalIx = event.srcElement.getAttribute('signalIx');
    this.grabOffset = { x: event.offsetX, y: event.offsetY };
  }

  onDrop(event: any) {
    const pos = {
      x: (((event.event.offsetX - this.grabOffset.x) / event.event.srcElement.offsetWidth) * 100.0).toFixed(2),
      y: (((event.event.offsetY - this.grabOffset.y) / event.event.srcElement.offsetHeight) * 100.0).toFixed(2)
    };
    event.data.pos = { 'left.%': pos.x, 'top.%': pos.y };
    if (!event.data.associated) {
      event.data.associated = true;
      event.data.id = this.associatedSignals.length;
      event.data.isClicked = false;
      this.associatedSignals.push(event.data);
      this.sensors[this.draggingSensorIx].node[this.draggingSignalIx].associated = true;
    } else {
      this.associatedSignals.find(({ id }) => id === event.data.id)['pos'] = event.data.pos;
    }
    console.log(this.associatedSignals);
  }

  onClickOfAssociatedSignal(signal) {
    this.closeAllIconsDisplay();
    signal.isClicked = !signal.isClicked;
    this.selectedSignal = {...signal};
  }

  onClickOfEditIcon(index, event) {
    this.selectedSignal.isClicked = true;
    this.selectedSignal.imageCordinates = {
      x:  this.selectedSignal.pos['left.%'],
      y: this.selectedSignal.pos['top.%']
    };
    this.editOPanel.show(event);
    event.preventDefault();
    event.stopPropagation();
    event.cancelBubble = true;
  }

  closeAllIconsDisplay() {
    this.associatedSignals.forEach(signal => signal.isClicked = false);
  }

  onClickOfAlertIcon(index, event) {
    this.alertOPanel.show(event);
    this.associatedSignals[index].isClicked = true;
    event.preventDefault();
    event.stopPropagation();
    event.cancelBubble = true;
  }

  onClickOfSaveSignalAssociationPanel() {
    this.selectedSignal.pos = {
      'left.%': this.selectedSignal.imageCordinates.x,
      'top.%': this.selectedSignal.imageCordinates.y
    };
    const index = this.associatedSignals.findIndex(
      signal => signal.signalId === this.selectedSignal.signalId &&
      signal.sensorId === this.selectedSignal.sensorId
    );
    this.associatedSignals.splice(index, 1, this.selectedSignal);
    console.log(this.associatedSignals);
    this.closeEditOpanel();
  }

  closeEditOpanel() {
    this.editOPanel.hide();
  }

  onDetachSignalFromAsset(index) {
    if (this.selectedSignal.signalMappingId) {
      this.locationSignalService.detachSignalAssociation(this.selectedSignal.signalMappingId).subscribe(
        response => {
          this.sensors = [];
          this.toaster.onSuccess('Signal detached successfully', 'Detached');
          this.getLocationSignalAssociation();
        }
      );
    } else {
      for (const sensor of this.sensors) {
        for (const signal of sensor.node) {
          if (signal.signalId === this.associatedSignals[index].signalId &&
          signal.sensorId === this.associatedSignals[index].sensorId) {
            signal.associated = false;
          }
        }
      }
      this.associatedSignals.splice(index, 1);
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
      this.alertsService.updateAlertRule(alertObj).subscribe(
        response => {
          this.toaster.onSuccess('Alarm Rule associated successfully.', 'Association Saved!');
          this.alertOPanel.hide();
          this.isAlarmRuleAssociationAPILoading = false;
        }, error => {
          this.toaster.onFailure('Error while associating Alarm Rule.', 'Association Error!');
          this.alertOPanel.hide();
          this.isAlarmRuleAssociationAPILoading = false;
        }
      );
    } else {
      this.toaster.onFailure('Please save the signal association first to set the alarm rule association', 'Association Error!');
      this.alertOPanel.hide();
    }
  }

  onClickOfCreateAssociateRule() {
    this.route.navigate(['org', 'view', this.curOrganizationId, this.curOrganizationName,
      this.organizationId ? this.organizationId : this.curOrganizationId, 'alertRule', 'create']);
  }

  onSaveSignalAssociation() {
    console.log(this.associatedSignals);
    this.editOPanel.hide();
    this.alertOPanel.hide();
    this.isSignalAssociationAPILoading = true;
    const data = this.associatedSignals.map(signal => {
      const obj = {
        locationId: this.locationId,
        signalId: signal.signalId,
        sensorId: signal.sensorId,
        imageCordinates: {},
        name: signal.signalName,
        associationName: signal.associationName,
        signalMappingId: signal.signalMappingId ? signal.signalMappingId : undefined
      };
      obj.imageCordinates[signal.associationName] = {
        x: signal.pos['left.%'],
        y: signal.pos['top.%']
      };
      return obj;
    });
    this.locationSignalService.createSignalAssociation(data)
      .subscribe(
        response => {
          console.log(response);
          this.sensors = [];
          this.selectedSignal = undefined;
          this.toaster.onSuccess('Signal associated successfully', 'Saved');
          this.getLocationSignalAssociation();
          this.isSignalAssociationAPILoading = false;

        }, error => {
          this.toaster.onFailure('Error while saving signal assocition', 'Error');
          this.isSignalAssociationAPILoading = false;
        }
      );
  }

  // end

  getAlertRulesList() {
    this.alertsService.getAllAlertsByOrgId(this.curOrganizationId)
      .subscribe(response => {
        this.alertRules = response;
      });
  }



  /**
   * To get the location details by location id
   * Location id will fetch from current route.
   */
  getLocationById() {
    this.locationService.getLocationById(this.locationId)
      .subscribe(response => {
        this.location = response;
        if (this.location.logo && this.location.logo.imageName) {
          const fileExtension = this.location.logo.imageName.slice(
            (Math.max(0, this.location.logo.imageName.lastIndexOf('.')) || Infinity) + 1);
          this.imgURL = this.domSanitizer.bypassSecurityTrustUrl(`data:image/${fileExtension};base64,${this.location.logo.image}`);
        }
      });
  }
  /**
   * To get all available signals for that location and organization.
   * Location id and Organization Id will fetch from current route.
   * This function sets the sensor disable which are already associated.
   */
  getAllAvailableSignals() {
    this.isGetAvailableSignalsAPILoading = true;
    this.locationSignalService.getSignalsByLocation(this.locationId, this.curOrganizationId)
      .subscribe(response => {
        console.log(response);
        this.sensors = response;
        for (const sensor of this.sensors) {
          for (const signal of sensor.node) {
            signal.sensorId = sensor.id;
            signal.sensorName = sensor.name;
            signal.signalId = signal.id;
            signal.signalName = signal.name;
            signal.associationName = signal.name;
            signal.associated = false;
            signal.imageCordinates = {
              x: 0,
              y: 0
            };
            signal.icon = 'icon-sig-humidity';
            for (const associateSignal of this.associatedSignals) {
              if (associateSignal.signalId === signal.signalId &&
                associateSignal.sensorId === signal.sensorId) {
                signal.associated = true;
              }
            }
          }
        }
        this.copyAvailableSignals = JSON.parse(JSON.stringify(this.sensors));
        console.log(this.copyAvailableSignals);
        // this.configSensors('#sensor-cont', '#map-cont-1');
        // this.setAssociatedSensors('map-cont-1');
        this.isGetAvailableSignalsAPILoading = false;
      },
        error => {
          this.isGetAvailableSignalsAPILoading = false;
        });
  }


  getLocationSignalAssociation() {
    this.isGetAssociatedSignalsAPILoading = true;
    this.locationSignalService.getSignalAssociation(this.locationId)
      .subscribe(
        response => {

          this.getAllAvailableSignals();
          this.isGetAssociatedSignalsAPILoading = false;
          for (let i = 0; i < response.length; i++) {
            const signal = response[i];
            signal.imageCordinates = signal.imageCordinates[signal.associationName];
            signal.pos = {};
            signal.pos['left.%'] = signal.imageCordinates.x;
            signal.pos['top.%'] = signal.imageCordinates.y;
            signal.isClicked = false;
            signal.icon = 'icon-sig-humidity';
            signal.associated = true;
            signal.id = i;
          }
          this.associatedSignals = [...response];
        },
        error => {
          this.isGetAssociatedSignalsAPILoading = false;
        }
      );
  }

  onCancelClick(event) {
    this.routerLocation.back();
  }

}
