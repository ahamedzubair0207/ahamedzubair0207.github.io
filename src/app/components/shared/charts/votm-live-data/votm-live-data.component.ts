import { Component, OnInit, NgZone, Input, ElementRef, ViewChild } from '@angular/core';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfigSettingsService } from 'src/app/services/configSettings/configSettings.service';
import { DashBoard } from 'src/app/models/dashboard.model';
import { Router } from '@angular/router';
import { TimeSeriesService } from 'src/app/services/timeSeries/time-series.service';
import { VotmCommon } from '../../votm-common';
import { TrendChartWidget } from 'src/app/models/trend-chart-widget';
import * as moment from 'moment';
import { DashboardService } from 'src/app/services/dasboards/dashboard.service';
import { environment } from 'src/environments/environment';
import { AppConstants } from 'src/app/helpers/app.constants';


/* Chart code */
// Themes begin
am4core.useTheme(am4themes_animated);
// Themes end

@Component({
  selector: 'app-votm-live-data',
  templateUrl: './votm-live-data.component.html',
  styleUrls: ['./votm-live-data.component.scss']
})
export class VotmLiveDataComponent implements OnInit {
  @Input() data: DashBoard;
  @Input() id: string;
  @Input() locked: boolean;

  pageLabels: any;
  isParent: any;
  signals: any = [];
  trendChartWidget: TrendChartWidget = new TrendChartWidget();
  @ViewChild('graphDiv', null) graphDiv: ElementRef;

  private dateRange: any[] = [
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
  dashboardWidget: any;

  constructor(private zone: NgZone, private modalService: NgbModal,
    private configSettingsService: ConfigSettingsService, private router: Router,
    private timeSeries: TimeSeriesService,
    private dashboardService: DashboardService) {
    // this.id = Math.floor((Math.random() * 100) + 1);
  }

  ngOnInit() {
    this.trendChartWidget.dateRange = '1m';
    this.trendChartWidget.displayThrshold = 'none';
    this.getScreenLabels();
    this.getSignalData();
    this.getDashboardWidget();
  }

  ngAfterViewInit() {
  }

  onSignalOneChange(signalMappingId: string) {
    this.trendChartWidget.signalY1 = signalMappingId;
  }

  onSignalTwoChange(signalMappingId: string) {
    this.trendChartWidget.signalY2 = signalMappingId;
  }

  getSignalData() {
    if (this.router.url.startsWith(`/org/edit`) || this.router.url.startsWith(`/org/view`)) {
      // console.log('In Organization');
      if (this.data.organizationId) {
        this.getSignalsAssociatedAssetByOrgId(this.data.organizationId);
      }
    } else if (this.router.url.startsWith(`/loc/edit`) || this.router.url.startsWith(`/loc/view`)) {
      // console.log('In Location');
      if (this.data.locationId) {
        // this.getSignalsAssociatedByLocationId(this.data.locationId);
      }
    } else if (this.router.url.startsWith(`/asset/view`) || this.router.url.startsWith(`/asset/edit`)) {
      // console.log('In Asset');
      if (this.data.assetId) {
        // this.getSignalsAssociatedByAssetId(this.data.assetId);
      }
    }
  }

  getSignalsAssociatedAssetByOrgId(orgId: string) {
    this.timeSeries.getSignalsAssociatedAssetByOrgId(orgId)
      .subscribe(response => {
        // console.log('Time Series Signal', response);
        // this.mapSignals(response);
        if (response) {
          this.passOrganizationsToMap(response);
          // this.selectSignals();
        }
      });
  }

  passOrganizationsToMap(organization) {
    if (organization) {
      this.mapSignalDataTableValuesForOrganization(organization, this.isParent);
      if (this.isParent) {
        this.isParent = false;
      }

      if (organization.organizations && organization.organizations.length > 0) {
        organization.organizations.forEach(subOrg => {
          this.passOrganizationsToMap(subOrg);
        });
      }
    }
    VotmCommon.getUniqueValues(this.signals);
  }

  private mapSignalDataTableValuesForOrganization(response: any, isParent: boolean = false) {
    const sigArray = [];
    if (response) {
      // Location
      if (response.locations && response.locations.length > 0) {
        response.locations.forEach(location => {
          // Direct Signal
          if (location.signals && location.signals.length > 0) {
            location.signals.forEach(signal => {
              sigArray.push({
                type: signal.signalType,
                name: `${!isParent ? this.getShortName(response.organizationName) + ' > ' : ''}${this.getShortName(location.locationName)}
                > ${signal.associationName}`, sel: false, value: signal.Value,
                bat: signal.Battery, rssi: signal.signalId, sensor: signal.sensorName, iconFile: signal.iconFile,
                signalId: signal.signalId,
                parkerDeviceId: signal.parkerDeviceId,
                signalMappingId: signal.signalMappingId
              });
            });
          }
          // Asset
          if (location.assets && location.assets.length > 0) {
            location.assets.forEach(asset => {
              if (asset.signals && asset.signals.length > 0) {
                asset.signals.forEach(signal => {
                  sigArray.push({
                    type: signal.signalType,
                    name: `${!isParent ? this.getShortName(response.organizationName) + ' > ' : ''}
                    ${this.getShortName(location.locationName)}> ${this.getShortName(asset.assetName)}
                    > ${signal.associationName}`, sel: false,
                    value: signal.Value, bat: signal.Battery, rssi: signal.signalId, sensor: signal.sensorName, iconFile: signal.iconFile,
                    signalId: signal.signalId,
                    parkerDeviceId: signal.parkerDeviceId,
                    signalMappingId: signal.signalMappingId
                  });
                });
              }
            });
          }
        });
      }
    }
    if (!this.signals) {
      this.signals = [];
    }
    this.signals.push(...sigArray);
    // this.signals = [this.signals, ...VotmCommon.getUniqueValues(sigArray)];

    // this.signals = sigArray; //.reduce((acc, cur) => acc.some(x => (x.id === cur.id)) ? acc : acc.concat(cur), [])
    // console.log('this.signals ', this.signals);
  }

  getShortName(name: string) {
    const splittedNames: string[] = name.split(' ');
    if (splittedNames.length > 1) {
      name = splittedNames.map((splitedName) => splitedName[0]).join('');
    }
    return name;
  }

  getScreenLabels() {
    this.configSettingsService.getTrendChartConfigScreenLabels()
      .subscribe(response => {
        this.pageLabels = response;
        // // console.log('Screens Labels', this.pageLabels);
      });
  }

  open(config) {
    // // console.log('Config ', config)
    this.modalService.open(config, { size: 'lg' }).result.then((result) => {
      if (result === 'save') {
        console.log('save ', this.trendChartWidget)
        this.saveConfiguration();
      }
    });
  }
  setFromDate(count: number, option: moment.unitOfTime.DurationConstructor) {
    return moment().subtract(count, option).toDate();
  }

  saveConfiguration() {

    this.trendChartWidget.accountCode = "PCM";
    this.trendChartWidget.propertyName = "SignalId";
    // this.trendChartWidget.propertyValue = '',
    this.trendChartWidget.measuredValue = "SignalValue";
    this.trendChartWidget.toDateTime = new Date();
    this.trendChartWidget.environmentFqdn = "41075d1a-97a6-4f2d-9abb-a1c08be5b6c4.env.timeseries.azure.com";
    // "bucketSize": "1m"
    let numberOfSeconds = 0;
    if (this.trendChartWidget.dateRange) {
      // body.bucketSize = this.trendChartWidget.dateRange;
      if (this.trendChartWidget.dateRange === '1m') {
        this.trendChartWidget.fromDateTime = this.setFromDate(1, 'minute');
        numberOfSeconds = 60;
      }
      if (this.trendChartWidget.dateRange === '1h') {
        this.trendChartWidget.fromDateTime = this.setFromDate(1, 'hour');
        numberOfSeconds = 60 * 60;
      }
      if (this.trendChartWidget.dateRange === '1d') {
        this.trendChartWidget.fromDateTime = this.setFromDate(1, 'day');
        numberOfSeconds = 24 * 60 * 60;
      }
      if (this.trendChartWidget.dateRange === '1w') {
        this.trendChartWidget.fromDateTime = this.setFromDate(7, 'days');
        numberOfSeconds = 7 * 24 * 60 * 60;
      }
      if (this.trendChartWidget.dateRange === '1mo') {
        this.trendChartWidget.fromDateTime = this.setFromDate(1, 'month');
        numberOfSeconds = 30 * 24 * 60 * 60;
      }
      if (this.trendChartWidget.dateRange === '3mo') {
        this.trendChartWidget.fromDateTime = this.setFromDate(3, 'months');
        numberOfSeconds = 3 * 30 * 24 * 60 * 60;
      }
      if (this.trendChartWidget.dateRange === '6mo') {
        this.trendChartWidget.fromDateTime = this.setFromDate(6, 'months');
        numberOfSeconds = 2 * 3 * 30 * 24 * 60 * 60;
      }
      if (this.trendChartWidget.dateRange === 'ytd') {
        this.trendChartWidget.fromDateTime = moment().startOf('year').toDate();
        let days = moment().diff(moment().startOf('year'));
        numberOfSeconds = days * 24 * 60 * 60;
      }
      if (this.trendChartWidget.dateRange === 'year') {
        this.trendChartWidget.fromDateTime = this.setFromDate(1, 'year');
        numberOfSeconds = 2 * 6 * 30 * 24 * 60 * 60;
      }
      if (this.trendChartWidget.dateRange === 'all') {
        this.trendChartWidget.fromDateTime = this.setFromDate(400, 'days');
        numberOfSeconds = 400 * 24 * 60 * 60;
      }
    }

    if (this.graphDiv) {
      let offsetWidth = this.graphDiv.nativeElement.offsetWidth;
      // body.bucketSize = `${((numberOfSeconds * 2) / (60 * offsetWidth)).toFixed()}m`;
      let tempBucketSize = (numberOfSeconds * 2) / offsetWidth;
      this.trendChartWidget.bucketSize = `${tempBucketSize <= 1 ? 1 : tempBucketSize.toFixed()}s`;
    }

    if (this.trendChartWidget) {
      if (this.trendChartWidget.signalY1 && this.trendChartWidget.signalY2) {
        let tempSig1 = this.getSignalByMappingId(this.trendChartWidget.signalY1);
        let tempSig2 = this.getSignalByMappingId(this.trendChartWidget.signalY2);
        this.trendChartWidget.propertyValue = `${tempSig1},${tempSig2}`;
      }
      else if (this.trendChartWidget.signalY1) {
        let tempSig1 = this.getSignalByMappingId(this.trendChartWidget.signalY1);
        this.trendChartWidget.propertyValue = `${tempSig1}`
      } else if (this.trendChartWidget.signalY2) {
        let tempSig = this.getSignalByMappingId(this.trendChartWidget.signalY2);
        this.trendChartWidget.propertyValue = `${tempSig}`
      }
    }

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

    // // console.log('trendwidget body ', trendWidgetBody)
    this.saveUpdateWidget(trendWidgetBody);
  }

  private saveUpdateWidget(trendWidgetBody: any) {
    if (this.dashboardWidget && this.dashboardWidget.dashboardWidgetId) {
      this.dashboardService.updateDashboardWidget(trendWidgetBody)
        .subscribe(response => {
          this.loadChart();
        });
    }
    else {
      this.dashboardService.saveDashboardWidget(trendWidgetBody)
        .subscribe(response => {
          this.loadChart();
        });
    }
  }

  getDashboardWidget() {
    this.dashboardService.getDashboardWidgets(this.data.dashboardId)
      .subscribe(response => {
        if (response && response.length > 0) {
          response.forEach(widget => {
            if (widget.widgetName === 'Trend Chart Widget') {
              this.dashboardWidget = widget;
              this.trendChartWidget = JSON.parse(widget.widgetConfiguration);
              this.loadChart();
            }
          });
        }
      });
  }

  private getSignalByMappingId(signalMappingId: string) {
    let tempSignal;
    this.signals.forEach(signal => {
      if (signal.signalMappingId === signalMappingId) {
        tempSignal = signal.signalId;
      }
    });
    return tempSignal;
  }

  onDisplayThresholdsChange(value) {
    this.trendChartWidget.displayThrshold = value;
  }

  loadChart() {
    /* Chart code */
    // Themes begin
    am4core.useTheme(am4themes_animated);
    // Themes end

    // Create chart instance
    let chart = am4core.create("chartdiv", am4charts.XYChart);

    // Add data
    chart.dataSource.url = "https://poloniex.com/public?command=returnOrderBook&currencyPair=BTC_ETH&depth=50";
    // chart.dataSource.url = `${environment.protocol}://${environment.server}/${environment.virtualName}/${AppConstants.GET_UPDATEDTIMESERIES_SIGNAL}?AccountCode=${this.trendChartWidget.accountCode}&PropertyName=${this.trendChartWidget.propertyName}&PropertyValue=${this.trendChartWidget.propertyValue}
    // &MeasuredValue=${ this.trendChartWidget.measuredValue}&FromDateTime=${typeof (this.trendChartWidget.fromDateTime) === 'string' ? this.trendChartWidget.fromDateTime : this.trendChartWidget.fromDateTime.toISOString()}&ToDateTime=${typeof (this.trendChartWidget.toDateTime) === 'string' ? this.trendChartWidget.toDateTime : this.trendChartWidget.toDateTime.toISOString()}&BucketSize=${this.trendChartWidget.bucketSize}`;
    chart.dataSource.reloadFrequency = 30000;
    chart.dataSource.adapter.add("parsedData", function (data) {

      // Function to process (sort and calculate cummulative volume)
      function processData(list, type, desc) {

        // Convert to data points
        for (var i = 0; i < list.length; i++) {
          list[i] = {
            value: Number(list[i][0]),
            volume: Number(list[i][1]),
          }
        }

        // Sort list just in case
        list.sort(function (a, b) {
          if (a.value > b.value) {
            return 1;
          }
          else if (a.value < b.value) {
            return -1;
          }
          else {
            return 0;
          }
        });

        // Calculate cummulative volume
        if (desc) {
          for (var i = list.length - 1; i >= 0; i--) {
            if (i < (list.length - 1)) {
              list[i].totalvolume = list[i + 1].totalvolume + list[i].volume;
            }
            else {
              list[i].totalvolume = list[i].volume;
            }
            let dp = {};
            dp["value"] = list[i].value;
            dp[type + "volume"] = list[i].volume;
            dp[type + "totalvolume"] = list[i].totalvolume;
            res.unshift(dp);
          }
        }
        else {
          for (var i = 0; i < list.length; i++) {
            if (i > 0) {
              list[i].totalvolume = list[i - 1].totalvolume + list[i].volume;
            }
            else {
              list[i].totalvolume = list[i].volume;
            }
            let dp = {};
            dp["value"] = list[i].value;
            dp[type + "volume"] = list[i].volume;
            dp[type + "totalvolume"] = list[i].totalvolume;
            res.push(dp);
          }
        }

      }

      // Init
      let res = [];
      processData(data.bids, "bids", true);
      processData(data.asks, "asks", false);

      return res;
    });

    // Set up precision for numbers
    chart.numberFormatter.numberFormat = "#,###.####";

    // Create axes
    let xAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    xAxis.dataFields.category = "value";
    //xAxis.renderer.grid.template.location = 0;
    xAxis.renderer.minGridDistance = 50;
    xAxis.title.text = "Price (BTC/ETH)";

    let yAxis = chart.yAxes.push(new am4charts.ValueAxis());
    yAxis.title.text = "Volume";

    // Create series
    let series = chart.series.push(new am4charts.StepLineSeries());
    series.dataFields.categoryX = "value";
    series.dataFields.valueY = "bidstotalvolume";
    series.strokeWidth = 2;
    series.stroke = am4core.color("#0f0");
    series.fill = series.stroke;
    series.fillOpacity = 0.1;
    series.tooltipText = "Ask: [bold]{categoryX}[/]\nTotal volume: [bold]{valueY}[/]\nVolume: [bold]{bidsvolume}[/]"

    let series2 = chart.series.push(new am4charts.StepLineSeries());
    series2.dataFields.categoryX = "value";
    series2.dataFields.valueY = "askstotalvolume";
    series2.strokeWidth = 2;
    series2.stroke = am4core.color("#f00");
    series2.fill = series2.stroke;
    series2.fillOpacity = 0.1;
    series2.tooltipText = "Ask: [bold]{categoryX}[/]\nTotal volume: [bold]{valueY}[/]\nVolume: [bold]{asksvolume}[/]"

    let series3 = chart.series.push(new am4charts.ColumnSeries());
    series3.dataFields.categoryX = "value";
    series3.dataFields.valueY = "bidsvolume";
    series3.strokeWidth = 0;
    series3.fill = am4core.color("#000");
    series3.fillOpacity = 0.2;

    let series4 = chart.series.push(new am4charts.ColumnSeries());
    series4.dataFields.categoryX = "value";
    series4.dataFields.valueY = "asksvolume";
    series4.strokeWidth = 0;
    series4.fill = am4core.color("#000");
    series4.fillOpacity = 0.2;

    // Add cursor
    chart.cursor = new am4charts.XYCursor();

  }

}
