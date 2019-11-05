import { Component, NgZone, Input, OnInit } from '@angular/core';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { DbItem } from 'src/assets/dashboards/db-item';

am4core.useTheme(am4themes_animated);

@Component({
  selector: 'widget-trend',
  templateUrl: './widget-trend.component.html',
  styleUrls: ['./widget-trend.component.scss']
})
export class WidgetTrendComponent implements OnInit {
  @Input() data: DbItem;
  @Input() id: string;

  private chart: am4charts.XYChart;
  private wId: string = '';

  constructor(private zone: NgZone) { }

  ngOnInit() {
    this.wId = this.data.id + "-" + this.id;
  }

  ngAfterViewInit() {
    this.zone.runOutsideAngular(() => {
      let chart = am4core.create(this.wId, am4charts.XYChart);
      chart.paddingRight = 20;
      chart.data = generateChartData();

      let title = chart.titles.create();
      title.text = "Trend Chart Title"; //this.data.widgetConf.title;
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

  ngOnDestroy() {
    this.zone.runOutsideAngular(() => {
      if (this.chart) {
        this.chart.dispose();
      }
    });
  }

}
