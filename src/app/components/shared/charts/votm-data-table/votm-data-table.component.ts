import { Component, OnInit, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Toaster } from '../../votm-cloud-toaster/votm-cloud-toaster';
import { DbItem } from 'src/app/models/db-item';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DashBoard } from 'src/app/models/dashboard.model';
import { TimeSeriesService } from 'src/app/services/timeSeries/time-series.service';

@Component({
  selector: 'app-votm-data-table',
  templateUrl: './votm-data-table.component.html',
  styleUrls: ['./votm-data-table.component.scss']
})
export class VotmDataTableComponent implements OnInit {
  @Input() data: DashBoard;
  @Input() id: string;
  @Input() locked: boolean;

  private wConfig;
  private configured: boolean = false;
  private wId: string = '';
  private selAll: boolean = false;
  private selCount: number = 0;
  private showOrg: boolean = false;
  private showLoc: boolean = false;
  private showAsset: boolean = true;
  private showSensor: boolean = false;
  private showStatus: boolean = true;
  private title: string = "";
  private timestamp: string = "";
  private signalTypes: any[] = [
    { "type": "Absolute Pressure", "uom": "psi", "nominal": 1500, "var": 5 },
    { "type": "Temperature", "uom": "°F", "nominal": 100, "var": 2 },
    { "type": "humidity", "uom": "%", "nominal": 50, "var": 1 },
    { "type": "Peak Current", "uom": "%", "nominal": 50, "var": 3 }
  ]
  
  signals: any = [];
  // [
  //   { "type": "temperature", "org": "QCD", "loc": "GV ❯ Prod", "asset": "", "name": "Ambient Temperature", "sel": false, "value": 105.5, "bat": 3.0, "rssi": .17, "sensor": "E5000001" },
  //   { "type": "temperature", "org": "QCD", "loc": "GV ❯ Prod", "asset": "EAP1", "name": "Exhaust", "sel": false, "value": 94.1, "bat": 2.9, "rssi": .31, "sensor": "E5000001" },
  //   { "type": "temperature", "org": "QCD", "loc": "GV ❯ Prod", "asset": "EAP2", "name": "Exhaust", "sel": false, "value": 101.4, "bat": 2.85, "rssi": .20, "sensor": "E5000001" },
  //   { "type": "pressure", "org": "QCD", "loc": "GV ❯ Lab", "asset": "IB", "name": "Main Pump", "sel": false, "value": 1503.0, "bat": 3.0, "rssi": .22, "sensor": "E4000001" },
  //   { "type": "pressure", "org": "QCD", "loc": "GV ❯ Lab", "asset": "IB", "name": "Drain Pan Suction", "sel": false, "value": 1467.3, "bat": 2.76, "rssi": .29, "sensor": "E4000002" },
  //   { "type": "temperature", "org": "QCD", "loc": "GV ❯ Lab", "asset": "IB", "name": "Oil Cooler", "sel": false, "value": 74.5, "bat": 2.9, "rssi": .25, "sensor": "E5000001" },
  //   { "type": "temperature", "org": "QCD", "loc": "GV ❯ Lab", "asset": "IB", "name": "Oil Reservoir", "sel": false, "value": 80.1, "bat": 2.87, "rssi": .14, "sensor": "E5000001" },
  //   { "type": "pressure", "org": "QCD", "loc": "GV ❯ Lab", "asset": "IB", "name": "Impulse #2 Pilot Pressure", "sel": false, "value": 1356, "bat": 3.0, "rssi": .17, "sensor": "E4000001" },
  //   { "type": "pressure", "org": "QCD", "loc": "GV ❯ Lab", "asset": "IB", "name": "Accumulator", "sel": false, "value": 4320.3, "bat": 2.78, "rssi": .22, "sensor": "E4000001" },
  //   { "type": "pressure", "org": "QCD", "loc": "GV ❯ Lab", "asset": "IB", "name": "Main Pump Suction", "sel": false, "value": 10.3, "bat": 2.87, "rssi": .34, "sensor": "E2000001" },
  //   { "type": "humidity", "org": "QCD", "loc": "GB", "asset": "", "name": "Furness Supply Humidity", "sel": false, "value": 34.2, "bat": 3.02, "rssi": .12, "sensor": "E7000001" },
  //   { "type": "humidity", "org": "QCD", "loc": "GB", "asset": "", "name": "Cleanroom Supply Humidity", "sel": false, "value": 53.0, "bat": 2.9, "rssi": .19, "sensor": "E7000001" }
  // ];

  // [];

  constructor(private modalService: NgbModal, private timeSeries: TimeSeriesService) { }

  ngOnInit() {
    if (this.data) {
      if (this.data.organizationId) {
        // this.getSignalsAssociatedAssetByOrgId(this.data.organizationId);
        this.getUpdatedData();
        this.getSignalsAssociatedByAssetId(this.data.locationId);
        this.getSignalsAssociatedByLocationId(this.data.assetId);
        
      }
      this.wId = this.data.dashboardId + "-" + this.id;
      this.wConfig = (this.data.widgetConf) ? this.data.widgetConf : { "title": "", "showSensor": false, "showOrg": false, "showLoc": false, "showAsset": true, "showStatus": true };
    }
    
  }

  ngAfterViewInit() {
  }

  ngOnDestroy() {
  }

  open(config) {
    this.modalService.open(config, { size: 'lg' }).result.then((result) => {
      if (result === 'save') {
        let ts = new Date();
        this.configured = true;
        this.wConfig.showOrg = this.showOrg;
        this.wConfig.showLoc = this.showLoc;
        this.wConfig.showAsset = this.showAsset;
        this.wConfig.showSensor = this.showSensor;
        this.wConfig.showStatus = this.showStatus;
        this.wConfig.title = this.title;
        this.timestamp = ts.getFullYear() + "-" + (ts.getMonth() + 1) + "-" + ts.getDate() + " " + ts.getHours() + ":" + ts.getMinutes() + ":" + ts.getSeconds();
      }
    });
  }


  selectSignal(idx) {
    if (idx == -1) {
      this.selAll = !this.selAll;
      this.signals.forEach(signal => signal.sel = this.selAll);
      this.selCount = (this.selAll) ? this.signals.length : 0;
    } else {
      this.signals[idx].sel = !this.signals[idx].sel;
      this.selCount = this.selCount + ((this.signals[idx].sel) ? 1 : -1);
      this.selAll = (this.selCount == this.signals.length);
    }
  }


  pathName(signal) {
    
    return signal.org + ((signal.org) ? " ❯ " : "") + signal.loc + ((signal.loc) ? " ❯ " : "") + signal.asset + ((signal.asset) ? " ❯ " : "") + signal.name;
  }

  selPathName(signal) {
    return ((this.wConfig.showOrg) ? (signal.org + ((signal.org) ? " ❯ " : "")) : "") +
      ((this.wConfig.showLoc) ? (signal.loc + ((signal.loc) ? " ❯ " : "")) : "") +
      ((this.wConfig.showAsset) ? (signal.asset + ((signal.asset) ? " ❯ " : "")) : "") + signal.name;
  }

  getBattery(signal) {
    if (signal.bat < 2.75) return "icon-battery-0";
    else if (signal.bat < 2.8) return "icon-battery-25";
    else if (signal.bat < 2.93) return "icon-battery-50";
    else if (signal.bat < 2.98) return "icon-battery-75";
    else return "icon-battery-100";
  }

  getRSSI(signal) {
    if (signal.rssi < .151) return "icon-signal-25";
    else if (signal.rssi < .181) return "icon-signal-50";
    else if (signal.rssi < .291) return "icon-signal-75";
    else return "icon-signal-100";
  }

  toggleShowOrg() {
    this.showOrg = !this.showOrg;
    if (this.showOrg) this.showLoc = this.showAsset = true;
  }

  toggleShowLoc() {
    this.showLoc = !this.showLoc;
    if (this.showLoc) this.showAsset = true;
    else this.showOrg = false;
  }

  toggleShowAsset() {
    this.showAsset = !this.showAsset;
    if (!this.showAsset) this.showOrg = this.showLoc = false;
  }

  getUoM(signal) {
    return this.signalTypes.find(({ type }) => type === signal.type).uom;
  }


  getUpdatedData(){
    this.timeSeries.getDataTable()
    .subscribe(response => {
      // response.signals = [];
      console.log("List of Data", response);
      let sigArray = [];
      if (response) {
        // Location
        if (response.locations && response.locations.length > 0) {
          response.locations.forEach(location => {
            // Direct Signal
            if (location.signals && location.signals.length > 0) {
              location.signals.forEach(signal => {
                sigArray.push({ "type": signal.signalType,  "name": `${response.organizationName} > ${location.locationName} > ${signal.signalName}`, "sel": false, "value": signal.Value, "bat": signal.Battery, "rssi": signal.Signal, "sensor": signal.Sensor })
                // sigArray.push({ "type": signal.signalType, "org": response.organizationName, "loc": location.locationName, "asset": "", "name": signal.signalName, "sel": false, "value": signal.Value, "bat": signal.Battery, "rssi": signal.Signal, "sensor": signal.Sensor })
              });
            }

            // Asset
            if (location.assets && location.assets.length > 0) {
              location.assets.forEach(asset => {
                if (asset.signals && asset.signals.length > 0) {
                  asset.signals.forEach(signal => {
                    sigArray.push({ "type": signal.signalType, "name": `${response.organizationName} > ${location.locationName} > ${asset.assetName} > ${signal.signalName}`, "sel": false, "value": signal.Value, "bat": signal.Battery, "rssi": signal.Signal, "sensor": signal.Sensor })
                    // sigArray.push({ "type": signal.signalType, "org": response.organizationName, "loc": location.locationName, "asset": asset.assetName, "name": signal.signalName, "sel": false, "value": signal.Value, "bat": signal.Battery, "rssi": signal.Signal, "sensor": signal.Sensor })
                  });
                }
              })
            }
          })
        }
      }
      this.signals = sigArray; //.reduce((acc, cur) => acc.some(x => (x.id === cur.id)) ? acc : acc.concat(cur), [])
      console.log('this.signals ', this.signals)
    });
  }

  getSignalsAssociatedAssetByOrgId(orgId: string) {
    this.timeSeries.getSignalsAssociatedAssetByOrgId(orgId)
      .subscribe(response => {
        console.log('Time Series Signal', response);
        let tempArray = [];
        if (response) {
          // Location
          if (response.locations && response.locations.length > 0) {
            response.locations.forEach(location => {
              // Direct Signal
              if (location.signals && location.signals.length > 0) {
                location.signals.forEach(signal => {
                  tempArray.push({ "id": signal.signalId, "type": signal.signalType, "name": `QCD > ${location.locationName} > ${signal.signalName}` })
                });
              }

              // Asset
              if (location.assets && location.assets.length > 0) {
                location.assets.forEach(asset => {
                  if (asset.signals && asset.signals.length > 0) {
                    asset.signals.forEach(signal => {
                      tempArray.push({ "id": signal.signalId, "type": signal.signalType, "name": `QCD > ${location.locationName} > ${asset.assetName} > ${signal.signalName}` })
                    });
                  }
                })
              }
            })
          }
        }
        this.signals = tempArray.reduce((acc, cur) => acc.some(x => (x.id === cur.id)) ? acc : acc.concat(cur), [])
      });

  }

  getSignalsAssociatedByAssetId(assetId: string){
    this.timeSeries.getTimeSeriesSignalsByLocationID(assetId)
    .subscribe(response => {
      console.log('Signals by Asset ID', response);
    });
  }

  getSignalsAssociatedByLocationId(locId: string){
    this.timeSeries.getTimeSeriesSignalsByAssetID(locId)
    .subscribe(response => {
      console.log('Signals by Location ID', response);
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
