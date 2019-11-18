import { DbItem } from 'src/app/models/db-item';
import { Component, OnInit, NgZone, AfterViewInit, OnDestroy, Input } from '@angular/core';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import { ToastrService } from 'ngx-toastr';
import { Toaster } from '../../votm-cloud-toaster/votm-cloud-toaster';

am4core.useTheme(am4themes_animated);
@Component({
  selector: 'app-votm-clustered-column-chart',
  templateUrl: './votm-clustered-column-chart.component.html',
  styleUrls: ['./votm-clustered-column-chart.component.scss']
})
export class VotmClusteredColumnChartComponent implements OnInit {

  private chart: am4charts.XYChart;
  id: any;
  isColumnChartConfigured: boolean;
  customizeColumnChart: any;
  toaster: Toaster = new Toaster(this.toastr);
  @Input() locked: boolean;
  @Input() data: DbItem;

  constructor(
    private zone: NgZone,
    private toastr: ToastrService
  ) {
    this.id = Math.floor((Math.random() * 100) + 1);
  }

  ngOnInit() {
    // Oninit check chart is configured or not
    this.isColumnChartConfigured = false;

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
    this.isColumnChartConfigured = true;
  }

  onClickOfCustomizeColumnChart() {
    // Open Chart configuration modal popup
    const modal = document.getElementById('configure-column-chart-modal');
    modal.style.display = 'block';
    this.customizeColumnChart = document.getElementById('configure-column-chart-modal');
    window.onclick = (event) => {
      if (event.target === modal) {
        modal.style.display = 'none';
      }
    };
  }

  onClickOfCustomizeColumnChartModalClose() {
    // Close modal popup
    this.customizeColumnChart.style.display = 'none';
  }

  saveColumnChartConfiguration() {
    this.customizeColumnChart.style.display = 'none';
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
      this.getAMColumnChart();
    }, 500);

  }

  ngAfterViewInit() {

    if (this.isColumnChartConfigured) {
      this.getAMColumnChart();
    }

  }

  ngOnDestroy() {
    this.zone.runOutsideAngular(() => {
      if (this.chart) {
        this.chart.dispose();
      }
    });
  }

  getAMColumnChart() {
    let chart = am4core.create('chartdiv-clust-col-' + this.id, am4charts.XYChart);
    chart.data = [{
      year: '2003',
      europe: 2.5,
      namerica: 2.5,
      asia: 2.1,
      lamerica: 1.2,
      meast: 0.2,
      africa: 0.1
    }, {
      year: '2004',
      europe: 2.6,
      namerica: 2.7,
      asia: 2.2,
      lamerica: 1.3,
      meast: 0.3,
      africa: 0.1
    }, {
      year: '2005',
      europe: 2.8,
      namerica: 2.9,
      asia: 2.4,
      lamerica: 1.4,
      meast: 0.3,
      africa: 0.1
    }];

    // Create axes
    var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = 'year';
    categoryAxis.title.text = 'Local country offices';
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.minGridDistance = 20;
    categoryAxis.renderer.cellStartLocation = 0.1;
    categoryAxis.renderer.cellEndLocation = 0.9;

    var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.min = 0;
    valueAxis.title.text = 'Expenditure (M)';

    // Create series
    function createSeries(field, name, stacked) {
      var series = chart.series.push(new am4charts.ColumnSeries());
      series.dataFields.valueY = field;
      series.dataFields.categoryX = 'year';
      series.name = name;
      series.columns.template.tooltipText = '{name}: [bold]{valueY}[/]';
      series.stacked = stacked;
      series.columns.template.width = am4core.percent(95);
    }

    createSeries('europe', 'Europe', false);
    createSeries('namerica', 'North America', true);
    createSeries('asia', 'Asia', false);
    createSeries('lamerica', 'Latin America', true);
    createSeries('meast', 'Middle East', true);
    createSeries('africa', 'Africa', true);

    // Add legend
    chart.legend = new am4charts.Legend();
  }

}


