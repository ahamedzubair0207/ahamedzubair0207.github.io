import { AlertsService } from 'src/app/services/alerts/alerts.service';
import { Component, OnInit, ElementRef, ViewChild, OnDestroy, Input } from '@angular/core';
import { DatePipe, Location as RouterLocation } from '@angular/common';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { AssetSignalService } from 'src/app/services/assetSignal/asset-signal.service';
import { OverlayPanel } from 'primeng/overlaypanel';
import { AssetsService } from '../../../services/assets/assets.service';
import { Asset } from 'src/app/models/asset.model';
import { DomSanitizer } from '@angular/platform-browser';
import { Toaster } from '../../shared/votm-cloud-toaster/votm-cloud-toaster';
import { ToastrService } from 'ngx-toastr';

declare var $: any;
@Component({
  selector: 'app-votom-cloud-assets-signal',
  templateUrl: './votom-cloud-assets-signal.component.html',
  styleUrls: ['./votom-cloud-assets-signal.component.scss']
})
export class VotomCloudAssetsSignalComponent implements OnInit {
  locationId: string; // to store selected location's id.
  assetId: string; // to store selected asset's id.
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
  asset: Asset;
  disable = true;
  showUnassoc = false;
  showAssoc = true;
  constructor(
    private activatedRoute: ActivatedRoute,
    private route: Router,
    private toastr: ToastrService,
    private routerLocation: RouterLocation,
    private alertsService: AlertsService,
    private assetSignalService: AssetSignalService,
    private assetService: AssetsService,
    private domSanitizer: DomSanitizer,
  ) {}

  ngOnInit() {
    this.assetId = this.activatedRoute.snapshot.params.assetId;
    this.activatedRoute.paramMap.subscribe(params => {
      this.organizationId = params.get('parentOrgId');
      this.locationId = params.get('parentLocId');
      this.assetId = params.get('assetId');
      console.log(this.curOrganizationId, '====', this.curOrganizationName, '====', this.organizationId);
      this.getAssetById();
      this.getAssetSignalAssociation();
      this.getAlertRulesList();
    });
    // this.getAssetById();
  }

  getAssetById() {
    this.assetService.getAssetById(this.assetId).subscribe(response => {
      console.log('response from get ', response);
      this.asset = response;
      if (this.asset.logo.imageName && this.asset.logo.image) {
        const fileExtension = this.asset.logo.imageName.slice((Math.max(0, this.asset.logo.imageName.lastIndexOf('.')) || Infinity) + 1);
        this.imgURL = this.domSanitizer.bypassSecurityTrustUrl(
          'data:image/' + fileExtension + ';base64,' + this.asset.logo.image
        );
      } else {
        this.imgURL = '../../../../assets/images/default-image.svg';
      }
    });
  }

  getAlertRulesList() {
    console.log(this.organizationId);
    this.alertsService.getAllAlertsByOrgId(this.organizationId)
      .subscribe(response => {
        this.alertRules = response;
      });
  }

  getAllAvailableSignals() {
    this.assetSignalService.getAvailableSignalsForLocation('location', this.locationId).subscribe(response => {
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

  getAssetSignalAssociation() {
    this.isGetAssociatedSignalsAPILoading = true;
    this.assetSignalService.getAssetSignalAssociation(this.assetId)
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
            signal.did = i;
            signal.bound = true;
          }
          this.associatedSignals = [...response];
        },
        error => {
          this.isGetAssociatedSignalsAPILoading = false;
        }
      );
  }

  toggleDisable() {
    this.disable = !this.disable;
    this.showUnassoc = !this.disable;
    this.showAssoc = true;
  }

  onDetachSignalFromAsset(signalMappingId) {
    this.assetSignalService.detachSignalAssociation(signalMappingId).subscribe(
      response => {
        this.toaster.onSuccess('Signal detached successfully', 'Detached');
        this.getAssetSignalAssociation();
        this.toggleDisable();
      }
    );
  }

  onClickOfAlarmRuleAssociation(alertObj) {
    this.alertsService.updateAlertRule(alertObj).subscribe(
      response => {
        this.toaster.onSuccess('Alarm Rule associated successfully.', 'Association Saved!');
        this.toggleDisable();
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
        assetId: this.assetId,
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
    this.assetSignalService.createSignalAssociation(data)
      .subscribe(
        response => {
          console.log(response);
          this.toaster.onSuccess('Signal associated successfully', 'Saved');
          this.getAssetSignalAssociation();
          this.toggleDisable();
        }, error => {
          this.toaster.onFailure('Error while saving signal assocition', 'Error');
        }
      );
  }

  onReset() {
    this.getAssetSignalAssociation();
    this.toggleDisable();
  }

}
