import { Component, NgZone, Input, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { DbItem } from 'src/app/models/db-item';
import { DashBoard } from 'src/app/models/dashboard.model';
import { timeseries } from 'src/assets/data/time-series';
import { TimeSeriesService } from 'src/app/services/timeSeries/time-series.service';

am4core.useTheme(am4themes_animated);

@Component({
  selector: 'app-votm-line-graph',
  templateUrl: './votm-line-graph.component.html',
  styleUrls: ['./votm-line-graph.component.scss']
})
export class VotmLineGraphComponent implements OnInit {
  @Input() data: DashBoard;
  @Input() id: string;
  @Input() locked: boolean;

  // @ViewChild('config', null) configModal: any;
  signalCheckBoxes = [];
  "hideCredits": true;
  signalAssociatedWithTimeSeries: any = {};
  orgId: string;
  private wConfig;
  private configured: boolean = false;
  private chart: am4charts.XYChart;
  private wId: string = '';
  private showMinMax: boolean = true;
  private showThresh: boolean[] = [false, false];
  private showLegend: boolean = true;
  private autoScaleY: boolean[] = [true, true];
  private legendWidth;
  private selDateRange: string = "5m";
  private selDynDateRng: string = this.selDateRange;
  private selYAxisRange: string[] = ["auto", "auto"];
  private rangeYAxisMin: number[] = [null, null];
  private rangeYAxisMax: number[] = [null, null];
  private rangeSeriesSet: boolean = false;
  private signalTypes: any[] = [
    { "type": "pressure", "uom": "psi", "nominal": 1500, "var": 5 },
    { "type": "temperature", "uom": "°F", "nominal": 100, "var": 2 },
    { "type": "humidity", "uom": "%RH", "nominal": 50, "var": 1 }
  ]

  private dateRange: any[] = [
    {"value": "5m", "name": "five Minute"},
    {"value": "10m", "name": "ten Minute"},
    {"value": "20m", "name": "twenty Minute"},
    {"value": "30m", "name": "thirty Minute"},
    {"value": "1h", "name": "One hour"},
    {"value": "5h", "name": "five hour"},
    {"value": "10h", "name": "ten hour"},
    {"value": "1d", "name": "one day"}
    // 5m , 10m, 20m, 30m, 1h, 5h, 10h, 20h, 1d
  ]

  yAxisType: string[] = ["", ""];
  yAxisSignals: number[] = [0, 0];

  signals: any = [];
  //   [{ "type": "temperature", "name": "GV ❯ Prod ❯ Ambient Temperature", "selY": [false, false] },
  //   { "type": "temperature", "name": "GV ❯ Prod ❯ EAP1 ❯ Exhaust", "selY": [false, false] },
  //   { "type": "temperature", "name": "GV ❯ Prod ❯ EAP2 ❯ Exhaust", "selY": [false, false] },
  //   { "type": "pressure", "name": "GV ❯ Lab ❯ IB ❯ Main Pump", "selY": [false, false] },
  //   { "type": "pressure", "name": "GV ❯ Lab ❯ IB ❯ Drain Pan Suction", "selY": [false, false] },
  //   { "type": "temperature", "name": "GV ❯ Lab ❯ IB ❯ Oil Cooler", "selY": [false, false] },
  //   { "type": "temperature", "name": "GV ❯ Lab ❯ IB ❯ Oil Reservoir", "selY": [false, false] },
  //   { "type": "pressure", "name": "GV ❯ Lab ❯ IB ❯ Impulse #2 Pilot Pressure", "selY": [false, false] },
  //   { "type": "pressure", "name": "GV ❯ Lab ❯ IB ❯ Accumulator", "selY": [false, false] },
  //   { "type": "pressure", "name": "GV ❯ Lab ❯ IB ❯ Main Pump Suction", "selY": [false, false] },
  //   { "type": "humidity", "name": "GB ❯ Furness Supply Humidity", "selY": [false, false] },
  //   { "type": "humidity", "name": "GB ❯ Cleanroom Supply Humidity", "selY": [false, false] }
  // ];

  constructor(private modalService: NgbModal, private zone: NgZone, private timeSeries: TimeSeriesService) { }

  ngOnInit() {
    console.log('this.data ', this.data)
    if (this.data) {
      if (this.data.organizationId) {
        this.getSignalsAssociatedAssetByOrgId(this.data.organizationId);
      }
      this.wId = this.data.dashboardId + "-" + this.id;
      this.wConfig = (this.data.widgetConf) ? this.data.widgetConf : { yMin: [null, null], yMax: [null, null] };
    }

  }
  // id: any;
  // isTrendChartConfigured: boolean;
  // customizeTrendChart: any;
  // toaster: Toaster = new Toaster(this.toastr);
  

  // @Input() data: DbItem;
  // @Input() id: any;
  // @Input() locked: boolean;

  ngAfterViewInit() {

  }

  ngOnDestroy() {
    this.zone.runOutsideAngular(() => {
      if (this.chart) {
        this.chart.dispose();
      }
    });
  }

  onRadioGroupChange(){
    this.saveResult();
  }

  // closeModal(){
  //   this.configModal.close()
  // }

  saveResult() {
    console.log("Save Result");
    let body = {
      "accountCode": "PCM",
      "propertyName": "SignalId",
      "propertyValue": '',
      "measuredValue": "SignalValue",
      "fromDateTime": "2018-11-18T20:16:43.863Z",//new Date(`${new Date().getMonth()}/${new Date().getDate()}/${new Date().getFullYear()-2}`),//
      "toDateTime":  new Date(),//"2019-11-20T20:23:43.863Z",
      "environmentFqdn": "41075d1a-97a6-4f2d-9abb-a1c08be5b6c4.env.timeseries.azure.com",
      "bucketSize": this.selDateRange
      // bucket Size: make it 5m , 10m, 20m, 30m, 1h, 5h, 10h, 20h, 1d, 5 
    };
   

    let selectedValues = [];
    console.log(' this.signalCheckBoxes ', this.signalCheckBoxes)
    for (var key in this.signalCheckBoxes) {
      if (this.signalCheckBoxes[key]) {
        selectedValues.push(key);
      }
    }
    let selectedSignals = [];
    this.signals.forEach(signal => {
      if (selectedValues.indexOf(signal.id) >= 0) {
        selectedSignals.push(signal);
      }
    })

    console.log('selected Vlaue ', selectedValues);
    if (selectedValues && selectedValues.length > 0) {
      body.propertyValue = selectedValues.join(',');
    }

    this.timeSeries.getTimeSeriesAggregateMultipleDevices(body)
      .subscribe(response => {
        if (this.chart) {
          this.chart.dispose();
          this.rangeSeriesSet = false;
        }

        this.configured = true;
        this.selDynDateRng = this.selDateRange;

        for (let i = 0; i < 2; i++) {
          this.rangeYAxisMin[i] = parseFloat(this.wConfig.yMin[i]);
          this.rangeYAxisMax[i] = parseFloat(this.wConfig.yMax[i]);
          this.autoScaleY[i] = (this.selYAxisRange[i] === "auto");
        }

        // Add amCharts 4 license
        // am4core.addLicense("CH192270209");

        // Add Maps license
        // am4core.addLicense("MP192270209");
        am4core.options.commercialLicense = true;
        hideCredits: true;
        // this.zone.runOutsideAngular(() => {
        let chart = am4core.create(this.wId, am4charts.XYChart);
        chart.paddingRight = 20;
        chart.data = response; // timeseries;// this.generateChartData();

        let title = chart.titles.create();
        title.text = (this.wConfig.title) ? this.wConfig.title : null;
        title.fontSize = 25;
        title.marginBottom = 30;

        let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
        dateAxis.renderer.line.strokeOpacity = 1;
        dateAxis.renderer.line.stroke = am4core.color("gray");
        dateAxis.tooltipDateFormat = "MM/dd/yyyy hh:mm:ss";

        if (this.yAxisSignals[0]) this.createValueAxis(chart, 0);
        if (this.yAxisSignals[1]) this.createValueAxis(chart, 1);

        let colorSet = new am4core.ColorSet();
        colorSet.step = 2;

        selectedSignals.forEach((signal, index) => {
          if (signal.selY[0] || signal.selY[1]) this.createAxisAndSeries(chart, signal, index, colorSet.next());
        });


        chart.legend = new am4charts.Legend();
        chart.legend.position = "right";
        chart.legend.valign = "top";
        chart.legend.itemContainers.template.tooltipText = "{name}";
        this.legendWidth = chart.legend.width;
        if (!this.showLegend) chart.legend.width = 0;

        chart.cursor = new am4charts.XYCursor();

        // var that = this;
        chart.events.on("ready", (ev) => {
          for (let i = 0; i < 2; i++) {
            if (this.selYAxisRange[i] === "rngMinMax") {
              this.rangeYAxisMin[i] = (<am4charts.ValueAxis>this.chart.yAxes.getIndex(i)).minZoomed;
              this.rangeYAxisMax[i] = (<am4charts.ValueAxis>this.chart.yAxes.getIndex(i)).maxZoomed;
            }
            if (this.selYAxisRange[i] !== "auto") {
              (<am4charts.ValueAxis>this.chart.yAxes.getIndex(i)).min = this.rangeYAxisMin[i];
              (<am4charts.ValueAxis>this.chart.yAxes.getIndex(i)).max = this.rangeYAxisMax[i];
            }
          }
        });

        this.chart = chart;
        console.log('this.chart ', this.chart)

        // });


        // console.log('response ', response);
        // this.chart.data = response;
        // console.log('this.chart ', this.chart)
      })
  }

  open(config) {
    console.log('Config ', config)
    this.modalService.open(config, { size: 'lg' }).result.then((result) => {
      if (result === 'save') {
        this.saveResult();
      }
    });
  }

  // Create value axis
  createValueAxis(chart, axis) {
    let valueYAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueYAxis.tooltip.disabled = true;
    valueYAxis.title.text = this.signalTypes.find(({ type }) => type === this.yAxisType[axis]).uom.toUpperCase();
    valueYAxis.renderer.line.strokeOpacity = 1;
    valueYAxis.renderer.line.stroke = am4core.color("gray");
    valueYAxis.renderer.labels.template.fill = am4core.color("gray");
    valueYAxis.renderer.opposite = (axis == 1);
    valueYAxis.renderer.grid.template.disabled = true;

    this.createThresholdRanges(valueYAxis, 0, this.signalTypes.find(({ type }) => type === this.yAxisType[axis]).nominal);
  }

  // Create thresholds
  createThresholdRanges(valueAxis, idx, nominal) {
    let thresholds = { lowCritical: nominal * .75, lowWarn: nominal * .9, highWarn: nominal * 1.1, highCritical: nominal * 1.25 };
    if (thresholds.lowCritical) {
      var rangeLC = valueAxis.axisRanges.create();
      rangeLC.value =  1000000; //-99999;
      rangeLC.endValue = thresholds.lowCritical;
      rangeLC.axisFill.fill = am4core.color("#dc3545");
      rangeLC.axisFill.fillOpacity = (this.showThresh[idx]) ? 0.2 : 0;
      rangeLC.grid.strokeOpacity = 0;
    }
    if (thresholds.lowWarn) {
      var rangeLW = valueAxis.axisRanges.create();
      rangeLW.value = (thresholds.lowCritical) ? thresholds.lowCritical : 1000000;
      rangeLW.endValue = thresholds.lowWarn;
      rangeLW.axisFill.fill = am4core.color("#ffc107");
      rangeLW.axisFill.fillOpacity = (this.showThresh[idx]) ? 0.2 : 0;
      rangeLW.grid.strokeOpacity = 0;
    }
    if (thresholds.highWarn) {
      var rangeHW = valueAxis.axisRanges.create();
      rangeHW.value = thresholds.highWarn;
      rangeHW.endValue = (thresholds.highCritical) ? thresholds.highCritical : 2000000;
      rangeHW.axisFill.fill = am4core.color("#ffc107");
      rangeHW.axisFill.fillOpacity = (this.showThresh[idx]) ? 0.2 : 0;
      rangeHW.grid.strokeOpacity = 0;
    }
    if (thresholds.highCritical) {
      var rangeHC = valueAxis.axisRanges.create();
      rangeHC.value = thresholds.highCritical;
      rangeHW.endValue =  1200000;
      // rangeHC.endValue = 99999;
      rangeHC.axisFill.fill = am4core.color("#dc3545");
      rangeHC.axisFill.fillOpacity = (this.showThresh[idx]) ? 0.2 : 0;
      rangeHC.grid.strokeOpacity = 0;
    }
  }

  // Create series
  createAxisAndSeries(chart, signal, idx, color) {
    let series = chart.series.push(new am4charts.LineSeries());
    let valueAxis = (<am4charts.ValueAxis>chart.yAxes.getIndex((signal.selY[0]) ? 0 : (this.yAxisSignals[0]) ? 1 : 0));
    let uom = this.signalTypes.find(({ type }) => type === signal.type).uom;
    series.dataFields.dateX = "Date";
    series.dataFields.valueY = "SigAvg" + idx;
    series.yAxis = valueAxis;
    series.name = signal.name;
    series.tooltipText = "[bold]{name}: [bold #000]{valueY} " + uom + "[/][#000] [[{SigMin" + idx + "} - {SigMax" + idx + "}]][/]";
    series.stroke = color;
    series.fill = color;
    series.showOnInit = false;
    series.defaultState.transitionDuration = 0;
    series.hiddenState.transitionDuration = 0;
    series.tooltip.getFillFromObject = false;
    series.tooltip.getStrokeFromObject = true;
    series.tooltip.background.fill = am4core.color("#fff");
    series.tooltip.autoTextColor = false;
    series.tooltip.label.fill = color;

    let series2 = chart.series.push(new am4charts.LineSeries());
    series2.dataFields.dateX = "Date";
    series2.dataFields.openValueY = "SigMin" + idx;
    series2.dataFields.valueY = "SigMax" + idx;
    series2.sequencedInterpolation = true;
    series2.fillOpacity = 0.3;
    series2.strokeWidth = 0;
    series2.fill = color;
    series2.yAxis = valueAxis;
    series2.hiddenInLegend = true;
    series2.showOnInit = false;
    series2.defaultState.transitionDuration = 0;
    series2.hiddenState.transitionDuration = 0;
    series2.name = "minMax";
    series2.hidden = !this.showMinMax;

    series.events.on("hidden", function () {
      series2.hide();
    });

    var that = this;
    series.events.on("shown", function () {
      if (that.showMinMax) series2.show();
    });

    if (!this.rangeSeriesSet) {
      this.rangeSeriesSet = true;
      chart.scrollbarX = new am4charts.XYChartScrollbar();
      (<am4charts.XYChartScrollbar>chart.scrollbarX).series.push(series);
      chart.scrollbarX.parent = chart.bottomAxesContainer;
    }
  }

  // generate some random data, quite different range
  generateChartData() {
    let chartData = [];
    let firstDate = new Date();
    firstDate.setDate(firstDate.getDate() - 100);
    firstDate.setHours(0, 0, 0, 0);

    for (var i = 0; i < 1000; i++) {
      let newDate = new Date(firstDate);
      newDate.setDate(newDate.getDate() + i);
      chartData.push({ date: newDate });
    }

    this.signals.forEach((signal, index) => {
      if (signal.selY[0] || signal.selY[1]) {
        let avgVal = this.signalTypes.find(({ type }) => type === signal.type).nominal;
        let variance = this.signalTypes.find(({ type }) => type === signal.type).var;
        let minVal;
        let maxVal;

        for (var i = 0; i < 1000; i++) {
          avgVal += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * variance);
          minVal = avgVal + Math.round(Math.random() * -3 * variance);
          maxVal = avgVal + Math.round(Math.random() * 3 * variance);

          chartData[i]["SigAvg" + index] = avgVal;
          chartData[i]["SigMin" + index] = minVal;
          chartData[i]["SigMax" + index] = maxVal;
        }
      }
    });

    return chartData;
  }

  toggleMinMax() {
    this.showMinMax = !this.showMinMax;

    this.zone.runOutsideAngular(() => {
      this.chart.series.each((series) => {
        if (series.name === "minMax") {
          if (this.showMinMax) series.show();
          else series.hide();
        }
      });
    });
  }

  toggleAutoScale(axis) {
    this.autoScaleY[axis] = !this.autoScaleY[axis];

    this.zone.runOutsideAngular(() => {
      if (this.autoScaleY[axis]) {
        (<am4charts.ValueAxis>this.chart.yAxes.getIndex(axis)).min = null;
        (<am4charts.ValueAxis>this.chart.yAxes.getIndex(axis)).max = null;
      } else {
        (<am4charts.ValueAxis>this.chart.yAxes.getIndex(axis)).min = this.rangeYAxisMin[axis];
        (<am4charts.ValueAxis>this.chart.yAxes.getIndex(axis)).max = this.rangeYAxisMax[axis];
      }
      this.chart.deepInvalidate();
    });
  }

  toggleLegend() {
    this.showLegend = !this.showLegend;

    this.zone.runOutsideAngular(() => {

      if (this.showLegend) this.chart.legend.width = this.legendWidth;
      else this.chart.legend.width = 0;

    });
  }

  toggleThresholds(axis) {
    let opposite: number = (axis + 1) % 2;

    this.showThresh[axis] = !this.showThresh[axis];
    this.showThresh[opposite] = false;

    this.chart.yAxes.values[axis].axisRanges.each((thresh) => thresh.axisFill.fillOpacity = (this.showThresh[axis]) ? 0.2 : 0);
    this.chart.yAxes.values[opposite].axisRanges.each((thresh) => thresh.axisFill.fillOpacity = 0);

    for (let i = 0; i < this.chart.series.length; i += 2) {
      if (this.chart.series.getIndex(i).yAxis === this.chart.yAxes.values[opposite] && this.showThresh[axis]) {
        this.chart.series.getIndex(i).hide();
        this.chart.series.getIndex(i + 1).hide();
      } else {
        this.chart.series.getIndex(i).show();
        if (this.showMinMax) this.chart.series.getIndex(i + 1).show();
      }
    }
  }

  selectSignal(idx, axis) {
    let opposite: number = (axis + 1) % 2;

    this.signals[idx].selY[axis] = !this.signals[idx].selY[axis];
    this.signals[idx].selY[opposite] = false;

    if (this.signals[idx].selY[axis]) {
      this.yAxisType[axis] = this.signals[idx].type;
      this.yAxisSignals[axis] += 1;
    } else {
      this.yAxisSignals[axis] -= 1;
      if (this.yAxisSignals[axis] == 0) this.yAxisType[axis] = "";
    }
  }

  disableSignalAxis(idx, axis) {
    let opposite: number = (axis + 1) % 2;
    let disable: boolean = false;

    disable = (this.signals[idx].selY[opposite]);
    disable = disable || (this.yAxisType[axis] != "" && this.signals[idx].type != this.yAxisType[axis]);

    return disable;
  }

  yAxisUoM(axis) {
    return this.signalTypes.find(({ type }) => type === this.yAxisType[axis]).uom;
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
                  tempArray.push({ "id": signal.signalId, "type": signal.signalType, "name": `Organization > ${location.locationName} > ${signal.signalName}`, "selY": [false, false] })
                  this.signalCheckBoxes[signal.signalId] = false;
                });
              }

              // Asset
              if (location.assets && location.assets.length > 0) {
                location.assets.forEach(asset => {
                  if (asset.signals && asset.signals.length > 0) {
                    asset.signals.forEach(signal => {
                      tempArray.push({ "id": signal.signalId, "type": signal.signalType, "name": `Organization > ${location.locationName} > ${asset.assetName} > ${signal.signalName}`, "selY": [false, false] })
                      this.signalCheckBoxes[signal.signalId] = false;
                    });
                  }
                })
              }
            })
          }
        }
        this.signals = tempArray;
        console.log('tempArray ', tempArray);

      });

  }
}




// Previous code









// import { Component, OnInit, NgZone, Input } from '@angular/core';
// import * as am4core from "@amcharts/amcharts4/core";
// import * as am4charts from "@amcharts/amcharts4/charts";
// import am4themes_animated from "@amcharts/amcharts4/themes/animated";
// import { ToastrService } from 'ngx-toastr';
// import { Toaster } from '../../votm-cloud-toaster/votm-cloud-toaster';
// import { DbItem } from '../../../../models/db-item';
// import { timeseries } from 'src/assets/data/time-series';

// am4core.useTheme(am4themes_animated);
// @Component({
//   selector: 'app-votm-line-graph',
//   templateUrl: './votm-line-graph.component.html',
//   styleUrls: ['./votm-line-graph.component.scss']
// })
// export class VotmLineGraphComponent implements OnInit {


//   private chart: am4charts.XYChart;
//   id: any;
//   data: any;
//   // @Input() data: DbItem;
//   // @Input() id: string;
//   isTrendChartConfigured: boolean;
//   customizeTrendChart: any;
//   toaster: Toaster = new Toaster(this.toastr);
//   "hideCredits": true;
//   private wConfig;
//   private wId: string = '';
//   private showMinMax: boolean = true;
//   private showThresh: boolean[] = [false, false];
//   private showLegend: boolean = true;
//   private autoScaleY: boolean[] = [true, true];
//   private legendWidth;
//   private selDateRange: string = "Month";
//   private selYAxisRange: string[] = ["auto", "auto"];
//   private rangeYAxisMin: number[] = [null, null];
//   private rangeYAxisMax: number[] = [null, null];
//   private rangeSeriesSet: boolean = false;
//   private signalTypes: any[] = [];

//   yAxisType: string[] = ["", ""];
//   yAxisSignals: number[] = [0, 0];

//   signals: any = [];



//   constructor(
//     private zone: NgZone,
//     private toastr: ToastrService
//   ) {
//     this.id = Math.floor((Math.random() * 100) + 1);
//   }

//   ngOnInit() {
//     // Oninit check chart is configured or not
//     this.isTrendChartConfigured = false;
//     // this.wId = this.data.id + "-" + this.id;
//     // this.wConfig = (this.data.widgetConf) ? this.data.widgetConf : { yMin: [null, null], yMax: [null, null] };
//     // Oninit check chart is configured or not
//     // this.getChartConfiguration();

//     this.data = timeseries;
//     console.log('Ahamed Dats', this.data);
//   }


//   getChartConfiguration() {

//     // Call service to get configured chart data & to verify chart is configured or not
//     // this.widgetService.getColumnChartConfiguration().subscribe(
//     //   response => {
//     //     this.isColumnChartConfigured = true;
//     //   }, error => {
//     //     this.isColumnChartConfigured = false;
//     //   }
//     // );
//     this.isTrendChartConfigured = true;

//   }


//   onClickOfCustomizeTrendChart() {
//     // Open Chart configuration modal popup
//     const modal = document.getElementById('configure-trend-chart-modal');
//     modal.style.display = 'block';
//     this.customizeTrendChart = document.getElementById('configure-trend-chart-modal');
//     window.onclick = (event) => {
//       if (event.target === modal) {
//         modal.style.display = 'none';
//       }
//     };
//   }

//   onClickOfCustomizeTrendChartModalClose() {
//     // Close modal popup
//     this.customizeTrendChart.style.display = 'none';
//   }


//   saveTrendChartConfiguration() {
//     this.customizeTrendChart.style.display = 'none';
//     this.toaster.onSuccess('Chart Configured Successfully', 'Success');
//     // Call services to save chart configuration data
//     // this.widgetService.addColumnChartConfiguration(columnChartConfigureObj).subscribe(
//     //   response => {
//     //     this.toaster.onSuccess('Chart Configured Successfully', 'Success');
//     //     this.onClickOfCustomizeColumnChartModalClose();
//     //     this.getChartConfiguration();
//     //   }, error => {
//     //     this.toaster.onFailure('Error in Chart Configuration', 'Failure');
//     //     this.onClickOfCustomizeColumnChartModalClose();
//     //   }
//     // );
//     this.getChartConfiguration();
//     setTimeout(() => {
//       this.getAMTrendChart();
//     }, 500);

//   }



//   ngAfterViewInit() {


//     if (this.isTrendChartConfigured) {
//       this.getAMTrendChart();
//     }

//   }


//   ngOnDestroy() {
//     this.zone.runOutsideAngular(() => {
//       if (this.chart) {
//         this.chart.dispose();
//       }
//     });
//   }


//   // getAMTrendChart() {
//   //   am4core.options.commercialLicense = true;
//   //   hideCredits: true;
//   //   // Create chart instance
//   //   let chart = am4core.create('chartdiv-div-line-' + this.id, am4charts.XYChart);

//   //   // Add data
//   //   chart.data = this.data; // this.generateChartData(); //  this.data; // generateChartData();
//   //   console.log('chart.data ', chart.data, this.generateChartData())
//   //   // Create axes
//   //   var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
//   //   dateAxis.renderer.minGridDistance = 50;

//   //   var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

//   //   // Create series
//   //   var series = chart.series.push(new am4charts.LineSeries());
//   //   series.dataFields.valueY = "SigAvg0";
//   //   series.dataFields.dateX = "Date";
//   //   series.strokeWidth = 2;
//   //   series.minBulletDistance = 10;
//   //   series.tooltipText = "{valueY}";
//   //   series.tooltip.pointerOrientation = "vertical";
//   //   series.tooltip.background.cornerRadius = 20;
//   //   series.tooltip.background.fillOpacity = 0.5;
//   //   series.tooltip.label.padding(12, 12, 12, 12)

//   //   // Add scrollbar
//   //   let scrollbarX = new am4charts.XYChartScrollbar();
//   //   scrollbarX.series.push(series);
//   //   chart.scrollbarX = scrollbarX;
//   //   chart.scrollbarX.parent = chart.bottomAxesContainer;
//   //   // chart.scrollbarX = new am4charts.XYChartScrollbar();
//   //   // chart.scrollbarX.series.push(series);


//   //   // Add cursor
//   //   chart.cursor = new am4charts.XYCursor();
//   //   chart.cursor.xAxis = dateAxis;
//   //   chart.cursor.snapToSeries = series;

//   //   // Add legend
//   //   chart.legend = new am4charts.Legend();


//   // }

//   // Create series


//   getAMTrendChart() {
//     // Create chart instance
//     this.chart = am4core.create('chartdiv-div-line-' + this.id, am4charts.XYChart);

//     // Increase contrast by taking evey second color
//     this.chart.colors.step = 2;

//     // Add data
//     this.chart.data = this.data; //generateChartData();

//     // Create axes
//     let dateAxis = this.chart.xAxes.push(new am4charts.DateAxis());
//     dateAxis.renderer.minGridDistance = 50;



//     this.createAxisAndSeries("SigAvg0", "SigAvg0", false, "circle");
//     this.createAxisAndSeries("SigMin1", "SigMin1", true, "triangle");
//     this.createAxisAndSeries("SigMin3", "SigMin3", true, "rectangle");

//     // Add legend
//     this.chart.legend = new am4charts.Legend();

//     // Add cursor
//     this.chart.cursor = new am4charts.XYCursor();



//   }

//   createAxisAndSeries(field, name, opposite, bullet) {
//     let valueAxis = this.chart.yAxes.push(new am4charts.ValueAxis());

//     let series = this.chart.series.push(new am4charts.LineSeries());
//     series.dataFields.valueY = field;
//     series.dataFields.dateX = "Date";
//     series.strokeWidth = 2;
//     series.yAxis = valueAxis;
//     series.name = name;
//     series.tooltipText = "{name}: [bold]{valueY}[/]";
//     series.tensionX = 0.8;

//     let interfaceColors = new am4core.InterfaceColorSet();

//     switch (bullet) {
//       case "triangle":
//         let tempbullet = series.bullets.push(new am4charts.Bullet());
//         tempbullet.width = 12;
//         tempbullet.height = 12;
//         tempbullet.horizontalCenter = "middle";
//         tempbullet.verticalCenter = "middle";

//         let triangle = tempbullet.createChild(am4core.Triangle);
//         triangle.stroke = interfaceColors.getFor("background");
//         triangle.strokeWidth = 2;
//         triangle.direction = "top";
//         triangle.width = 12;
//         triangle.height = 12;
//         break;
//       case "rectangle":
//         let tempbullet1 = series.bullets.push(new am4charts.Bullet());
//         tempbullet1.width = 10;
//         tempbullet1.height = 10;
//         tempbullet1.horizontalCenter = "middle";
//         tempbullet1.verticalCenter = "middle";

//         let rectangle = tempbullet1.createChild(am4core.Rectangle);
//         rectangle.stroke = interfaceColors.getFor("background");
//         rectangle.strokeWidth = 2;
//         rectangle.width = 10;
//         rectangle.height = 10;
//         break;
//       default:
//         let bullet = series.bullets.push(new am4charts.CircleBullet());
//         bullet.circle.stroke = interfaceColors.getFor("background");
//         bullet.circle.strokeWidth = 2;
//         break;
//     }

//     valueAxis.renderer.line.strokeOpacity = 1;
//     valueAxis.renderer.line.strokeWidth = 2;
//     valueAxis.renderer.line.stroke = series.stroke;
//     valueAxis.renderer.labels.template.fill = series.stroke;
//     valueAxis.renderer.opposite = opposite;
//     valueAxis.renderer.grid.template.disabled = true;
//   }


//   generateChartData() {
//     var chartData = [];
//     var firstDate = new Date();
//     firstDate.setDate(firstDate.getDate() - 1000);
//     var visits = 1200;
//     for (var i = 0; i < 500; i++) {
//       // we create date objects here. In your data, you can have date strings
//       // and then set format of your dates using chart.dataDateFormat property,
//       // however when possible, use date objects, as this will speed up chart rendering.
//       var newDate = new Date(firstDate);
//       newDate.setDate(newDate.getDate() + i);

//       visits += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 10);

//       chartData.push({
//         date: newDate,
//         visits: visits
//       });
//     }
//     return chartData;
//   }
// }
