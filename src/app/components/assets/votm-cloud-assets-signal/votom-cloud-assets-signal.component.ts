import { SharedService } from 'src/app/services/shared.service';
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
  organizationName: string;
  sensors = [];
  derivedSignals: any = [];
  alertRules: any[] = [];
  asset: Asset;
  disable = true;
  showUnassoc = false;
  showAssoc = true;
  pageType: string;
  constructor(
    private activatedRoute: ActivatedRoute,
    private route: Router,
    private toastr: ToastrService,
    private sharedService: SharedService,
    private alertsService: AlertsService,
    private assetSignalService: AssetSignalService,
    private assetService: AssetsService,
    private domSanitizer: DomSanitizer,
  ) {}

  ngOnInit() {
    this.pageType = this.activatedRoute.snapshot.data['type'];
    if (this.pageType.toLowerCase() === 'edit') {
      this.toggleDisable();
    }
    this.assetId = this.activatedRoute.snapshot.params.assetId;
    this.activatedRoute.paramMap.subscribe(params => {
      this.organizationId = params.get('parentOrgId');
      this.organizationName = params.get('parentOrgName');
      this.locationId = params.get('parentLocId');
      this.assetId = params.get('assetId');
      // console.log('====', this.organizationId);
      this.getAssetById();
      this.getAssetSignalAssociation();
      this.getAlertRulesList();
    });
    // this.getAssetById();
  }

  getAssetById() {
    this.assetService.getAssetById(this.assetId).subscribe(response => {
      // console.log('response from get ', response);
      this.asset = response;
      if (this.asset.logo.imageName && this.asset.logo.image) {
        let fileExtension = this.asset.logo.imageName.slice((Math.max(0, this.asset.logo.imageName.lastIndexOf('.')) || Infinity) + 1);
        // For svg type files use svg+xml as extention
        if (fileExtension === 'svg') {
          fileExtension = 'svg+xml';
        }
        this.imgURL = this.domSanitizer.bypassSecurityTrustUrl(
          'data:image/' + fileExtension + ';base64,' + this.asset.logo.image
        );
      } else {
        this.imgURL = '../../../../assets/images/assetPlaceholder.svg';
      }
      // console.log(this.imgURL);
    });
  }

  getAlertRulesList() {
    // console.log(this.organizationId);
    this.alertsService.getAllAlertsByOrgId(this.organizationId)
      .subscribe(response => {
        this.alertRules = response;
      });
  }

  getAllAvailableSignals() {
    this.assetSignalService.getAvailableSignalsForLocation('location', this.locationId).subscribe(async response => {
      // console.log(response);
      this.sensors = response;
      for (const sensor of this.sensors) {
        sensor.node = await this.sharedService.toSortListAlphabetically(sensor.node, 'signalName');
        for (const signal of sensor.node) {
          signal.sensorId = sensor.sensorId;
          signal.sensorName = sensor.sensorName;
          signal.signalId = signal.signalId;
          signal.signalName = signal.signalName;
          signal.associationName = signal.signalName;
          signal.associated = false;
          signal.imageCordinates = {
            x: 0,
            y: 0
          };
          signal.icon = signal.iconFile;
          for (const associateSignal of this.associatedSignals) {
            if (associateSignal.signalId === signal.signalId &&
              associateSignal.sensorId === signal.sensorId) {
              signal.associated = true;
              signal.associationName = associateSignal.associationName;

            }
          }
        }
      }
      // console.log(response);
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
            signal.pctPos = {};
            signal.pctPos['left'] = signal.imageCordinates.x;
            signal.pctPos['top'] = signal.imageCordinates.y;
            signal.isClicked = false;
            signal.icon = signal.iconFile;
            signal.associated = true;
            signal.did = i;
            signal.bound = signal.sensorLinkStatus;
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
    this.assetSignalService.updateAlertSignalMapping(alertObj.alerts, alertObj.signalMappingId).subscribe(
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
        signalMappingId: signal.signalMappingId ? signal.signalMappingId : null
      };
      obj.imageCordinates[signal.associationName] = {
        x: signal.pctPos['left'],
        y: signal.pctPos['top']
      };
      return obj;
    });
    this.assetSignalService.createSignalAssociation(data)
      .subscribe(
        response => {
          // console.log(response);
          this.toaster.onSuccess('Signal associated successfully', 'Saved');
          this.getAssetSignalAssociation();
          this.toggleDisable();
        }, error => {
          this.toaster.onFailure('Error while saving signal assocition', 'Error');
        }
      );
  }

  onCreateAssociateRule(signal) {
    this.route.navigate(['org', 'view', 'null', 'null',
    this.organizationId, 'alertRule', 'create']);
    this.sharedService.setSignalDataForAlert(signal);
  }

  onReset() {
    this.getAssetSignalAssociation();
    this.toggleDisable();
  }

  onReturnToList() {
    if (this.locationId) {
      this.route.navigate(['asset', 'home', this.organizationId, this.organizationName, this.locationId]);
      return;
    }
    this.route.navigate(['asset', 'home', this.organizationId, this.organizationName]);
  }

}
