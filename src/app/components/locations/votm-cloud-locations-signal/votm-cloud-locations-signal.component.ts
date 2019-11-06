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
  associatedSignals: any[] = [];
  selectedSignal; // selected signal to display overlay panel.
  toaster: Toaster = new Toaster(this.toastr);
  isGetAvailableSignalsAPILoading = false; // flag for loader for get available signals api
  isGetAssociatedSignalsAPILoading = false; // flag for loader for get associated signals api
  isCreateSignalAssociationAPILoading = false; // flag for loader for create signals association api
  imgURL: any; // to store the base64 of location image.
  curOrganizationId: string;
  curOrganizationName: string;
  sensors = [];
  derivedSignals: any = [];
  alertRules: any[] = [];
  location: Location;
  constructor(
    private activatedRoute: ActivatedRoute,
    private route: Router,
    private routerLocation: RouterLocation,
    private locationSignalService: LocationSignalService,
    private locationService: LocationService,
    private alertsService: AlertsService,
    private domSanitizer: DomSanitizer,
    private toastr: ToastrService,
    private eleRef: ElementRef
  ) { }

  ngOnInit() {
    this.locationId = this.activatedRoute.snapshot.paramMap.get('locId');
    this.getLocationById();
    this.activatedRoute.paramMap.subscribe(params => {
      this.curOrganizationId = params.get('curOrgId');
      this.curOrganizationName = params.get('curOrgName');
      this.organizationId = params.get('orgId');
      console.log(this.curOrganizationId, '====', this.curOrganizationName, '====', this.organizationId);
      this.getLocationSignalAssociation();
      this.getAlertRulesList();
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

  getAlertRulesList() {
    this.alertsService.getAllAlertsByOrgId(this.curOrganizationId)
      .subscribe(response => {
        this.alertRules = response;
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
            signal.pos['left'] = signal.imageCordinates.x;
            signal.pos['top'] = signal.imageCordinates.y;
            signal.isClicked = false;
            signal.icon = 'icon-sig-humidity';
            signal.associated = true;
            signal.id = i;
            signal.bound = true;
          }
          this.associatedSignals = [...response];
        },
        error => {
          this.isGetAssociatedSignalsAPILoading = false;
        }
      );
  }

  onDetachSignalFromAsset(signalMappingId) {
    this.locationSignalService.detachSignalAssociation(signalMappingId).subscribe(
      response => {
        this.toaster.onSuccess('Signal detached successfully', 'Detached');
        this.getLocationSignalAssociation();
      }
    );
  }

  onClickOfAlarmRuleAssociation(alertObj) {
    this.alertsService.updateAlertRule(alertObj).subscribe(
      response => {
        this.toaster.onSuccess('Alarm Rule associated successfully.', 'Association Saved!');
      }, error => {
        this.toaster.onFailure('Error while associating Alarm Rule.', 'Association Error!');
      }
    );
  }



  onSaveSignalAssociation(droppedList) {
    const signals = [];
    for (let i = 0; i < droppedList.length; i++) {
      if (droppedList[i].derived) {
      } else {
        signals.push(droppedList[i]);
      }
    }
    const data = signals.map(signal => {
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
        x: signal.pos['left'],
        y: signal.pos['top']
      };
      return obj;
    });
    this.locationSignalService.createSignalAssociation(data)
      .subscribe(
        response => {
          console.log(response);
          this.toaster.onSuccess('Signal associated successfully', 'Saved');
          this.getLocationSignalAssociation();
        }, error => {
          this.toaster.onFailure('Error while saving signal assocition', 'Error');
        }
      );
  }


}
