import { Component, OnInit, NgZone, Input, ElementRef, ViewChild } from '@angular/core';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import am4themes_kelly from "@amcharts/amcharts4/themes/animated";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfigSettingsService } from 'src/app/services/configSettings/configSettings.service';
import { DashBoard } from 'src/app/models/dashboard.model';
import { Router } from '@angular/router';
import { TimeSeriesService } from 'src/app/services/timeSeries/time-series.service';
import { VotmCommon } from '../../votm-common';
import { TrendChartWidget } from 'src/app/models/trend-chart-widget';
// import * as moment from 'moment';
import * as moment from 'moment-timezone';
import { DashboardService } from 'src/app/services/dasboards/dashboard.service';
import { environment } from 'src/environments/environment';
import { AppConstants } from 'src/app/helpers/app.constants';
import { SharedService } from 'src/app/services/shared.service';


/* Chart code */
// Themes begin
// am4core.useTheme(am4themes_animated);
am4core.useTheme(am4themes_kelly);
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
  selAll = false;
  selCount = 0;
  isParent: any;
  signals: any = [];
  loggedInUser: any;
  timestamp = '';
  yAxisType: string[] = ["", ""];
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

  private signalTypes: any[] = [
    { "type": "pressure", "uom": "psi", "nominal": 1500, "var": 5 },
    { "type": "Temperature", "uom": "°F", "nominal": 100, "var": 2 },
    { "type": "Elec_Current", "uom": "kV", "nominal": 80, "var": 3 },
    { "type": "humidity", "uom": "%", "nominal": 50, "var": 1 },
    { "type": "Battery", "uom": "V", "nominal": 50, "var": 4 },
    { "type": "signal", "uom": "C", "nominal": 50, "var": 1 },
    { "type": "Peak Current", "uom": "V", "nominal": 50, "var": 6 },
    { "type": "Average Current", "uom": "V", "nominal": 50, "var": 7 },
    { "type": "Y Peak Acceleration", "uom": "V", "nominal": 50, "var": 8 },
    { "type": "mode", "uom": "%", "nominal": 50, "var": 9 },
    { "type": "Gauge Pressure", "uom": "psi", "nominal": 50, "var": 10 },
    { "type": "X Peak Acceleration", "uom": "%RH", "nominal": 50, "var": 11 },
    { "type": "range", "uom": "%RH", "nominal": 50, "var": 12 },
    { "type": "Polar Angle Peak Acceleration", "uom": "%RH", "nominal": 50, "var": 13 },
    { "type": "Z Peak Acceleration", "uom": "%RH", "nominal": 50, "var": 14 },
    { "type": "Absolute Pressure Count", "uom": "psi", "nominal": 50, "var": 15 },
    { "type": "Absolute Pressure", "uom": "psi", "nominal": 50, "var": 16 }
  ]

  dashboardWidget: any;
  chart: am4charts.XYChart;
  rangeSeriesSet: boolean;
  configured: boolean;
  selDynDateRng: string;
  wId: string;
  showMinMax: any;
  legendWidth: number | am4core.Percent;
  showLegend: boolean = true;
  private rangeYAxisMin: number[] = [null, null];
  private rangeYAxisMax: number[] = [null, null];
  private autoScaleY: boolean[] = [true, true];
  userId: string = '03C7FB47-58EE-4C41-A9D6-2AD0BD43392A';
  private showThresh: boolean[] = [false, false];


  constructor(private zone: NgZone, private modalService: NgbModal,
    private configSettingsService: ConfigSettingsService, private router: Router,
    private timeSeries: TimeSeriesService,
    private sharedService: SharedService,
    private dashboardService: DashboardService) {
    // this.id = Math.floor((Math.random() * 100) + 1);
  }


  ngOnInit() {
    if (this.data) {
      this.wId = this.data.dashboardId + "-" + this.id;
    }
    this.trendChartWidget.dateRange = '1m';
    this.trendChartWidget.displayThrshold = 'none';
    this.getScreenLabels();
    this.getSignalData();
    this.getDashboardWidget();
    this.loggedInUser = this.sharedService.getLoggedInUser();
  }

  ngAfterViewInit() {
  }

  onSignalOneChange(signalMappingId: string) {
    this.trendChartWidget.signalY1 = signalMappingId;
  }

  onSignalTwoChange(signalMappingId: string) {
    this.trendChartWidget.signalY2 = signalMappingId;
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

  getSignalData() {
    if (this.router.url.startsWith(`/org/edit`) || this.router.url.startsWith(`/org/view`)) {
      // console.log('In Organization');
      if (this.data.organizationId) {
        this.getSignalsAssociatedAssetByOrgId(this.data.organizationId);
      }
    } else if (this.router.url.startsWith(`/loc/edit`) || this.router.url.startsWith(`/loc/view`)) {
      // console.log('In Location');
      if (this.data.locationId) {
        this.getSignalsAssociatedByLocationId(this.data.locationId);
      }
    } else if (this.router.url.startsWith(`/asset/view`) || this.router.url.startsWith(`/asset/edit`)) {
      // console.log('In Asset');
      if (this.data.assetId) {
        this.getSignalsAssociatedByAssetId(this.data.assetId);
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

          if (this.trendChartWidget) {
            this.loadChart();
          }
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
                name: `${!isParent ? this.getShortName(response.organizationName) + ' ❯ ' : ''}${this.getShortName(location.locationName)}
                ❯ ${signal.associationName}`, sel: false, value: signal.Value,
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
                    name: `${!isParent ? this.getShortName(response.organizationName) + ' ❯ ' : ''}
                    ${this.getShortName(location.locationName)}❯ ${this.getShortName(asset.assetName)}
                    ❯ ${signal.associationName}`, sel: false,
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

  getSignalsAssociatedByLocationId(locId: string) {
    this.timeSeries.getTimeSeriesSignalsByLocationID(locId)
      .subscribe(async response => {
        // this.mapSignals(response);
        await this.getLocationTreeStructure(response, null, null);
        VotmCommon.getUniqueValues(this.signals);
        // this.selectSignals();
      });
  }



  // selectSignals() {
  //   if (this.signals && this.signals.length > 0 && this.trendChartWidget && this.trendChartWidget.signalY1
  //     && this.trendChartWidget.signalY1.length > 0) {
  //     this.trendChartWidget.signalY2.forEach(selectedSignal => {
  //       this.signals.forEach(signal => {
  //         if (selectedSignal === signal.signalMappingId) {
  //           signal.sel = true;
  //         }
  //       });
  //     });
  //   }
  // }

  getSignalsAssociatedByAssetId(assetId: string) {
    this.timeSeries.getTimeSeriesSignalsByAssetID(assetId)
      .subscribe(async response => {
        // this.mapSignals(response);
        await this.getAssetTreeStrucutre(response, null, null, null);
        VotmCommon.getUniqueValues(this.signals);
        // this.selectSignals();
      });
  }

  getLocationTreeStructure(location, locationLabel = null, orgLabel) {
    const locLabel = (locationLabel ? (locationLabel + ' ❯ ') : '') + location.shortName;
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
    const aLabel = (assetLabel ? (assetLabel + ' ❯ ') : '') + asset.shortName;
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

    if (orgLabel) {
      let list = [];
      list = orgLabel.split(' ❯ ');
      orgLabel = list[list.length - 1] + ' ❯ ' + (locLabel ? (locLabel + ' ❯ ') : '') + (assetLabel ? (assetLabel + ' ❯ ') : '');
    } else {
      orgLabel = (locLabel ? (locLabel + ' ❯ ') : '') + (assetLabel ? (assetLabel + ' ❯ ') : '');
    }
    if (locLabel) {
      let list = [];
      list = locLabel.split(' ❯ ');
      locLabel = list[list.length - 1] + ' ❯ ' + (assetLabel ? (assetLabel + ' ❯ ') : '');
    } else {
      locLabel = (assetLabel ? (assetLabel + ' ❯ ') : '');
    }
    if (assetLabel) {
      let list = [];
      list = assetLabel.split(' ❯ ');
      assetLabel = assetLabel + ' ❯ ';
    }
    this.signals.push({
      type: signal.signalType,
      organization: orgLabel,
      location: locLabel,
      asset: assetLabel,
      name: signal.signalName, sel: false, value: signal.Value,
      bat: signal.Battery, rssi: signal.signalId,
      sensor: signal.sensorName, iconFile: signal.iconFile,
      signalId: signal.signalId,
      parkerDeviceId: signal.parkerDeviceId,
      modifiedOn: this.timestamp,
      signalMappingId: signal.signalMappingId
    });
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
        let tempSig1 = this.getSignalByMappingId(this.trendChartWidget.signalY1).signalId;
        let tempSig2 = this.getSignalByMappingId(this.trendChartWidget.signalY2).signalId;
        this.trendChartWidget.propertyValue = `${tempSig1},${tempSig2}`;
      }
      else if (this.trendChartWidget.signalY1) {
        let tempSig1 = this.getSignalByMappingId(this.trendChartWidget.signalY1).signalId;
        this.trendChartWidget.propertyValue = `${tempSig1}`
      } else if (this.trendChartWidget.signalY2) {
        let tempSig = this.getSignalByMappingId(this.trendChartWidget.signalY2).signalId;
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
              if (this.signals && this.signals.length > 0) {
                this.loadChart();
              }
            }
          });
        }
      });
  }

  private getSignalByMappingId(signalMappingId: string) {
    let tempSignal;
    this.signals.forEach(signal => {
      if (signal.signalMappingId === signalMappingId) {
        tempSignal = signal;
      }
    });
    return tempSignal;
  }

  onDisplayThresholdsChange(value) {
    this.trendChartWidget.displayThrshold = value;
  }

  toggleThresholds(axis) {
    let opposite: number = (axis + 1) % 2;

    this.showThresh[axis] = !this.showThresh[axis];
    this.showThresh[opposite] = false;

    this.chart.yAxes.values[axis].axisRanges.each((thresh) => thresh.axisFill.fillOpacity = (this.showThresh[axis]) ? 0.2 : 0);
    if (this.chart.yAxes.values[opposite]) {
      this.chart.yAxes.values[opposite].axisRanges.each((thresh) => thresh.axisFill.fillOpacity = 0);
    }
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

  loadChart() {
    if (this.chart) {
      this.chart.dispose();
      this.rangeSeriesSet = false;
    }
    // this.chart.dataSource.
    this.configured = true;
    this.selDynDateRng = this.trendChartWidget.dateRange;
    // for (let i = 0; i < 2; i++) {
    //   // this.rangeYAxisMin[i] = parseFloat(this.wConfig.yMin[i]);
    //   // this.rangeYAxisMax[i] = parseFloat(this.wConfig.yMax[i]);
    //   this.autoScaleY[i] = (this.trendChartWidget. === "auto");
    // }
    // Add amCharts 4 license
    am4core.addLicense("CH192270209");
    // Add Maps license
    // am4core.addLicense("MP192270209");
    am4core.options.commercialLicense = true;
    hideCredits: true;
    // this.zone.runOutsideAngular(() => {
    let chart = am4core.create(this.wId, am4charts.XYChart);
    chart.paddingRight = 20;
    chart.dataSource.url = `${environment.protocol}://${environment.server}/${environment.virtualName}/${AppConstants.GET_UPDATEDTIMESERIES_SIGNAL}?userId=${this.userId}&organizationId=${this.data.organizationId}&AccountCode=${this.trendChartWidget.accountCode}&PropertyName=${this.trendChartWidget.propertyName}&PropertyValue=${this.trendChartWidget.propertyValue}&MeasuredValue=${this.trendChartWidget.measuredValue}&FromDateTime=${typeof (this.trendChartWidget.fromDateTime) === 'string' ? this.trendChartWidget.fromDateTime : this.trendChartWidget.fromDateTime.toISOString()}&ToDateTime=${typeof (this.trendChartWidget.toDateTime) === 'string' ? this.trendChartWidget.toDateTime : this.trendChartWidget.toDateTime.toISOString()}&BucketSize=${this.trendChartWidget.bucketSize}&precesion=2`;
    chart.dataSource.parser = new am4core.JSONParser();
    // xAxis.dateFormatter = new am4core.DateFormatter();
    // xAxis.dateFormatter.dateFormat = "MM-dd";
    chart.dataSource.parser.options.dateFormat = 'MM/d/yyyy h:mm:ss a';
    chart.dataSource.parser.options.dateFormatter = new am4core.DateFormatter();
    chart.dataSource.parser.options.dateFormatter.timezoneOffset = -360;
    chart.dataSource.reloadFrequency = 60000;


    // chart.dataSource.adapter.add("parsedData", function(data) {
    //   console.log('Chart Data ', data);
    // });



    let title = chart.titles.create();
    title.text = (this.trendChartWidget.chartTitle) ? this.trendChartWidget.chartTitle : '';
    title.fontSize = 25;
    title.marginBottom = 30;
    let tempdateaxis = new am4charts.DateAxis();
    let dateAxis = chart.xAxes.push(tempdateaxis);
    dateAxis.renderer.line.strokeOpacity = 1;
    dateAxis.renderer.line.stroke = am4core.color("gray");
    dateAxis.tooltipDateFormat = "MM/dd/YYYY h:mm:ss a";
    if (this.trendChartWidget.signalY1)
      this.createValueAxis(chart, 0);
    if (this.trendChartWidget.signalY2)
      this.createValueAxis(chart, 1);
    let colorSet = new am4core.ColorSet();
    colorSet.step = 2;
    if (this.trendChartWidget.signalY1) {
      let signal = this.getSignalByMappingId(this.trendChartWidget.signalY1)
      this.createAxisAndSeries(chart, signal, 0, colorSet.next());
    }
    if (this.trendChartWidget.signalY2) {
      let signal = this.getSignalByMappingId(this.trendChartWidget.signalY2)
      this.createAxisAndSeries(chart, signal, 1, colorSet.next());
    }
    // selectedSignals.forEach((signal, index) => {
    //   if (signal.selY[0] || signal.selY[1])
    //     this.createAxisAndSeries(chart, signal, index, colorSet.next());
    // });
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
      if (this.trendChartWidget.leftAxisRange === "rngMinMax") {
        this.rangeYAxisMin[0] = (<am4charts.ValueAxis>this.chart.yAxes.getIndex(0)).minZoomed;
        this.rangeYAxisMax[0] = (<am4charts.ValueAxis>this.chart.yAxes.getIndex(0)).maxZoomed;
      }
      if (this.trendChartWidget.rightAxisRange === "rngMinMax") {
        this.rangeYAxisMin[1] = (<am4charts.ValueAxis>this.chart.yAxes.getIndex(1)).minZoomed;
        this.rangeYAxisMax[1] = (<am4charts.ValueAxis>this.chart.yAxes.getIndex(1)).maxZoomed;
      }

        if (this.trendChartWidget.leftAxisRange !== "auto") {
          (<am4charts.ValueAxis>this.chart.yAxes.getIndex(0)).min = this.rangeYAxisMin[0];
          (<am4charts.ValueAxis>this.chart.yAxes.getIndex(0)).max = this.rangeYAxisMax[0];
        }
        if (this.trendChartWidget.rightAxisRange !== "auto") {
          (<am4charts.ValueAxis>this.chart.yAxes.getIndex(1)).min = this.rangeYAxisMin[1];
          (<am4charts.ValueAxis>this.chart.yAxes.getIndex(1)).max = this.rangeYAxisMax[1];
        }
    });
    this.chart = chart;
  }


  // Create series
  createAxisAndSeries(chart, signal, idx, color) {
    let series = chart.series.push(new am4charts.LineSeries());
    let valueAxis = (<am4charts.ValueAxis>chart.yAxes.getIndex(idx)); // ((signal.selY[0]) ? 0 : (this.yAxisSignals[0]) ? 1 : 0));
    let uom = this.signalTypes.find(({ type }) => type === signal.type).uom; //'uom name';
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

    // Ahamed Change
    this.showMinMax = true;
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

  createValueAxis(chart, axis) {
    let valueYAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueYAxis.tooltip.disabled = true;
    // Will Fix this title issue -- Ahamed
    let signalType = this.signalTypes.find(({ type }) => type === this.yAxisType[axis]);
    valueYAxis.title.text = signalType ? signalType.uom.toUpperCase() : ''; //'Uom Title';

    valueYAxis.renderer.line.strokeOpacity = 1;
    valueYAxis.renderer.line.stroke = am4core.color("gray");
    valueYAxis.renderer.labels.template.fill = am4core.color("gray");
    valueYAxis.renderer.opposite = (axis == 1);
    valueYAxis.renderer.grid.template.disabled = true;

    // this.createThresholdRanges(valueYAxis, 0, this.signalTypes.find(({ type }) => type === this.yAxisType[axis]).nominal);
    this.createThresholdRanges(valueYAxis, axis);
  }

  // Create thresholds
  createThresholdRanges(valueAxis, idx) {
    this.getThresholdForSignal(valueAxis, idx);
  }

  getThresholdForSignal(valueAxis, idx) {
    let signal;
    if (idx === 1) {
      signal = this.getSignalByMappingId(this.trendChartWidget.signalY2).signalId;
    } else {
      signal = this.getSignalByMappingId(this.trendChartWidget.signalY1).signalId;
    }

    this.timeSeries.getThresholdValueBySignalAndOrganizationID(signal, `organizationID=${this.data.organizationId}`)
      .subscribe(response => {
        // this.signals = response;
        // console.log("Threshold Values: ",response)
        let thresholds;
        if (response && response.length > 0) {
          thresholds = response[0];
          console.log("threshold", response);
        }

        if (thresholds && thresholds.lowCritical) {
          var rangeLC = valueAxis.axisRanges.create();
          rangeLC.value = -99999;
          rangeLC.endValue = thresholds.lowCritical;
          rangeLC.axisFill.fill = am4core.color("#dc3545");
          rangeLC.axisFill.fillOpacity = (this.showThresh[idx]) ? 0.2 : 0; 
          rangeLC.grid.strokeOpacity = 0;
        }
        if (thresholds && thresholds.lowWarning) {
          var rangeLW = valueAxis.axisRanges.create();
          rangeLW.value = (thresholds.lowCritical) ? thresholds.lowCritical : -99999;
          rangeLW.endValue = thresholds.lowWarning;
          rangeLW.axisFill.fill = am4core.color("#ffc107");
          rangeLW.axisFill.fillOpacity = (this.showThresh[idx]) ? 0.2 : 0;
          rangeLW.grid.strokeOpacity = 0;
        }
        if (thresholds && thresholds.highWarning) {
          var rangeHW = valueAxis.axisRanges.create();
          rangeHW.value = (thresholds.highCritical) ? thresholds.highCritical : 1200000;
          rangeHW.endValue = thresholds.highWarning;
          rangeHW.axisFill.fill = am4core.color("#ffc107");
          rangeHW.axisFill.fillOpacity = (this.showThresh[idx]) ? 0.2 : 0;
          rangeHW.grid.strokeOpacity = 0;
        }
        if (thresholds && thresholds.highCritical) {
          var rangeHC = valueAxis.axisRanges.create();
          rangeHC.value = thresholds.highCritical;
          rangeHW.endValue = 1200000;
          // rangeHC.endValue = 99999;
          rangeHC.axisFill.fill = am4core.color("#dc3545");
          rangeHC.axisFill.fillOpacity = (this.showThresh[idx]) ? 0.2 : 0;
          rangeHC.grid.strokeOpacity = 0;
        }
      })
  }

  onRadioGroupChange(dateRange: string) {
    this.trendChartWidget.dateRange = dateRange;
    this.saveConfiguration();
  }
}
