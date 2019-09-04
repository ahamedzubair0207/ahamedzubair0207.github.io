import { Component, OnInit, NgZone } from '@angular/core';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);
@Component({
  selector: 'app-votm-line-graph',
  templateUrl: './votm-line-graph.component.html',
  styleUrls: ['./votm-line-graph.component.scss']
})
export class VotmLineGraphComponent implements OnInit {

  private chart: am4charts.XYChart;
  id: any;

  constructor(private zone: NgZone) {
    this.id = Math.floor((Math.random() * 100) + 1);
   }

  ngOnInit() {
    
  }

  ngAfterViewInit() {
   
      let chart = am4core.create("chartdiv-line-"+this.id, am4charts.XYChart);

      chart.paddingRight = 20;

      let data = [];
      let visits = 10;
      for (let i = 1; i < 365; i++) {
        visits += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 10);
        data.push({ date: new Date(2018, 0, i), name: "name" + i, value: visits });
      }

      chart.data = data;

      let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
      dateAxis.keepSelection = true;
      dateAxis.renderer.grid.template.location = 0;

      let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
      valueAxis.keepSelection = true;
      valueAxis.tooltip.disabled = true;
      valueAxis.renderer.minWidth = 35;

      let series = chart.series.push(new am4charts.LineSeries());
      series.dataFields.dateX = "date";
      series.dataFields.valueY = "value";

      series.segments.template.events.on("hit", function(ev) {
        console.log("clicked on ", ev.target);
       }, this);

      series.tooltipText = "{valueY.value}";
      chart.cursor = new am4charts.XYCursor();

      let scrollbarX = new am4charts.XYChartScrollbar();
      scrollbarX.series.push(series);
      chart.scrollbarX = scrollbarX;

      this.chart = chart;

      let dateCount = 0;
      var myVar = setInterval(addData, 1000);

      function addData(){
          console.log("timer triggered");
          visits += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 10);
          chart.addData({ date: new Date(2019, 0, dateCount), name: "name" + dateCount, value: visits });
          //chart.data = data;
          dateCount++;
        
      };
   
  }

  ngOnDestroy() {
    this.zone.runOutsideAngular(() => {
      if (this.chart) {
        this.chart.dispose();
      }
    });
  }

}
