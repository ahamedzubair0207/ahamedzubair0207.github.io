import { Component, NgZone, Input, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
// import am4themes_kelly from "@amcharts/amcharts4/themes/animated";
// import { DbItem } from 'src/app/models/db-item';
import { DashBoard } from 'src/app/models/dashboard.model';
// import { timeseries } from 'src/assets/data/time-series';
import { ConfigSettingsService } from 'src/app/services/configSettings/configSettings.service';
import { TimeSeriesService } from 'src/app/services/timeSeries/time-series.service';
import * as moment from 'moment';
import { TrendChartWidget } from 'src/app/models/trend-chart-widget';
import { DashboardService } from 'src/app/services/dasboards/dashboard.service';
import { AppConstants } from 'src/app/helpers/app.constants';
import { environment } from 'src/environments/environment';

am4core.useTheme(am4themes_animated);
// am4core.useTheme(am4themes_kelly);

@Component({
  selector: 'app-votm-line-graph',
  templateUrl: './votm-line-graph.component.html',
  styleUrls: ['./votm-line-graph.component.scss']
})
export class VotmLineGraphComponent implements OnInit {
  @Input() data: DashBoard;
  @Input() id: string;
  @Input() locked: boolean;

  pageLabels: any;
  updatedData: any;

  // @ViewChild('config', null) configModal: any;
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
  // private selDateRange: string = "1m";
  private selDynDateRng: string = '1m';
  private selYAxisRange: string[] = ["auto", "auto"];
  private rangeYAxisMin: number[] = [null, null];
  private rangeYAxisMax: number[] = [null, null];
  private rangeSeriesSet: boolean = false;
  private signalTypes: any[] = [
    { "type": "pressure", "uom": "psi", "nominal": 1500, "var": 5 },
    { "type": "Temperature", "uom": "°F", "nominal": 100, "var": 2 },
    { "type": "Elec_Current", "uom": "kV", "nominal": 80, "var": 3 },
    { "type": "humidity", "uom": "%RH", "nominal": 50, "var": 1 },
    { "type": "Battery", "uom": "V", "nominal": 50, "var": 4 },
    { "type": "signal", "uom": "C", "nominal": 50, "var": 1 },
    { "type": "Peak Current", "uom": "V", "nominal": 50, "var": 1 },
    { "type": "Average Current", "uom": "V", "nominal": 50, "var": 1 },
    { "type": "Y Peak Acceleration", "uom": "V", "nominal": 50, "var": 1 },
    { "type": "mode", "uom": "%", "nominal": 50, "var": 1 },
    { "type": "Gauge Pressure", "uom": "psi", "nominal": 50, "var": 1 },
    { "type": "X Peak Acceleration", "uom": "%RH", "nominal": 50, "var": 1 },
    { "type": "range", "uom": "%RH", "nominal": 50, "var": 1 },
    { "type": "Polar Angle Peak Acceleration", "uom": "%RH", "nominal": 50, "var": 1 },
    { "type": "Z Peak Acceleration", "uom": "%RH", "nominal": 50, "var": 1 },
    { "type": "Absolute Pressure Count", "uom": "%RH", "nominal": 50, "var": 1 },
    { "type": "Absolute Pressure", "uom": "%RH", "nominal": 50, "var": 1 }
  ]

  private dateRange: any[] = [
    // { "value": "5m", "name": "Five Minute" },
    // { "value": "10m", "name": "Ten Minute" },
    // { "value": "20m", "name": "Twenty Minute" },
    // { "value": "30m", "name": "Thirty Minute" },
    // { "value": "1h", "name": "One hour" },
    // { "value": "5h", "name": "Five hour" },
    // { "value": "10h", "name": "Ten hour" },
    // { "value": "1d", "name": "One day" }
    // 5m , 10m, 20m, 30m, 1h, 5h, 10h, 20h, 1d

    { "value": "1m", "name": "One Minute" },
    { "value": "1h", "name": "One Hour" },
    { "value": "1d", "name": "One Day" },
    { "value": "1w", "name": "One Week" },
    { "value": "1mo", "name": "One Month" },
    { "value": "3mo", "name": "Three Months" },
    { "value": "6mo", "name": "Six Months" },
    { "value": "ytd", "name": "Year to Date" },
    { "value": "year", "name": "One Year" },
    { "value": "all", "name": "All Available Data" }

  ]

  yAxisType: string[] = ["", ""];
  yAxisSignals: number[] = [0, 0];

  signals: any =
    // [{ "type": "temperature", "name": "GV ❯ Prod ❯ Ambient Temperature", "selY": [false, false] },
    // { "type": "temperature", "name": "GV ❯ Prod ❯ EAP1 ❯ Exhaust", "selY": [false, false] },
    // { "type": "temperature", "name": "GV ❯ Prod ❯ EAP2 ❯ Exhaust", "selY": [false, false] },
    // { "type": "pressure", "name": "GV ❯ Lab ❯ IB ❯ Main Pump", "selY": [false, false] },
    // { "type": "pressure", "name": "GV ❯ Lab ❯ IB ❯ Drain Pan Suction", "selY": [false, false] },
    // { "type": "temperature", "name": "GV ❯ Lab ❯ IB ❯ Oil Cooler", "selY": [false, false] },
    // { "type": "temperature", "name": "GV ❯ Lab ❯ IB ❯ Oil Reservoir", "selY": [false, false] },
    // { "type": "pressure", "name": "GV ❯ Lab ❯ IB ❯ Impulse #2 Pilot Pressure", "selY": [false, false] },
    // { "type": "pressure", "name": "GV ❯ Lab ❯ IB ❯ Accumulator", "selY": [false, false] },
    // { "type": "pressure", "name": "GV ❯ Lab ❯ IB ❯ Main Pump Suction", "selY": [false, false] },
    // { "type": "humidity", "name": "GB ❯ Furness Supply Humidity", "selY": [false, false] },
    // { "type": "humidity", "name": "GB ❯ Cleanroom Supply Humidity", "selY": [false, false] }
    // ];
    [];
  selectedCheckboxes: any[] = [];
  autoRefresh: boolean = false;
  dataLoading: boolean = false;
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

  @ViewChild('graphDiv', null) graphDiv: ElementRef;
  trendChartWidget: TrendChartWidget = new TrendChartWidget();
  dashboardWidget: any;
  chartLoaded: boolean;

  constructor(private modalService: NgbModal, private zone: NgZone, private timeSeries: TimeSeriesService, private configSettingsService: ConfigSettingsService,
    private dashboardService: DashboardService) { }

  ngOnInit() {
    this.trendChartWidget.dateRange = '1m';
    this.trendChartWidget.signalsY1 = [];
    this.trendChartWidget.signalsY2 = [];
    this.trendChartWidget.displayThrshold = 'none';
    // console.log('this.data ', this.data)
    if (this.data) {
      if (this.data.dashboardId) {
        this.getDashboardWidget();
      }
      if (this.data.organizationId) {
        this.getSignalsAssociatedAssetByOrgId(this.data.organizationId);
      }
      this.wId = this.data.dashboardId + "-" + this.id;
      this.wConfig = (this.data.widgetConf) ? this.data.widgetConf : { yMin: [null, null], yMax: [null, null] };
    }

    this.getScreenLabels();


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

  getScreenLabels() {
    this.configSettingsService.getTrendChartConfigScreenLabels()
      .subscribe(response => {
        this.pageLabels = response;
        // console.log('Screens Labels', this.pageLabels);
      });
  }

  onRadioGroupChange() {
    this.saveResult();
  }

  getUpdatedTimeSeriesData() {
    this.timeSeries.getUpdatedTimeSeriesAggregateMultipleDevices()
      .subscribe(response => {
        this.updatedData = response;
        //console.log()
      })
  }

  // closeModal(){
  //   this.configModal.close()
  // }
  setFromDate(count: number, option: moment.unitOfTime.DurationConstructor) {
    return moment().subtract(count, option).toDate();
  }

  getDashboardWidget() {
    this.dashboardService.getDashboardWidgets(this.data.dashboardId)
      .subscribe(response => {
        if (response && response.length > 0) {
          response.forEach(widget => {
            if (widget.widgetName === 'Trend Chart Widget') {
              this.dashboardWidget = widget;
              let widgetConfiguration = JSON.parse(widget.widgetConfiguration);
              console.log('getDashboardWidget ', JSON.parse(widget.widgetConfiguration));
              this.trendChartWidget = new TrendChartWidget();
              this.trendChartWidget = widgetConfiguration;
              this.wConfig['title'] = widgetConfiguration.chartTitle;
              this.selectedCheckboxes = this.trendChartWidget.propertyValue.split(',');

              if (this.trendChartWidget.signalsY1 && this.trendChartWidget.signalsY1.length > 0) {
                this.yAxisSignals[0] += 1; // yaxistype

              }
              if (this.trendChartWidget.signalsY2 && this.trendChartWidget.signalsY2.length > 0) {
                this.yAxisSignals[1] += 1;
              }
              this.loadYAxisType();
              // signal.selY[0] = 
              // this.trendChartWidget.dateRange = widgetConfiguration.dateRange
              // this.trendChartWidget.displayThrshold = widgetConfiguration.displayThrshold
              // this.trendChartWidget.eventFlags = widgetConfiguration.eventFlags
              // this.trendChartWidget.leftAxisRangeY1 = widgetConfiguration.leftAxisRangeY1
              // this.trendChartWidget.legends = widgetConfiguration.legends
            }
          });

        }
        // var configuration = JSON.parse(response.widgetConfiguration)
        // console.log('getDashboardWidget ', response);
      });
  }

  saveResult(performSaveWidgetConfig: boolean = true) {
    console.log('this.trendChartWidget ', this.trendChartWidget)

    let body = {
      "accountCode": "PCM",
      "propertyName": "SignalId",
      "propertyValue": '',
      "measuredValue": "SignalValue",
      // "fromDateTime": "2019-11-18T20:16:43.863Z",//new Date(`${new Date().getMonth()}/${new Date().getDate()}/${new Date().getFullYear()-2}`),
      //fromDateTime: One Minute One Hour, One Day, One Week, One Month Three Months, Six Months, Year to Date, One Year All Available Data 
      "toDateTime": new Date(),//"2019-11-20T20:23:43.863Z",
      "environmentFqdn": "41075d1a-97a6-4f2d-9abb-a1c08be5b6c4.env.timeseries.azure.com",
      "bucketSize": "1m"//this.selDateRange
      // bucket Size: make it 5m , 10m, 20m, 30m, 1h, 5h, 10h, 20h, 1d, 5 71fe01ae-141c-463f-8e5c-5c40ee02e533
    };
    let numberOfSeconds = 0;
    if (this.trendChartWidget.dateRange) {
      // body.bucketSize = this.trendChartWidget.dateRange;
      if (this.trendChartWidget.dateRange === '1m') {
        body['fromDateTime'] = this.setFromDate(1, 'minute');
        numberOfSeconds = 60;
      }
      if (this.trendChartWidget.dateRange === '1h') {
        body['fromDateTime'] = this.setFromDate(1, 'hour');
        numberOfSeconds = 60 * 60;
      }
      if (this.trendChartWidget.dateRange === '1d') {
        body['fromDateTime'] = this.setFromDate(1, 'day');
        numberOfSeconds = 24 * 60 * 60;
      }
      if (this.trendChartWidget.dateRange === '1w') {
        body['fromDateTime'] = this.setFromDate(7, 'days');
        numberOfSeconds = 7 * 24 * 60 * 60;
      }
      // console.log('Body ', body)
      if (this.trendChartWidget.dateRange === '1mo') {
        body['fromDateTime'] = this.setFromDate(1, 'month');
        numberOfSeconds = 30 * 24 * 60 * 60;
      }
      if (this.trendChartWidget.dateRange === '3mo') {
        body['fromDateTime'] = this.setFromDate(3, 'months');
        numberOfSeconds = 3 * 30 * 24 * 60 * 60;
      }
      if (this.trendChartWidget.dateRange === '6mo') {
        body['fromDateTime'] = this.setFromDate(6, 'months');
        numberOfSeconds = 2 * 3 * 30 * 24 * 60 * 60;
      }
      if (this.trendChartWidget.dateRange === 'ytd') {
        body['fromDateTime'] = moment().startOf('year').toDate();
        let days = moment().diff(moment().startOf('year'));
        numberOfSeconds = days * 24 * 60 * 60;
      }
      if (this.trendChartWidget.dateRange === 'year') {
        body['fromDateTime'] = this.setFromDate(1, 'year');
        numberOfSeconds = 2 * 6 * 30 * 24 * 60 * 60;
      }
      if (this.trendChartWidget.dateRange === 'all') {
        body['fromDateTime'] = this.setFromDate(400, 'days');
        numberOfSeconds = 400 * 24 * 60 * 60;
      }
    }

    if (this.graphDiv) {
      let offsetWidth = this.graphDiv.nativeElement.offsetWidth;
      // body.bucketSize = `${((numberOfSeconds * 2) / (60 * offsetWidth)).toFixed()}m`;
      body.bucketSize = `${((numberOfSeconds * 2) / offsetWidth).toFixed()}s`;
      // console.log('bucketsize ', numberOfSeconds, offsetWidth, body.bucketSize)
    }

    // console.log('body ', body);

    let selectedSignals = [];
    this.signals.forEach(signal => {
      if (this.selectedCheckboxes.indexOf(signal.id) >= 0) {
        selectedSignals.push(signal);
      }
    })

    if (this.selectedCheckboxes) {
      body.propertyValue = this.selectedCheckboxes.join(',');
    }

    // code to remove start
    // body.propertyValue = '71fe01ae-141c-463f-8e5c-5c40ee02e533';
    // end

    // console.log('body.propertyValue ', this.signals, this.selectedCheckboxes, body.propertyValue)
    if (performSaveWidgetConfig) {
      this.timeSeries.getTimeSeriesAggregateMultipleDevices(body)
        .subscribe(response => {
          this.loadLineChart(selectedSignals, body);
        });

      this.trendChartWidget.leftAxisRangeY1 = this.selYAxisRange[0];
      this.trendChartWidget.rightAxisRangeY2 = this.selYAxisRange[1];
      this.trendChartWidget.chartTitle = this.wConfig.title;
      this.trendChartWidget.fromDateTime = body['fromDateTime'];
      this.trendChartWidget.bucketSize = body.bucketSize;
      this.trendChartWidget.propertyValue = body.propertyValue;

      this.trendChartWidget.accountCode = "PCM";
      this.trendChartWidget.propertyName = "SignalId";
      this.trendChartWidget.measuredValue = "SignalValue";
      this.trendChartWidget.toDateTime = new Date();
      this.trendChartWidget.environmentFqdn = "41075d1a-97a6-4f2d-9abb-a1c08be5b6c4.env.timeseries.azure.com";
      let trendWidgetBody = {
        "widgetName": "Trend Chart Widget",
        "dashBoardId": this.data.dashboardId,
        "widgetConfiguration": JSON.stringify(this.trendChartWidget),
        "published": true,
        "active": true,
        "dashboardWidgetId": this.dashboardWidget ? this.dashboardWidget.dashboardWidgetId : null
      }

      if (trendWidgetBody && !trendWidgetBody.dashboardWidgetId) {
        delete trendWidgetBody.dashboardWidgetId;
      }

      console.log('trendwidget body ', trendWidgetBody)
      this.saveUpdateWidget(trendWidgetBody);
    } else {
      // debugger;
      // this.loadYAxisType();
      this.loadLineChart(this.trendChartWidget.propertyValue.split(','), this.trendChartWidget);
    }
  }

  private saveUpdateWidget(trendWidgetBody: any) {
    if (this.dashboardWidget && this.dashboardWidget.dashboardWidgetId) {
      this.dashboardService.updateDashboardWidget(trendWidgetBody)
        .subscribe(response => {
          console.log('response ', response);
        });
    }
    else {
      this.dashboardService.saveDashboardWidget(trendWidgetBody)
        .subscribe(response => {
          console.log('response ', response);
        });
    }
  }

  private loadLineChart(selectedSignals: any[], requestedBody: any) {
    if (this.chart) {
      this.chart.dispose();
      this.rangeSeriesSet = false;
    }
    // this.chart.dataSource.
    this.configured = true;
    this.selDynDateRng = this.trendChartWidget.dateRange;
    for (let i = 0; i < 2; i++) {
      this.rangeYAxisMin[i] = parseFloat(this.wConfig.yMin[i]);
      this.rangeYAxisMax[i] = parseFloat(this.wConfig.yMax[i]);
      this.autoScaleY[i] = (this.selYAxisRange[i] === "auto");
    }
    // Add amCharts 4 license
    am4core.addLicense("CH192270209");
    // Add Maps license
    am4core.addLicense("MP192270209");
    am4core.options.commercialLicense = true;
    hideCredits: true;
    // this.zone.runOutsideAngular(() => {
    let chart = am4core.create(this.wId, am4charts.XYChart);
    chart.paddingRight = 20;
    chart.dataSource.url = `${environment.protocol}://${environment.server}/${environment.virtualName}/${AppConstants.GET_UPDATEDTIMESERIES_SIGNAL}?AccountCode=${requestedBody.accountCode}&PropertyName=${requestedBody.propertyName}&PropertyValue=${requestedBody.propertyValue}&MeasuredValue=${requestedBody.measuredValue}&FromDateTime=${typeof (requestedBody.fromDateTime) === 'string' ? requestedBody.fromDateTime : requestedBody.fromDateTime.toISOString()}&ToDateTime=${typeof (requestedBody.toDateTime) ==='string' ? requestedBody.fromDateTime : requestedBody.toDateTime.toISOString()}&BucketSize=${requestedBody.bucketSize}`;
    chart.dataSource.parser = new am4core.JSONParser();
    // xAxis.dateFormatter = new am4core.DateFormatter();
    // xAxis.dateFormatter.dateFormat = "MM-dd";
    chart.dataSource.parser.options.dateFormat = 'MM/dd/yyyy hh:mm:ss a';
    // chart.dataSource.dateFormat = 'M/d/y h:m:s a';
    chart.dataSource.reloadFrequency = 60000;
    // chart.data = response; // timeseries;// this.generateChartData();
    // chart.dataSource.reloadFrequency = 3000;
    let title = chart.titles.create();
    title.text = (this.wConfig.title) ? this.wConfig.title : 'Line-Chart';
    title.fontSize = 25;
    title.marginBottom = 30;
    let tempdateaxis = new am4charts.DateAxis();
    // tempdateaxis.title = 'AHAMED';
    // tempdateaxis.title = new am4core.Label();
    // tempdateaxis.title.text = 'AHAMED';
    // tempdateaxis.datest
    // tempdateaxis.tooltipText ='AHAMED'
    let dateAxis = chart.xAxes.push(tempdateaxis);
    dateAxis.renderer.line.strokeOpacity = 1;
    dateAxis.renderer.line.stroke = am4core.color("gray");
    dateAxis.tooltipDateFormat = "MM/dd/YYYY hh:mm:ss";
    dateAxis.dateFormats.setKey("day", "MMM dd");
    dateAxis.dateFormats.setKey("year", "yyyy");
    dateAxis.dateFormats.setKey("second", "HH:mm:ss");
    //Added Code Start
    // dateAxis.start = 0.7;
    // dateAxis.keepSelection = true;
    // dateAxis.renderer.grid.template.location = 0;
    // dateAxis.renderer.axisFills.template.disabled = true;
    // dateAxis.renderer.ticks.template.disabled = true;
    // dateAxis.data = response;
    // Added Code end
    if (this.yAxisSignals[0])
      this.createValueAxis(chart, 0);
    if (this.yAxisSignals[1])
      this.createValueAxis(chart, 1);
    let colorSet = new am4core.ColorSet();
    colorSet.step = 2;
    // debugger;
    selectedSignals.forEach((signal, index) => {
      if (signal.selY[0] || signal.selY[1])
        this.createAxisAndSeries(chart, signal, index, colorSet.next());
    });
    chart.legend = new am4charts.Legend();
    chart.legend.position = "right";
    chart.legend.valign = "top";
    chart.legend.itemContainers.template.tooltipText = "{name}";
    this.legendWidth = chart.legend.width;
    if (!this.showLegend)
      chart.legend.width = 0;
    // Add cursor
    chart.cursor = new am4charts.XYCursor();
    chart.cursor.xAxis = dateAxis;
    // chart.cursor.snapToSeries = series;
    // chart.cursor = new am4charts.XYCursor();
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
    // setTimeout(() => {
    //   this.dataLoading = false;
    // }, 30000);
    // console.log('this.chart ', this.chart);
  }

  open(config) {
    // console.log('Config ', config)
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
    // debugger;
    // Will Fix this title issue -- Ahamed
    let signalType = this.signalTypes.find(({ type }) => type === this.yAxisType[axis]);
    valueYAxis.title.text = signalType ? signalType.uom.toUpperCase() : '';

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
      rangeLC.value = 1000000; //-99999;
      rangeLC.endValue = thresholds.lowCritical;
      rangeLC.axisFill.fill = am4core.color("#dc3545");
      rangeLC.axisFill.fillOpacity = (this.showThresh[idx]) ? 0.2 : 0;
      rangeLC.grid.strokeOpacity = 0;
    }
    if (thresholds.lowWarn) {
      var rangeLW = valueAxis.axisRanges.create();
      rangeLW.value = (thresholds.lowCritical) ? thresholds.lowCritical : 800000;
      rangeLW.endValue = thresholds.lowWarn;
      rangeLW.axisFill.fill = am4core.color("#ffc107");
      rangeLW.axisFill.fillOpacity = (this.showThresh[idx]) ? 0.2 : 0;
      rangeLW.grid.strokeOpacity = 0;
    }
    if (thresholds.highWarn) {
      var rangeHW = valueAxis.axisRanges.create();
      rangeHW.value = thresholds.highWarn;
      rangeHW.endValue = (thresholds.highCritical) ? thresholds.highCritical : 800000;
      rangeHW.axisFill.fill = am4core.color("#ffc107");
      rangeHW.axisFill.fillOpacity = (this.showThresh[idx]) ? 0.2 : 0;
      rangeHW.grid.strokeOpacity = 0;
    }
    if (thresholds.highCritical) {
      var rangeHC = valueAxis.axisRanges.create();
      rangeHC.value = thresholds.highCritical;
      rangeHW.endValue = 1200000;
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

  // // generate some random data, quite different range
  // generateChartData() {
  //   let chartData = [];
  //   let firstDate = new Date();
  //   firstDate.setDate(firstDate.getDate() - 100);
  //   firstDate.setHours(0, 0, 0, 0);

  //   for (var i = 0; i < 1000; i++) {
  //     let newDate = new Date(firstDate);
  //     newDate.setDate(newDate.getDate() + i);
  //     chartData.push({ date: newDate });
  //   }

  //   this.signals.forEach((signal, index) => {
  //     if (signal.selY[0] || signal.selY[1]) {
  //       let avgVal = this.signalTypes.find(({ type }) => type === signal.type).nominal;
  //       let variance = this.signalTypes.find(({ type }) => type === signal.type).var;
  //       let minVal;
  //       let maxVal;

  //       for (var i = 0; i < 1000; i++) {
  //         avgVal += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * variance);
  //         minVal = avgVal + Math.round(Math.random() * -3 * variance);
  //         maxVal = avgVal + Math.round(Math.random() * 3 * variance);

  //         chartData[i]["SigAvg" + index] = avgVal;
  //         chartData[i]["SigMin" + index] = minVal;
  //         chartData[i]["SigMax" + index] = maxVal;
  //       }
  //     }
  //   });

  //   return chartData;

  // }

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

  selectSignal(idx, axis, signalId) {

    if (this.selectedCheckboxes.indexOf(signalId) >= 0) {
      this.selectedCheckboxes.splice(this.selectedCheckboxes.indexOf(signalId), 1);
    } else {
      this.selectedCheckboxes.push(signalId);
    }

    this.setSignalToTendWidgetModel(axis, signalId);



    // console.log('selectSignal ', this.selectedCheckboxes)

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

  private setSignalToTendWidgetModel(axis: any, signalId: any) {
    if (axis === 0) {
      if (this.trendChartWidget.signalsY1.indexOf(signalId) >= 0) {
        this.trendChartWidget.signalsY1.splice(this.trendChartWidget.signalsY1.indexOf(signalId), 1);
      }
      else {
        this.trendChartWidget.signalsY1.push(signalId);
      }
    }
    else {
      if (this.trendChartWidget.signalsY2.indexOf(signalId) >= 0) {
        this.trendChartWidget.signalsY2.splice(this.trendChartWidget.signalsY2.indexOf(signalId), 1);
      }
      else {
        this.trendChartWidget.signalsY2.push(signalId);
      }
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
        // console.log('Time Series Signal', response);
        let tempArray = [];
        if (response) {
          // Location
          if (response.locations && response.locations.length > 0) {
            response.locations.forEach(location => {
              // Direct Signal
              if (location.signals && location.signals.length > 0) {
                location.signals.forEach(signal => {
                  tempArray.push({ "id": signal.signalId, "type": signal.signalType, "name": `Quick Coupling Division > ${location.locationName} > ${signal.signalName}`, "selY": [false, false] })
                });
              }

              // Asset
              if (location.assets && location.assets.length > 0) {
                location.assets.forEach(asset => {
                  if (asset.signals && asset.signals.length > 0) {
                    asset.signals.forEach(signal => {
                      tempArray.push({ "id": signal.signalId, "type": signal.signalType, "name": `Quick Coupling Division > ${location.locationName} > ${asset.assetName} > ${signal.signalName}`, "selY": [false, false] })
                    });
                  }
                })
              }
            })
          }
        }
        this.signals = tempArray.reduce((acc, cur) => acc.some(x => (x.id === cur.id)) ? acc : acc.concat(cur), [])

        this.loadYAxisType();

      });

  }

  private loadYAxisType() {
    if (this.signals && this.signals.length > 0 && this.yAxisSignals[0] || this.yAxisSignals[1]) {
      this.signals.forEach(signal => {
        if (this.trendChartWidget.signalsY2 && this.trendChartWidget.signalsY2.length > 0 && signal.id === this.trendChartWidget.signalsY2[0]) {
          this.yAxisType[1] = signal.type;
        }
        if (this.trendChartWidget.signalsY1 && this.trendChartWidget.signalsY1.length > 0 && signal.id === this.trendChartWidget.signalsY1[0]) {
          this.yAxisType[0] = signal.type;
        }
      });
      if (!this.chartLoaded) {
        this.chartLoaded = true;

        this.saveResult(false);
      }
    }
  }

  onRefreshClick() {
    // console.log('Refresh Click');
    this.saveResult();
  }

  onDisplayThresholdsChange(event, value) {
    console.log('onRadioChange ', event);
    this.trendChartWidget.displayThrshold = value;
  }
}
