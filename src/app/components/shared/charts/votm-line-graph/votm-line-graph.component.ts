import { Component, OnInit, NgZone, Input} from '@angular/core';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { ToastrService } from 'ngx-toastr';
import { Toaster } from '../../votm-cloud-toaster/votm-cloud-toaster';
import { DbItem } from '../../../../models/db-item';

am4core.useTheme(am4themes_animated);
@Component({
  selector: 'app-votm-line-graph',
  templateUrl: './votm-line-graph.component.html',
  styleUrls: ['./votm-line-graph.component.scss']
})
export class VotmLineGraphComponent implements OnInit {


  private chart: am4charts.XYChart;
  id: any;
  isTrendChartConfigured: boolean;
  customizeTrendChart: any;
  toaster: Toaster = new Toaster(this.toastr);
  "hideCredits": true;

  


  constructor(
    private zone: NgZone,
    private toastr: ToastrService
  ) {
    this.id = Math.floor((Math.random() * 100) + 1);
  }

  ngOnInit() {
    // Oninit check chart is configured or not
    this.isTrendChartConfigured = false;

    // Oninit check chart is configured or not
    // this.getChartConfiguration();
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


  onClickOfCustomizeTrendChart() {
    // Open Chart configuration modal popup
    const modal = document.getElementById('configure-trend-chart-modal');
    modal.style.display = 'block';
    this.customizeTrendChart = document.getElementById('configure-trend-chart-modal');
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


  getAMTrendChart(){
    am4core.options.commercialLicense = true;
    hideCredits: true;
// Create chart instance
let chart = am4core.create("chartdiv-div-line-" + this.id, am4charts.XYChart);

// Add data
chart.data = generateChartData();

// Create axes
var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
dateAxis.renderer.minGridDistance = 50;

var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

// Create series
var series = chart.series.push(new am4charts.LineSeries());
series.dataFields.valueY = "visits";
series.dataFields.dateX = "date";
series.strokeWidth = 2;
series.minBulletDistance = 10;
series.tooltipText = "{valueY}";
series.tooltip.pointerOrientation = "vertical";
series.tooltip.background.cornerRadius = 20;
series.tooltip.background.fillOpacity = 0.5;
series.tooltip.label.padding(12, 12, 12, 12)

// Add scrollbar
let scrollbarX = new am4charts.XYChartScrollbar();
 scrollbarX.series.push(series);
 chart.scrollbarX = scrollbarX
// chart.scrollbarX = new am4charts.XYChartScrollbar();
// chart.scrollbarX.series.push(series);


// Add cursor
chart.cursor = new am4charts.XYCursor();
chart.cursor.xAxis = dateAxis;
chart.cursor.snapToSeries = series;

// Add legend
chart.legend = new am4charts.Legend();

function generateChartData() {
  let chartData = [];
  let firstDate = new Date();
  let secondDate = new Date();
  let thirdDate = new Date();
  firstDate.setDate(firstDate.getDate() - 10000);
  secondDate.setDate(secondDate.getDate() - 1000);
  thirdDate.setDate(thirdDate.getDate() - 100000);
  let visits = 1200;
  for (var i = 0; i < 5000; i++) {
    // we create date objects here. In your data, you can have date strings
    // and then set format of your dates using chart.dataDateFormat property,
    // however when possible, use date objects, as this will speed up chart rendering.
    let newDate1 = new Date(firstDate);
    let newDate2 = new Date(secondDate);
    let newDate3 = new Date(thirdDate);
    newDate1.setDate(newDate1.getDate() + i);
    newDate2.setDate(newDate2.getDate() + i);
    newDate3.setDate(newDate3.getDate() + i);

    visits += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 10);

    chartData.push({
      date: newDate1,
      visits: visits
    },
    {
      date: newDate2,
      visits: visits
    },
    {
      date: newDate3,
      visits: visits
    });
  }
  return chartData;
}
  }


}
