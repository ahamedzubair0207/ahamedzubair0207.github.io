import { SharedService } from 'src/app/services/shared.service';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Toaster } from '../../votm-cloud-toaster/votm-cloud-toaster';
import { DbItem } from 'src/app/models/db-item';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { DashBoard } from 'src/app/models/dashboard.model';
import { TimeSeriesService } from 'src/app/services/timeSeries/time-series.service';
import { VotmCommon } from '../../votm-common';
import { Router, RouterEvent, ActivatedRoute, ParamMap } from '@angular/router';
import { filter } from 'rxjs/operators';
import { ConfigSettingsService } from 'src/app/services/configSettings/configSettings.service';
import { SignalRService } from 'src/app/services/signalR/signal-r.service';
import * as moment from 'moment-timezone';
import { DataTableWidget } from 'src/app/models/data-table-widget.model';
import { DashboardService } from 'src/app/services/dasboards/dashboard.service';


const enum State {
  Unknown,
  Nominal,
  Warn,
  Critical
}

@Component({
  selector: 'app-votm-data-table',
  templateUrl: './votm-data-table.component.html',
  styleUrls: ['./votm-data-table.component.scss'],
  providers: [NgbModalConfig, NgbModal]
})
export class VotmDataTableComponent implements OnInit, OnDestroy {
  @Input() data: DashBoard;
  @Input() id: string;
  @Input() locked: boolean;

  wConfig;
  configured = false;
  wId = '';
  selAll = false;
  selCount = 0;
  showOrg = false;
  showLoc = false;
  showAsset = true;
  showSensor = false;
  showStatus = true;
  private showState: boolean = false;
  title = '';
  timestamp = '';
  isSignalsDataLoading = false;
  isGetDashboardConfigLoading = false;
  signalTypes: any[] = [
    { type: 'Absolute Pressure', uom: 'psi', nominal: 1500, var: 5 },
    { type: 'Temperature', uom: '°F', nominal: 100, var: 2 },
    { type: 'humidity', uom: '%', nominal: 50, var: 1 },
    { type: 'Peak Current', uom: '%', nominal: 50, var: 3 }
  ];

  

  signals: any = [];
  pageLabels: any;
  currentUrl: any;
  isParent: any = true;
  parentOrgId: string;
  loggedInUser: any;
  dashboardWidget: any;
  dataTableWidget: DataTableWidget = new DataTableWidget();
  toaster: Toaster = new Toaster(this.toastr);

  constructor(
    private router: Router,
    private modalService: NgbModal,
    private timeSeries: TimeSeriesService,
    private configSettingsService: ConfigSettingsService,
    ngbModalConfig: NgbModalConfig,
    private signalRService: SignalRService,
    private route: ActivatedRoute,
    private sharedService: SharedService,
    private dashboardService: DashboardService,
    private toastr: ToastrService
  ) {
    ngbModalConfig.backdrop = 'static';
    ngbModalConfig.keyboard = false;
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.parentOrgId = params.get('curOrgId');
    });

    this.loggedInUser = this.sharedService.getLoggedInUser();
    if (this.data) {
      this.getSignalData();
      this.wId = this.data.dashboardId + '-' + this.id;
      this.wConfig = (this.data.widgetConf) ?
      this.data.widgetConf :
      { title: '', showSensor: false, showOrg: false, showLoc: false, showAsset: true, showStatus: true };
      if (this.data.dashboardId) {
        this.getDashboardWidget();
      }
    }
    this.getScreenLabels();
  }

  getSignalData() {
    if (this.router.url.startsWith(`/org/edit`) || this.router.url.startsWith(`/org/view`)) {
      if (this.data.organizationId) {
        this.getSignalsAssociatedAssetByOrgId(this.data.organizationId);
      }
    } else if (this.router.url.startsWith(`/loc/edit`) || this.router.url.startsWith(`/loc/view`)) {
      if (this.data.locationId) {
        this.getSignalsAssociatedByLocationId(this.data.locationId);
      }
    } else if (this.router.url.startsWith(`/asset/view`) || this.router.url.startsWith(`/asset/edit`)) {
      if (this.data.assetId) {
        this.getSignalsAssociatedByAssetId(this.data.assetId);
      }
    }
  }


  ngOnDestroy() {
    this.signalRService.closeSignalRConnection();
  }

  getScreenLabels() {
    this.configSettingsService.getDataTableConfigScreenLabels()
      .subscribe(response => {
        this.pageLabels = response;
      });
  }

  open(config) {
    this.signalRService.closeSignalRConnection();
    this.modalService.open(config, { size: 'lg' }).result.then((result) => {
      if (result === 'save') {
        const selectedSignals = [];
        this.signals.forEach(signal => {
          if (signal.sel) {
            selectedSignals.push(signal.signalMappingId);
          }
        });
        this.dataTableWidget.signals = selectedSignals;
        const datatablebody = {
          widgetName: 'Data Table Widget',
          dashBoardId: this.data ? this.data.dashboardId : null,
          widgetConfiguration: JSON.stringify(this.dataTableWidget),
          published: true,
          active: true
        };
        // console.log('datatablebody ', datatablebody);
        if (this.dashboardWidget) {
          // tslint:disable-next-line: no-string-literal
          datatablebody['dashboardWidgetId'] = this.dashboardWidget.dashboardWidgetId;
          this.dashboardService.updateDashboardWidget(datatablebody)
          .subscribe(response => {
            this.toaster.onSuccess('Chart Updated Successfully', 'Success');
            this.getDashboardWidget();
          });
        } else {
          this.dashboardService.saveDashboardWidget(datatablebody)
            .subscribe(response => {
              this.toaster.onSuccess('Chart Configured Successfully', 'Success');
              this.getDashboardWidget();
            });
        }
      }
    });
  }


  private loadChart() {
    let ts = new Date();
    this.configured = true;
    this.wConfig.showOrg = this.dataTableWidget.displayOrg;
    this.wConfig.showLoc = this.dataTableWidget.displayLoc;
    this.wConfig.showAsset = this.dataTableWidget.displayAsset;
    this.wConfig.showSensor = this.dataTableWidget.displaySensor;
    this.wConfig.showStatus = this.dataTableWidget.displayStatus;
    this.wConfig.title = this.dataTableWidget.title;
    this.timestamp = moment(new Date()).tz(this.loggedInUser.userConfigSettings[0].timeZoneDescription)
      .format(moment.localeData(this.loggedInUser.userConfigSettings[0].localeName)
        .longDateFormat('L')) + ' '
      + moment(new Date()).tz(this.loggedInUser.userConfigSettings[0].timeZoneDescription)
        .format(moment.localeData(this.loggedInUser.userConfigSettings[0].localeName)
          .longDateFormat('LTS'));
    if (this.signals.length  > 0) {
      this.liveSignalValues();
    }
  }

  getDashboardWidget() {
    this.isGetDashboardConfigLoading = true;
    this.dashboardService.getDashboardWidgets(this.data.dashboardId)
      .subscribe(response => {
        if (response && response.length > 0) {
          response.forEach(widget => {
            if (widget.widgetName === 'Data Table Widget') {
              this.dashboardWidget = widget;
              this.dataTableWidget = JSON.parse(widget.widgetConfiguration);
              this.wConfig.showOrg = this.dataTableWidget.displayOrg;
              this.wConfig.showLoc = this.dataTableWidget.displayLoc;
              this.wConfig.showAsset = this.dataTableWidget.displayAsset;
              this.wConfig.showSensor = this.dataTableWidget.displaySensor;
              this.wConfig.showStatus = this.dataTableWidget.displayStatus;
              this.wConfig.title = this.dataTableWidget.title;
              // console.log('this.dataTableWidget ', this.dataTableWidget);
              this.configured = true;
              this.selectSignals();
              this.loadChart();
              this.isGetDashboardConfigLoading = false;
            }
          });

        }
      });
  }

  selectSignals() {
    if (this.signals && this.signals.length > 0 && this.dataTableWidget && this.dataTableWidget.signals
      && this.dataTableWidget.signals.length > 0) {
      this.dataTableWidget.signals.forEach(selectedSignal => {
        this.signals.forEach(signal => {
          if (selectedSignal === signal.signalMappingId) {
            signal.sel = true;
          }
        });
      });
    }
  }

  liveSignalValues() {
    let connectionString = 'Sensor*';
    if (this.data.organizationId) {
      connectionString += this.data.organizationId;
    }
    if (this.data.locationId) {
      connectionString += '*' + this.data.locationId;
    }
    if (this.data.assetId) {
      connectionString += '*' + this.data.assetId;
    }
    // '7a59bdd8-6e1d-48f9-a961-aa60b2918dde*1387c6d3-cabc-41cf-a733-8ea9c9169831';
    this.signalRService.getSignalRConnection(connectionString);
    this.signalRService.signalData.subscribe(response => {
      const jsonData = JSON.parse(JSON.stringify(response));
      const index = this.signals.findIndex(assSig => {
        console.log(jsonData);
        console.log(assSig.parkerDeviceId, '===', jsonData.ParkerDeviceId);
        console.log(assSig.signalId, '===', jsonData.SignalId);
        console.log(assSig.sel);
        return assSig.parkerDeviceId === jsonData.ParkerDeviceId && assSig.signalId === jsonData.SignalId
          && assSig.sel;
      });
      if (index !== -1) {
        this.convertUOMData(jsonData, index);
      }
    });
  }

  convertUOMData(signalRObj, index) {
    // console.log(signalRObj);
    const arr = [];
    arr.push({
      uomValue: signalRObj.SignalValue,
      signalId: signalRObj.SignalId,
      sensorId: signalRObj.SensorId
    });
    const obj = {
      userId: this.loggedInUser.userId,
      organizationId: this.data.organizationId,
      locationId: this.data.locationId,
      precision: 3,
      uom: arr
    };

    this.sharedService.getUOMConversionData(obj).subscribe(
      response => {

        this.signals[index].value = response[0].uomValue + (response[0].uomname ? ' ' + response[0].uomname : '');
        this.signals[index].modifiedOn =
          moment(signalRObj.RecievedDateTime).tz(this.loggedInUser.userConfigSettings[0].timeZoneDescription)
            .format(moment.localeData(this.loggedInUser.userConfigSettings[0].localeName)
              .longDateFormat('L')) + ' '
          + moment(signalRObj.RecievedDateTime).tz(this.loggedInUser.userConfigSettings[0].timeZoneDescription)
            .format(moment.localeData(this.loggedInUser.userConfigSettings[0].localeName)
              .longDateFormat('LTS'));
      }
    );
  }

  selectSignal(idx) {
    if (idx === -1) {
      this.selAll = !this.selAll;
      this.signals.forEach(signal => signal.sel = this.selAll);
      this.selCount = (this.selAll) ? this.signals.length : 0;
    } else {
      this.signals[idx].sel = !this.signals[idx].sel;
      this.selCount = this.selCount + ((this.signals[idx].sel) ? 1 : -1);
      this.selAll = (this.selCount === this.signals.length);
    }
  }


  pathName(signal) {

    return signal.org + ((signal.org) ? ' ❯ ' : '') +
      signal.loc + ((signal.loc) ? ' ❯ ' : '') + signal.asset
      + ((signal.asset) ? ' ❯ ' : '') + signal.name;
  }

  selPathName(signal) {
    return ((this.wConfig.showOrg) ? (signal.org + ((signal.org) ? ' ❯ ' : '')) : '') +
      ((this.wConfig.showLoc) ? (signal.loc + ((signal.loc) ? ' ❯ ' : '')) : '') +
      ((this.wConfig.showAsset) ? (signal.asset + ((signal.asset) ? ' ❯ ' : '')) : '') + signal.name;
  }

  getBattery(signal) {
    if (signal.bat < 2.75) {
      return 'icon-battery-0';
    } else if (signal.bat < 2.8) {
      return 'icon-battery-25';
    } else if (signal.bat < 2.93) {
      return 'icon-battery-50';
    } else if (signal.bat < 2.98) {
      return 'icon-battery-75';
    } else {
      return 'icon-battery-100';
    }
  }

  getRSSI(signal) {
    if (signal.rssi < .151) {
      return 'icon-signal-25';
    } else if (signal.rssi < .181) {
      return 'icon-signal-50';
    } else if (signal.rssi < .291) {
      return 'icon-signal-75';
    } else {
      return 'icon-signal-100';
    }
  }

  getState(signal) {
    if (signal.state == State.Critical) return "icon-critical-red";
    else if (signal.state == State.Warn) return "icon-warn-yellow";
    else if (signal.state == State.Nominal) return "icon-nominal-green";
    else return "";
  }

  getStateBg(signal) {
    let classes = {
      "alert-danger": signal.state == State.Critical && this.showState,
      "alert-warning": signal.state == State.Warn && this.showState,
      "alert-success": signal.state == State.Nominal && this.showState,
      "text-body": signal != State.Unknown && this.showState
    };
    return classes;
  }

  onOrgCheckboxChange() {
    if (this.dataTableWidget.displayOrg) {
      this.dataTableWidget.displayLoc = true;
      this.dataTableWidget.displayAsset = true;
    }
    // console.log('onOrgCheckboxChange ', this.dataTableWidget)
  }

  onLocCheckboxChange() {
    if (this.dataTableWidget.displayLoc) {
      this.dataTableWidget.displayAsset = true;
    } else {
      this.dataTableWidget.displayOrg = false;
    }
    // console.log('onOrgCheckboxChange ', this.dataTableWidget)
  }

  onAssetCheckboxChange() {
    if (!this.dataTableWidget.displayAsset) {
      this.dataTableWidget.displayOrg = false;
      this.dataTableWidget.displayLoc = false;
    }
    // console.log('onOrgCheckboxChange ', this.dataTableWidget)
  }

  getUoM(signal) {
    return this.signalTypes.find(({ type }) => type === signal.type).uom;
  }

  getOrgTreeStructure(org, organizationLabel = null) {
    const orgLabel = (organizationLabel ? (organizationLabel + ' > ' ) : '') + org.shortName;
    if (org.locations) {
      org.locations.forEach(location => {
        this.getLocationTreeStructure(location, null, orgLabel);
      });
    }
    if (org.organizations) {
      org.organizations.forEach(organization => {
        this.getOrgTreeStructure(organization, orgLabel);
      });
    }
  }

  getLocationTreeStructure(location, locationLabel = null, orgLabel) {
    const locLabel = (locationLabel ? (locationLabel + ' > ' ) : '') + location.shortName;
    location.signals.forEach(signal => {
        this.getSignalStructure(signal, orgLabel, locLabel, null);
    });
    if (location.assets.length > 0) {
      location.assets.forEach(asset => {
        this.getAssetTreeStrucutre(asset, null, locLabel, orgLabel);
      });
    }
    if (location.locations) {
      location.locations.forEach(childLoc => {
        this.getLocationTreeStructure(childLoc, locLabel, orgLabel);
      });
    }
  }

  getAssetTreeStrucutre(asset, assetLabel, locLabel, orgLabel) {
    const aLabel = (assetLabel ? (assetLabel + ' > ' ) : '') + asset.shortName;
    asset.signals.forEach(signal => {
      this.getSignalStructure(signal, orgLabel, locLabel, aLabel);
    });
    if (asset.assets.length > 0) {
      asset.assets.forEach(childasset => {
        this.getAssetTreeStrucutre(childasset, aLabel, locLabel, orgLabel);
      });
    }
  }

  getSignalStructure(signal, orgLabel, locLabel, assetLabel) {
    let fullLabel = '';
    if (orgLabel) {
      let list = [];
      list = orgLabel.split(' > ');
      orgLabel = list[list.length - 1] + ' > ' + (locLabel ? (locLabel + ' > ') : '') + (assetLabel ? (assetLabel + ' > ') : '');
      fullLabel += orgLabel;
    } else {
      orgLabel = (locLabel ? (locLabel + ' > ') : '') + (assetLabel ? (assetLabel + ' > ') : '');
    }
    if (locLabel) {
      let list = [];
      list = locLabel.split(' > ');
      locLabel = list[list.length - 1] + ' > ' + (assetLabel ? (assetLabel + ' > ') : '');
      fullLabel += locLabel;
    } else {
      locLabel = (assetLabel ? (assetLabel + ' > ') : '');
    }
    if (assetLabel) {
      let list = [];
      list = assetLabel.split(' > ');
      assetLabel = assetLabel + ' > ';
      fullLabel += assetLabel;
    }
    console.log(orgLabel);
    console.log(locLabel);
    console.log(assetLabel);
    this.signals.push({
      type: signal.signalType,
      organization: orgLabel,
      location: locLabel,
      asset: assetLabel,
      fullLabel,
      name: signal.signalName, sel: false, value: signal.Value,
      bat: signal.Battery, rssi: signal.signalId,
      sensor: signal.sensorName, iconFile: signal.iconFile,
      signalId: signal.signalId,
      parkerDeviceId: signal.parkerDeviceId,
      modifiedOn: this.timestamp,
      signalMappingId: signal.signalMappingId
    });
  }

  getSignalsAssociatedAssetByOrgId(orgId: string) {
    this.isSignalsDataLoading  = true;
    this.timeSeries.getSignalsAssociatedAssetByOrgId(orgId)
      .subscribe(async response => {
        // console.log('Time Series Signal', response);
        // this.mapSignals(response);
        if (response) {
          await this.getOrgTreeStructure(response);
          VotmCommon.getUniqueValues(this.signals);
          this.isSignalsDataLoading = false;
          this.selectSignals();
        }
      });
  }

  getSignalsAssociatedByLocationId(locId: string) {
    this.isSignalsDataLoading  = true;
    this.timeSeries.getTimeSeriesSignalsByLocationID(locId)
      .subscribe(async response => {
        // this.mapSignals(response);
        await this.getLocationTreeStructure(response, null, null);
        VotmCommon.getUniqueValues(this.signals);
        this.isSignalsDataLoading = false;
        this.selectSignals();
      });
  }

  getSignalsAssociatedByAssetId(assetId: string) {
    this.isSignalsDataLoading  = true;
    this.timeSeries.getTimeSeriesSignalsByAssetID(assetId)
      .subscribe(async response => {
        // this.mapSignals(response);
        await this.getAssetTreeStrucutre(response, null, null, null);
        VotmCommon.getUniqueValues(this.signals);
        this.isSignalsDataLoading = false;
        this.selectSignals();
      });
  }
}







// Old Code
// import { Component, OnInit, Input } from '@angular/core';
// import { ColumnMode } from '../../../../../assets/projects/swimlane/ngx-datatable/src/public-api';
// import { ToastrService } from 'ngx-toastr';
// import { Toaster } from '../../votm-cloud-toaster/votm-cloud-toaster';
// import { DbItem } from 'src/app/models/db-item';

// @Component({
//   selector: 'app-votm-data-table',
//   templateUrl: './votm-data-table.component.html',
//   styleUrls: ['./votm-data-table.component.scss']
// })
// export class VotmDataTableComponent implements OnInit {
//   rows = [];
//   loadingIndicator = true;
//   reorderable = true;
//   isDataTableConfigured: boolean;
//   customizeDataTable: any;
//   toaster: Toaster = new Toaster(this.toastr);
//   @Input() locked: boolean;
//   @Input() data: DbItem;

//   columns = [
//     { prop: 'signalName', summaryFunc: () => null },
//     { name: 'Data', summaryFunc: () => null  },
//     { prop: 'sensorId', summaryFunc: () => null },
//     { name: 'Signal', summaryFunc: () => null }
//   ];

//   ColumnMode = ColumnMode;

//   constructor(private toastr: ToastrService) {
//     this.fetch(data => {
//       this.rows = data;
//       setTimeout(() => {
//         this.loadingIndicator = false;
//       }, 1500);
//     });
//   }

//   ngOnInit() {
//     this.isDataTableConfigured = false;

//   }

//   fetch(cb) {
//     const req = new XMLHttpRequest();
//     req.open('GET', `assets/data/company_tree.json`);

//     req.onload = () => {
//       cb(JSON.parse(req.response));
//     };

//     req.send();
//   }

//   private summaryForGender(cells: string[]) {
//     // const males = cells.filter(cell => cell === 'male').length;
//     // const females = cells.filter(cell => cell === 'female').length;

//     // return `males: ${males}, females: ${females}`;
//   }

//   onClickOfCustomizeDataTableModalClose(){
//     this.customizeDataTable.style.display = 'none';
//   }

//   saveDataTableConfiguration(){
//     this.customizeDataTable.style.display = 'none';
//     this.toaster.onSuccess('Data Table Configured Successfully', 'Success');
//   }

//   onClickOfCustomizeDataTable(){
//     // Open Chart configuration modal popup
//     const modal = document.getElementById('configure-data-table-modal');
//     modal.style.display = 'block';
//     this.customizeDataTable = document.getElementById('configure-data-table-modal');
//     window.onclick = (event) => {
//       if (event.target === modal) {
//         modal.style.display = 'none';
//       }
//     };
//   }

//   getDataTableConfiguration() {

//     // Call service to get configured chart data & to verify chart is configured or not
//     // this.widgetService.getColumnChartConfiguration().subscribe(
//     //   response => {
//     //     this.isColumnChartConfigured = true;
//     //   }, error => {
//     //     this.isColumnChartConfigured = false;
//     //   }
//     // );
//     this.isDataTableConfigured = true;

//   }


// }
