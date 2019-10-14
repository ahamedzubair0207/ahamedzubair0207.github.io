import { Organization } from './../../../../models/organization.model';
import { Component, OnInit, NgZone } from '@angular/core';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

@Component({
  selector: 'app-votm-cloud-admin-gateways-home',
  templateUrl: './votm-cloud-admin-gateways-home.component.html',
  styleUrls: ['./votm-cloud-admin-gateways-home.component.scss']
})
export class VotmCloudAdminGatewaysHomeComponent implements OnInit {
  allGetways: {};
  private chart: am4charts.PieChart;
  constructor(private zone: NgZone) { }

  ngOnInit() {
    this.getAllGateways();
    console.log(this.allGetways);
  }

  getAllGateways() {
    this.allGetways = [
      {
        gatewayname: 'Compressor Room',
        eath0mac: '18:9b:a5:10:22:23',
        location: 'CR01',
        organization: 'QCD',
        signal: '',
        lastreporttime: '1571051724',
        state: ''
      },
      {
        gatewayname: 'QCD Lab',
        eath0mac: '18:9b:a5:10:22:19',
        location: 'CR01',
        organization: 'QCD',
        signal: '',
        lastreporttime: '1571051024',
        state: ''
      },
      {
        gatewayname: 'Production',
        eath0mac: '18:9b:a5:10:22:81',
        location: 'CR01',
        organization: 'QCD',
        signal: '',
        lastreporttime: '1571051224',
        state: ''
      },
      {
        gatewayname: 'Line 62',
        eath0mac: '18:9b:a5:10:22:64',
        location: 'CR01',
        organization: 'QCD',
        signal: '',
        lastreporttime: '1571051524',
        state: ''
      }
    ];
  } // get allGetWays fun end

  ngAfterViewInit() {
    this.gatewayStatusPieChartGraph();
  }

  ngOnDestroy() {
    this.zone.runOutsideAngular(() => {
      if (this.chart) {
        this.chart.dispose();
      }
    });
  }

  gatewayStatusPieChartGraph() {
    let chart = am4core.create('getways-status-chartdiv-pie-sliced', am4charts.PieChart);
    // Set data
    var selected;
    var types = [
      {
        type: 'Online',
        percent: 70,
        color: chart.colors.getIndex(0),
        subs: ''
      },
      {
        type: 'Offline',
        percent: 30,
        color: chart.colors.getIndex(1),
        subs: ''
      }];

    // Add data
    chart.data = generateChartData();

    // Add and configure Series
    var pieSeries = chart.series.push(new am4charts.PieSeries());
    pieSeries.dataFields.value = 'percent';
    pieSeries.dataFields.category = 'type';
    pieSeries.slices.template.propertyFields.fill = 'color';
    pieSeries.slices.template.propertyFields.isActive = 'pulled';
    pieSeries.slices.template.strokeWidth = 0;

    function generateChartData() {
      var chartData = [];
      for (var i = 0; i < types.length; i++) {
        if (i === selected) {
          for (var x = 0; x < types[i].subs.length; x++) {
            chartData.push({
              // type: types[i].subs[x].type,
              // percent: types[i].subs[x].percent,
              color: types[i].color,
              pulled: true
            });
          }
        } else {
          chartData.push({
            type: types[i].type,
            percent: types[i].percent,
            color: types[i].color,
            id: i
          });
        }
      }
      return chartData;
    }

    // pieSeries.slices.template.events.on('hit', function(event) {
    //   if (event.target.dataItem.dataContext['id'] !== undefined) {
    //     selected = event.target.dataItem.dataContext['id'];
    //   } else {
    //     selected = undefined;
    //   }
    //   chart.data = generateChartData();
    // });
  }
}
