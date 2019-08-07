import { Component, OnInit, NgZone } from '@angular/core';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);
@Component({
  selector: 'app-votm-cylinder-gauge',
  templateUrl: './votm-cylinder-gauge.component.html',
  styleUrls: ['./votm-cylinder-gauge.component.scss']
})
export class VotmCylinderGaugeComponent implements OnInit {

  private chart: am4charts.XYChart;
  private id: any;

  constructor(private zone: NgZone) {
    this.id = Math.floor((Math.random() * 100) + 1);
   }

  ngOnInit() {
  }

  ngAfterViewInit() {
   
    let chart = am4core.create("chartdiv-cylinder-"+this.id, am4charts.XYChart3D);
    chart.titles.create().text = "Crude oil reserves";

    // Add data
    chart.data = [{
      "category": "2018 Q1",
      "value1": 30,
      "value2": 70
    }, {
      "category": "2018 Q2",
      "value1": 15,
      "value2": 85
    }, {
      "category": "2018 Q3",
      "value1": 40,
      "value2": 60
    }, {
      "category": "2018 Q4",
      "value1": 55,
      "value2": 45
    }];

    // Create axes
    var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "category";
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.grid.template.strokeOpacity = 0;

    var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.renderer.grid.template.strokeOpacity = 0;
    valueAxis.min = -10;
    valueAxis.max = 110;
    valueAxis.strictMinMax = true;
    valueAxis.renderer.baseGrid.disabled = true;
    valueAxis.renderer.labels.template.adapter.add("text", function(text) {
      
        return text + "%";
      
    })

    // Create series
    var series1 = chart.series.push(new am4charts.ConeSeries());
    series1.dataFields.valueY = "value1";
    series1.dataFields.categoryX = "category";
    series1.columns.template.width = am4core.percent(80);
    series1.columns.template.fillOpacity = 0.9;
    series1.columns.template.strokeOpacity = 1;
    series1.columns.template.strokeWidth = 2;

    var series2 = chart.series.push(new am4charts.ConeSeries());
    series2.dataFields.valueY = "value2";
    series2.dataFields.categoryX = "category";
    series2.stacked = true;
    series2.columns.template.width = am4core.percent(80);
    series2.columns.template.fill = am4core.color("#000");
    series2.columns.template.fillOpacity = 0.1;
    series2.columns.template.stroke = am4core.color("#000");
    series2.columns.template.strokeOpacity = 0.2;
    series2.columns.template.strokeWidth = 2;
  
  }

  ngOnDestroy() {
    this.zone.runOutsideAngular(() => {
      if (this.chart) {
        this.chart.dispose();
      }
    });
  }

}


