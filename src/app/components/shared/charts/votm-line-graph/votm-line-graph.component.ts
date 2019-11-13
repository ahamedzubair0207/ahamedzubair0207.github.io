import { Component, NgZone, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { DbItem} from '../../../../models/db-item';
import { ToastrService } from 'ngx-toastr';
import { Toaster } from '../../votm-cloud-toaster/votm-cloud-toaster';

am4core.useTheme(am4themes_animated);
@Component({
  selector: 'app-votm-line-graph',
  templateUrl: './votm-line-graph.component.html',
  styleUrls: ['./votm-line-graph.component.scss']
})
export class VotmLineGraphComponent implements OnInit {


//   @Input() data: DbItem;
//   @Input() id: string;
//   @Input() locked: boolean;

//   private wConfig;
//   private configured: boolean = false;
//   private chart: am4charts.XYChart;
//   private wId: string = '';
//   private showMinMax: boolean = true;
//   private showThresh: boolean[] = [false, false];
//   private showLegend: boolean = true;
//   private autoScaleY: boolean[] = [true, true];
//   private legendWidth;
//   private selDateRange: string = "Month";
//   private selDynDateRng: string = this.selDateRange;
//   private selYAxisRange: string[] = ["auto", "auto"];
//   private rangeYAxisMin: number[] = [null, null];
//   private rangeYAxisMax: number[] = [null, null];
//   private rangeSeriesSet: boolean = false;
//   private signalTypes: any[] = [
//     { "type": "pressure", "uom": "psi", "nominal": 1500, "var": 5 },
//     { "type": "temperature", "uom": "°F", "nominal": 100, "var": 2 },
//     { "type": "humidity", "uom": "%RH", "nominal": 50, "var": 1 }
//   ]

//   yAxisType: string[] = ["", ""];
//   yAxisSignals: number[] = [0, 0];

//   signals: any = [
//     { "type": "temperature", "name": "GV ❯ Prod ❯ Ambient Temperature", "selY": [false, false] },
//     { "type": "temperature", "name": "GV ❯ Prod ❯ EAP1 ❯ Exhaust", "selY": [false, false] },
//     { "type": "temperature", "name": "GV ❯ Prod ❯ EAP2 ❯ Exhaust", "selY": [false, false] },
//     { "type": "pressure", "name": "GV ❯ Lab ❯ IB ❯ Main Pump", "selY": [false, false] },
//     { "type": "pressure", "name": "GV ❯ Lab ❯ IB ❯ Drain Pan Suction", "selY": [false, false] },
//     { "type": "temperature", "name": "GV ❯ Lab ❯ IB ❯ Oil Cooler", "selY": [false, false] },
//     { "type": "temperature", "name": "GV ❯ Lab ❯ IB ❯ Oil Reservoir", "selY": [false, false] },
//     { "type": "pressure", "name": "GV ❯ Lab ❯ IB ❯ Impulse #2 Pilot Pressure", "selY": [false, false] },
//     { "type": "pressure", "name": "GV ❯ Lab ❯ IB ❯ Accumulator", "selY": [false, false] },
//     { "type": "pressure", "name": "GV ❯ Lab ❯ IB ❯ Main Pump Suction", "selY": [false, false] },
//     { "type": "humidity", "name": "GB ❯ Furness Supply Humidity", "selY": [false, false] },
//     { "type": "humidity", "name": "GB ❯ Cleanroom Supply Humidity", "selY": [false, false] }
//   ];

//   constructor(private modalService: NgbModal, private zone: NgZone) { 
    
//   }

//   ngOnInit() {
//     console.log('data ', this.data)
//     this.wId = this.data.id + "-" + this.id;
//     this.wConfig = (this.data.widgetConf) ? this.data.widgetConf : { yMin: [null, null], yMax: [null, null] };
//   }

//   ngAfterViewInit() {

//   }

//   ngOnDestroy() {
//     this.zone.runOutsideAngular(() => {
//       if (this.chart) {
//         this.chart.dispose();
//       }
//     });
//   }

//   open(config) {
//     this.modalService.open(config, { size: 'lg' }).result.then((result) => {
//       if (result === 'save') {
//         if (this.chart) {
//           this.chart.dispose();
//           this.rangeSeriesSet = false;
//         }

//         this.configured = true;
//         this.selDynDateRng = this.selDateRange;

//         for (let i = 0; i < 2; i++) {
//           this.rangeYAxisMin[i] = parseFloat(this.wConfig.yMin[i]);
//           this.rangeYAxisMax[i] = parseFloat(this.wConfig.yMax[i]);
//           this.autoScaleY[i] = (this.selYAxisRange[i] === "auto");
//         }

//         this.zone.runOutsideAngular(() => {
//           let chart = am4core.create(this.wId, am4charts.XYChart);
           
//             chart.paddingRight = 20;
//             chart.data = this.generateChartData();
  
//             let title = chart.titles.create();
//             title.text = (this.wConfig.title) ? this.wConfig.title : null;
//             title.fontSize = 25;
//             title.marginBottom = 30;
  
//             let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
//             dateAxis.renderer.line.strokeOpacity = 1;
//             dateAxis.renderer.line.stroke = am4core.color("gray");
//             dateAxis.tooltipDateFormat = "MM/dd/yyyy hh:mm:ss";
  
//             if (this.yAxisSignals[0]) this.createValueAxis(chart, 0);
//             if (this.yAxisSignals[1]) this.createValueAxis(chart, 1);
  
//             let colorSet = new am4core.ColorSet();
//             colorSet.step = 2;
//             this.signals.forEach((signal, index) => {
//               if (signal.selY[0] || signal.selY[1]) this.createAxisAndSeries(chart, signal, index, colorSet.next());
//             });
  
  
//             chart.legend = new am4charts.Legend();
//             chart.legend.position = "right";
//             chart.legend.valign = "top";
//             chart.legend.itemContainers.template.tooltipText = "{name}";
//             this.legendWidth = chart.legend.width;
//             if (!this.showLegend) chart.legend.width = 0;
  
//             chart.cursor = new am4charts.XYCursor();
  
//             var that = this;
//             chart.events.on("ready", function (ev) {
//               for (let i = 0; i < 2; i++) {
//                 if (that.selYAxisRange[i] === "rngMinMax") {
//                   that.rangeYAxisMin[i] = (<am4charts.ValueAxis>that.chart.yAxes.getIndex(i)).minZoomed;
//                   that.rangeYAxisMax[i] = (<am4charts.ValueAxis>that.chart.yAxes.getIndex(i)).maxZoomed;
//                 }
//                 if (that.selYAxisRange[i] !== "auto") {
//                   (<am4charts.ValueAxis>that.chart.yAxes.getIndex(i)).min = that.rangeYAxisMin[i];
//                   (<am4charts.ValueAxis>that.chart.yAxes.getIndex(i)).max = that.rangeYAxisMax[i];
//                 }
//               }
//             });
  
//             this.chart = chart;

//         });
     
       
//       }
//     });
//   }

//   // Create value axis
//   createValueAxis(chart, axis) {
//     let valueYAxis = chart.yAxes.push(new am4charts.ValueAxis());
//     valueYAxis.tooltip.disabled = true;
//     valueYAxis.title.text = this.signalTypes.find(({ type }) => type === this.yAxisType[axis]).uom.toUpperCase();
//     valueYAxis.renderer.line.strokeOpacity = 1;
//     valueYAxis.renderer.line.stroke = am4core.color("gray");
//     valueYAxis.renderer.labels.template.fill = am4core.color("gray");
//     valueYAxis.renderer.opposite = (axis == 1);
//     valueYAxis.renderer.grid.template.disabled = true;

//     this.createThresholdRanges(valueYAxis, 0, this.signalTypes.find(({ type }) => type === this.yAxisType[axis]).nominal);
//   }

//   // Create thresholds
//   createThresholdRanges(valueAxis, idx, nominal) {
//     let thresholds = { lowCritical: nominal * .75, lowWarn: nominal * .9, highWarn: nominal * 1.1, highCritical: nominal * 1.25 };
//     if (thresholds.lowCritical) {
//       var rangeLC = valueAxis.axisRanges.create();
//       rangeLC.value = -99999;
//       rangeLC.endValue = thresholds.lowCritical;
//       rangeLC.axisFill.fill = am4core.color("#dc3545");
//       rangeLC.axisFill.fillOpacity = (this.showThresh[idx]) ? 0.2 : 0;
//       rangeLC.grid.strokeOpacity = 0;
//     }
//     if (thresholds.lowWarn) {
//       var rangeLW = valueAxis.axisRanges.create();
//       rangeLW.value = (thresholds.lowCritical) ? thresholds.lowCritical : -99999;
//       rangeLW.endValue = thresholds.lowWarn;
//       rangeLW.axisFill.fill = am4core.color("#ffc107");
//       rangeLW.axisFill.fillOpacity = (this.showThresh[idx]) ? 0.2 : 0;
//       rangeLW.grid.strokeOpacity = 0;
//     }
//     if (thresholds.highWarn) {
//       var rangeHW = valueAxis.axisRanges.create();
//       rangeHW.value = thresholds.highWarn;
//       rangeHW.endValue = (thresholds.highCritical) ? thresholds.highCritical : 99999;
//       rangeHW.axisFill.fill = am4core.color("#ffc107");
//       rangeHW.axisFill.fillOpacity = (this.showThresh[idx]) ? 0.2 : 0;
//       rangeHW.grid.strokeOpacity = 0;
//     }
//     if (thresholds.highCritical) {
//       var rangeHC = valueAxis.axisRanges.create();
//       rangeHC.value = thresholds.highCritical;
//       rangeHC.endValue = 99999;
//       rangeHC.axisFill.fill = am4core.color("#dc3545");
//       rangeHC.axisFill.fillOpacity = (this.showThresh[idx]) ? 0.2 : 0;
//       rangeHC.grid.strokeOpacity = 0;
//     }
//   }

//   // Create series
//   createAxisAndSeries(chart, signal, idx, color) {
//     let series = chart.series.push(new am4charts.LineSeries());
//     let valueAxis = (<am4charts.ValueAxis>chart.yAxes.getIndex((signal.selY[0]) ? 0 :  (this.yAxisSignals[0])? 1 : 0));
//     let uom = this.signalTypes.find(({ type }) => type === signal.type).uom;
//     series.dataFields.dateX = "date";
//     series.dataFields.valueY = "sigAvg" + idx;
//     series.yAxis = valueAxis;
//     series.name = signal.name;
//     series.tooltipText = "[bold]{name}: [bold #000]{valueY} " + uom + "[/][#000] [[{sigMin" + idx + "} - {sigMax" + idx + "}]][/]";
//     series.stroke = color;
//     series.fill = color;
//     series.showOnInit = false;
//     series.defaultState.transitionDuration = 0;
//     series.hiddenState.transitionDuration = 0;
//     series.tooltip.getFillFromObject = false;
//     series.tooltip.getStrokeFromObject = true;
//     series.tooltip.background.fill = am4core.color("#fff");
//     series.tooltip.autoTextColor = false;
//     series.tooltip.label.fill = color;

//     let series2 = chart.series.push(new am4charts.LineSeries());
//     series2.dataFields.dateX = "date";
//     series2.dataFields.openValueY = "sigMin" + idx;
//     series2.dataFields.valueY = "sigMax" + idx;
//     series2.sequencedInterpolation = true;
//     series2.fillOpacity = 0.3;
//     series2.strokeWidth = 0;
//     series2.fill = color;
//     series2.yAxis = valueAxis;
//     series2.hiddenInLegend = true;
//     series2.showOnInit = false;
//     series2.defaultState.transitionDuration = 0;
//     series2.hiddenState.transitionDuration = 0;
//     series2.name = "minMax";
//     series2.hidden = !this.showMinMax;

//     series.events.on("hidden", function () {
//       series2.hide();
//     });

//     var that = this;
//     series.events.on("shown", function () {
//       if (that.showMinMax) series2.show();
//     });

//     if (!this.rangeSeriesSet) {
//       this.rangeSeriesSet = true;
//       chart.scrollbarX = new am4charts.XYChartScrollbar();
//       (<am4charts.XYChartScrollbar>chart.scrollbarX).series.push(series);
//       chart.scrollbarX.parent = chart.bottomAxesContainer;
//     }
//   }

//   // generate some random data, quite different range
//   generateChartData() {
//     let chartData = [];
//     let firstDate = new Date();
//     firstDate.setDate(firstDate.getDate() - 100);
//     firstDate.setHours(0, 0, 0, 0);

//     for (var i = 0; i < 1000; i++) {
//       let newDate = new Date(firstDate);
//       newDate.setDate(newDate.getDate() + i);
//       chartData.push({ date: newDate });
//     }

//     this.signals.forEach((signal, index) => {
//       if (signal.selY[0] || signal.selY[1]) {
//         let avgVal = this.signalTypes.find(({ type }) => type === signal.type).nominal;
//         let variance = this.signalTypes.find(({ type }) => type === signal.type).var;
//         let minVal;
//         let maxVal;

//         for (var i = 0; i < 1000; i++) {
//           avgVal += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * variance);
//           minVal = avgVal + Math.round(Math.random() * -3 * variance);
//           maxVal = avgVal + Math.round(Math.random() * 3 * variance);

//           chartData[i]["sigAvg" + index] = avgVal;
//           chartData[i]["sigMin" + index] = minVal;
//           chartData[i]["sigMax" + index] = maxVal;
//         }
//       }
//     });
// // console.log('Chart Data' , chartData);
//     return chartData;
//   }

//   toggleMinMax() {
//     this.showMinMax = !this.showMinMax;

//     this.zone.runOutsideAngular(() => {
//       this.chart.series.each((series) => {
//         if (series.name === "minMax") {
//           if (this.showMinMax) series.show();
//           else series.hide();
//         }
//       });
//     });
//   }

//   toggleAutoScale(axis) {
//     this.autoScaleY[axis] = !this.autoScaleY[axis];

//     this.zone.runOutsideAngular(() => {
//       if (this.autoScaleY[axis]) {
//         (<am4charts.ValueAxis>this.chart.yAxes.getIndex(axis)).min = null;
//         (<am4charts.ValueAxis>this.chart.yAxes.getIndex(axis)).max = null;
//       } else {
//         (<am4charts.ValueAxis>this.chart.yAxes.getIndex(axis)).min = this.rangeYAxisMin[axis];
//         (<am4charts.ValueAxis>this.chart.yAxes.getIndex(axis)).max = this.rangeYAxisMax[axis];
//       }
//       this.chart.deepInvalidate();
//     });
//   }

//   toggleLegend() {
//     this.showLegend = !this.showLegend;

//     this.zone.runOutsideAngular(() => {

//       if (this.showLegend) this.chart.legend.width = this.legendWidth;
//       else this.chart.legend.width = 0;

//     });
//   }

//   toggleThresholds(axis) {
//     let opposite: number = (axis + 1) % 2;

//     this.showThresh[axis] = !this.showThresh[axis];
//     this.showThresh[opposite] = false;

//     this.chart.yAxes.values[axis].axisRanges.each((thresh) => thresh.axisFill.fillOpacity = (this.showThresh[axis]) ? 0.2 : 0);
//     this.chart.yAxes.values[opposite].axisRanges.each((thresh) => thresh.axisFill.fillOpacity = 0);

//     for (let i = 0; i < this.chart.series.length; i += 2) {
//       if (this.chart.series.getIndex(i).yAxis === this.chart.yAxes.values[opposite] && this.showThresh[axis]) {
//         this.chart.series.getIndex(i).hide();
//         this.chart.series.getIndex(i + 1).hide();
//       } else {
//         this.chart.series.getIndex(i).show();
//         if (this.showMinMax) this.chart.series.getIndex(i + 1).show();
//       }
//     }
//   }

//   selectSignal(idx, axis) {
//     let opposite: number = (axis + 1) % 2;

//     this.signals[idx].selY[axis] = !this.signals[idx].selY[axis];
//     this.signals[idx].selY[opposite] = false;

//     if (this.signals[idx].selY[axis]) {
//       this.yAxisType[axis] = this.signals[idx].type;
//       this.yAxisSignals[axis] += 1;
//     } else {
//       this.yAxisSignals[axis] -= 1;
//       if (this.yAxisSignals[axis] == 0) this.yAxisType[axis] = "";
//     }
//   }

//   disableSignalAxis(idx, axis) {
//     let opposite: number = (axis + 1) % 2;
//     let disable: boolean = false;

//     disable = (this.signals[idx].selY[opposite]);
//     disable = disable || (this.yAxisType[axis] != "" && this.signals[idx].type != this.yAxisType[axis]);

//     return disable;
//   }

//   yAxisUoM(axis) {
//     return this.signalTypes.find(({ type }) => type === this.yAxisType[axis]).uom;
//   }


  private chart: am4charts.XYChart;
  id: any;
  customizeTrendChart: any;
  isTrendChartConfigured: boolean;
  toaster: Toaster = new Toaster(this.toastr);

  constructor(private zone: NgZone , private toastr: ToastrService) {
    this.id = Math.floor((Math.random() * 100) + 1);
   }

  ngOnInit() {
    this.isTrendChartConfigured = false;
  }

  ngAfterViewInit() {
   
    if (this.isTrendChartConfigured) {
      this.getAMTrendChart();
    }
   
  }

  ngOnDestroy() {
    this.zone.runOutsideAngular(() => {
      if (this.chart) {
        this.chart.dispose();
      }
    });
  }

  onClickOfCustomizeTrendChart() {
    // Open Chart configuration modal popup
    const modal = document.getElementById('configure-Trend-chart-modal');
    modal.style.display = 'block';
    this.customizeTrendChart = document.getElementById('configure-Trend-chart-modal');
    window.onclick = (event) => {
      if (event.target === modal) {
        modal.style.display = 'none';
      }
    };
  }

  onClickOfCustomizeTrendChartModalClose() {
    // Close modal popup
    this.customizeTrendChart.style.display = 'none';
  }

  getChartConfiguration() {

    // Call service to get configured chart data & to verify chart is configured or not
    // this.widgetService.getColumnChartConfiguration().subscribe(
    //   response => {
    //     this.isColumnChartConfigured = true;
    //   }, error => {
    //     this.isColumnChartConfigured = false;
    //   }
    // );
    this.isTrendChartConfigured = true;
  }

  saveTrendChartConfiguration() {
    this.customizeTrendChart.style.display = 'none';
    this.toaster.onSuccess('Chart Configured Successfully', 'Success');
    // Call services to save chart configuration data
    // this.widgetService.addColumnChartConfiguration(columnChartConfigureObj).subscribe(
    //   response => {
    //     this.toaster.onSuccess('Chart Configured Successfully', 'Success');
    //     this.onClickOfCustomizeColumnChartModalClose();
    //     this.getChartConfiguration();
    //   }, error => {
    //     this.toaster.onFailure('Error in Chart Configuration', 'Failure');
    //     this.onClickOfCustomizeColumnChartModalClose();
    //   }
    // );
    this.getChartConfiguration();
    setTimeout(() => {
      this.getAMTrendChart();
    }, 500);

  }

  getAMTrendChart(){
    this.zone.runOutsideAngular(() => {
      let chart = am4core.create("chartdiv-line-"+this.id, am4charts.XYChart);
      chart.paddingRight = 20;
      chart.data = generateChartData();

      let title = chart.titles.create();
      title.text = "Trend Chart"; //this.data.widgetConf.title;
      title.fontSize = 25;
      title.marginBottom = 30;

      let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
      dateAxis.renderer.line.strokeOpacity = 1;
      dateAxis.renderer.line.stroke = am4core.color("gray");

      let valueY1Axis = chart.yAxes.push(new am4charts.ValueAxis());
      valueY1Axis.tooltip.disabled = true;
      valueY1Axis.title.text = "PSI";
      valueY1Axis.renderer.line.strokeOpacity = 1;
      valueY1Axis.renderer.line.stroke = am4core.color("gray");
      valueY1Axis.renderer.labels.template.fill = am4core.color("gray");
      valueY1Axis.renderer.opposite = false;
      valueY1Axis.renderer.grid.template.disabled = true;

      let valueY2Axis = chart.yAxes.push(new am4charts.ValueAxis());
      valueY2Axis.tooltip.disabled = true;
      valueY2Axis.title.text = "°F";
      valueY2Axis.renderer.line.strokeOpacity = 1;
      valueY2Axis.renderer.line.stroke = am4core.color("gray");
      valueY2Axis.renderer.labels.template.fill = am4core.color("gray");
      valueY2Axis.renderer.opposite = true;
      valueY2Axis.renderer.grid.template.disabled = true;

      createThresholdRanges(true, { lowCritical: 1300, lowWarn: 1400, highWarn: 1600, highCritical: 1700 });

      createAxisAndSeries("IP", "Inlet Pressure", "psi", true, true);
      createAxisAndSeries("OP", "Outlet Pressure", "psi", true);
      createAxisAndSeries("OT", "Outlet Temperature", "°F", false);

      chart.legend = new am4charts.Legend();
      chart.legend.position = "right";
      chart.legend.valign = "top";

      chart.cursor = new am4charts.XYCursor();

      this.chart = chart;

      // Create thresholds
      function createThresholdRanges(y1Axis: boolean, thresholds) {
        if (thresholds.lowCritical) {
          var rangeLC = ((y1Axis) ? valueY1Axis : valueY2Axis).axisRanges.create();
          rangeLC.value = -99999;
          rangeLC.endValue = thresholds.lowCritical;
          rangeLC.axisFill.fill = am4core.color("#dc3545");
          rangeLC.axisFill.fillOpacity = 0.2;
          rangeLC.grid.strokeOpacity = 0;
        }
        if (thresholds.lowWarn) {
          var rangeLW = ((y1Axis) ? valueY1Axis : valueY2Axis).axisRanges.create();
          rangeLW.value = (thresholds.lowCritical) ? thresholds.lowCritical : -99999;
          rangeLW.endValue = thresholds.lowWarn;
          rangeLW.axisFill.fill = am4core.color("#ffc107");
          rangeLW.axisFill.fillOpacity = 0.2;
          rangeLW.grid.strokeOpacity = 0;
        }
        if (thresholds.highWarn) {
          var rangeHW = ((y1Axis) ? valueY1Axis : valueY2Axis).axisRanges.create();
          rangeHW.value = thresholds.highWarn;
          rangeHW.endValue = (thresholds.highCritical) ? thresholds.highCritical : 99999;
          rangeHW.axisFill.fill = am4core.color("#ffc107");
          rangeHW.axisFill.fillOpacity = 0.2;
          rangeHW.grid.strokeOpacity = 0;

        }
        if (thresholds.highCritical) {
          var rangeHC = ((y1Axis) ? valueY1Axis : valueY2Axis).axisRanges.create();
          rangeHC.value = thresholds.highCritical;
          rangeHC.endValue = 99999;
          rangeHC.axisFill.fill = am4core.color("#dc3545");
          rangeHC.axisFill.fillOpacity = 0.2;
          rangeHC.grid.strokeOpacity = 0;
        }
      }

      // Create series
      function createAxisAndSeries(field: string, name: string, uom: string, y1Axis: boolean, rangeSeries: boolean = false) {
        let series = chart.series.push(new am4charts.LineSeries());
        series.dataFields.valueY = field;
        series.dataFields.dateX = "date";
        series.yAxis = (y1Axis) ? valueY1Axis : valueY2Axis;
        series.name = name;
        series.tooltipText = "{name}: [bold]{valueY} " + uom + "[/]";

        let interfaceColors = new am4core.InterfaceColorSet();

        if (rangeSeries) {
          chart.scrollbarX = new am4charts.XYChartScrollbar();
          (<am4charts.XYChartScrollbar>chart.scrollbarX).series.push(series);
          chart.scrollbarX.parent = chart.bottomAxesContainer;
        }
      }

    });

    // generate some random data, quite different range
    function generateChartData() {
      let chartData = [];
      let firstDate = new Date();
      firstDate.setDate(firstDate.getDate() - 100);
      firstDate.setHours(0, 0, 0, 0);

      let IP = 1600;
      let OP = 1500;
      let OT = 94;

      for (var i = 0; i < 3000; i++) {
        // we create date objects here. In your data, you can have date strings
        // and then set format of your dates using chart.dataDateFormat property,
        // however when possible, use date objects, as this will speed up chart rendering.
        let newDate = new Date(firstDate);
        newDate.setDate(newDate.getDate() + i);

        IP += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 5);
        OP += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 5);
        OT += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 2);

        chartData.push({
          date: newDate,
          IP: IP,
          OP: OP,
          OT: OT
        });
      }
      return chartData;
    }

  }


}
