import { Component, OnInit, NgZone, Input } from '@angular/core';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import { DbItem } from 'src/app/models/db-item';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Toaster } from '../../votm-cloud-toaster/votm-cloud-toaster';

am4core.useTheme(am4themes_animated);

@Component({
  selector: 'app-votm-animated-gauge',
  templateUrl: './votm-animated-gauge.component.html',
  styleUrls: ['./votm-animated-gauge.component.scss']
})
export class VotmAnimatedGaugeComponent implements OnInit {

  @Input() data: DbItem;
  @Input() id: string;
  @Input() locked: boolean;

  private isGuageconfigured: boolean = false;
  private gaugeTitle: string = '';
  private selSignal: string;
  private showThresholds: boolean = true;
  private signals = [
    { id: 1, name: 'Outlet Pressure', type: 'pressure' },
    { id: 2, name: 'Inlet Pressure', type: 'pressure' },
    { id: 3, name: 'Outlet Temperature', type: 'temperature' }
  ];
  private wId: string = '';
  private chart: am4charts.XYChart;
  customizeGaugeChart: HTMLElement;
  toaster: Toaster = new Toaster(this.toastr);
  constructor(
    private modalService: NgbModal,
    private zone: NgZone,
    private toastr: ToastrService
    ) {
      // this.id = Math.floor((Math.random() * 100) + 1);
    }

  ngOnInit() {
    this.wId = this.data.id + "-" + this.id;
  }

  ngAfterViewInit() {

    if (this.isGuageconfigured) {
      setTimeout(() => {
        this.getGaugeChart();
      }, 500);
    }


    // let chart = am4core.create('chartdiv-animated-' + this.id, am4charts.GaugeChart);
    // hideCredits: true;
    // chart.paddingRight = 20;

    // chart.innerRadius = -25;

    // var axis = chart.xAxes.push(new am4charts.ValueAxis<am4charts.AxisRendererCircular>());
    // axis.min = 1;
    // axis.max = 100;
    // axis.strictMinMax = true;
    // axis.renderer.radius = am4core.percent(80);
    // axis.renderer.inside = true;
    // axis.renderer.line.strokeOpacity = 1;
    // axis.renderer.ticks.template.disabled = false
    // axis.renderer.ticks.template.strokeOpacity = 1;
    // axis.renderer.ticks.template.length = 10;
    // axis.renderer.grid.template.disabled = true;
    // axis.renderer.labels.template.radius = 40;
    // axis.renderer.labels.template.adapter.add('text', function (text) {
    //   return text + '%';
    // })

    // /**
    //  * Axis for ranges
    //  */

    // var colorSet = new am4core.ColorSet();

    // var axis2 = chart.xAxes.push(new am4charts.ValueAxis<am4charts.AxisRendererCircular>());
    // axis2.min = 0;
    // axis2.max = 100;
    // axis2.renderer.innerRadius = 10
    // axis2.strictMinMax = true;
    // axis2.renderer.labels.template.disabled = true;
    // axis2.renderer.ticks.template.disabled = true;
    // axis2.renderer.grid.template.disabled = true;

    // var range0 = axis2.axisRanges.create();
    // range0.value = 0;
    // range0.endValue = 50;
    // range0.axisFill.fillOpacity = 1;
    // range0.axisFill.fill = colorSet.getIndex(0);

    // var range1 = axis2.axisRanges.create();
    // range1.value = 50;
    // range1.endValue = 100;
    // range1.axisFill.fillOpacity = 1;
    // range1.axisFill.fill = colorSet.getIndex(2);

    // /**
    //  * Label
    //  */

    // var label = chart.radarContainer.createChild(am4core.Label);
    // label.isMeasured = false;
    // label.fontSize = 45;
    // label.x = am4core.percent(50);
    // label.y = am4core.percent(100);
    // label.horizontalCenter = 'middle';
    // label.verticalCenter = 'bottom';
    // label.text = '50%';


    // /**
    //  * Hand
    //  */

    // var hand = chart.hands.push(new am4charts.ClockHand());
    // hand.axis = axis2;
    // hand.innerRadius = am4core.percent(20);
    // hand.startWidth = 10;
    // hand.pin.disabled = true;
    // hand.value = 50;

    // hand.events.on('propertychanged', function (ev) {
    //   range0.endValue = ev.target.value;
    //   range1.value = ev.target.value;
    //   axis2.invalidate();
    // });

    // setInterval(function () {
    //   var value = Math.round(Math.random() * 100);
    //   label.text = value + '%';
    //   var animation = new am4core.Animation(hand, {
    //     property: 'value',
    //     to: value
    //   }, 1000, am4core.ease.cubicOut).start();
    // }, 2000);

  }

  ngOnDestroy() {
    this.zone.runOutsideAngular(() => {
      if (this.chart) {
        this.chart.dispose();
      }
    });
  }

  getGaugeChart() {
    this.isGuageconfigured = true;

    am4core.options.autoSetClassName = true;
    am4core.options.commercialLicense = true;
    hideCredits: true;
    // create chart
    const chart = am4core.create(this.wId, am4charts.GaugeChart);
    chart.innerRadius = am4core.percent(82);
    chart.startAngle = -225;
    chart.endAngle = 45;

    // Normal axis
    const axis = chart.xAxes.push(new am4charts.ValueAxis<am4charts.AxisRendererCircular>());
    axis.min = 0;
    axis.max = 100;
    axis.strictMinMax = true;
    axis.renderer.radius = am4core.percent(95);
    axis.renderer.inside = true;
    axis.renderer.line.strokeOpacity = 1;
    axis.renderer.ticks.template.disabled = false;
    axis.renderer.ticks.template.strokeOpacity = 1;
    axis.renderer.ticks.template.length = -8;
    axis.renderer.grid.template.disabled = true;
    axis.renderer.labels.template.radius = -25;
    axis.renderer.labels.template.adapter.add('text', function (text) {
      return text + '%';
    });

    /**
     * Axis for ranges
     */

    const colorSet = new am4core.ColorSet();

    const axis2 = chart.xAxes.push(new am4charts.ValueAxis<am4charts.AxisRendererCircular>());
    axis2.min = 0;
    axis2.max = 100;
    axis2.renderer.radius = am4core.percent(90);
    axis2.renderer.innerRadius = 10;
    axis2.strictMinMax = true;
    axis2.renderer.labels.template.disabled = true;
    axis2.renderer.ticks.template.disabled = true;
    axis2.renderer.grid.template.disabled = true;

    if (this.showThresholds) {
      const range0 = axis2.axisRanges.create();
      range0.value = 0;
      range0.endValue = 20;
      range0.axisFill.fillOpacity = 1;
      range0.axisFill.fill = am4core.color('#dc3545');
      range0.axisFill.zIndex = - 1;

      const range1 = axis2.axisRanges.create();
      range1.value = 20;
      range1.endValue = 40;
      range1.axisFill.fillOpacity = 1;
      range1.axisFill.fill = am4core.color('#ffc107');
      range1.axisFill.zIndex = -1;

      const range2 = axis2.axisRanges.create();
      range2.value = 40;
      range2.endValue = 60;
      range2.axisFill.fillOpacity = 1;
      range2.axisFill.fill = am4core.color('#28a745');
      range2.axisFill.zIndex = -1;

      const range3 = axis2.axisRanges.create();
      range3.value = 60;
      range3.endValue = 80;
      range3.axisFill.fillOpacity = 1;
      range3.axisFill.fill = am4core.color('#ffc107');
      range3.axisFill.zIndex = -1;

      const range4 = axis2.axisRanges.create();
      range4.value = 80;
      range4.endValue = 100;
      range4.axisFill.fillOpacity = 1;
      range4.axisFill.fill = am4core.color('#dc3545');
      range4.axisFill.zIndex = - 1;
    }

    /**
     * Label
     */

    const labelValue = chart.radarContainer.createChild(am4core.Label);
    labelValue.isMeasured = false;
    labelValue.fontSize = '1.5rem';
    labelValue.x = am4core.percent(50);
    labelValue.y = 80;
    labelValue.horizontalCenter = 'middle';
    labelValue.verticalCenter = 'bottom';
    labelValue.text = '50%';

    const d = new Date();
    const labelTS = chart.radarContainer.createChild(am4core.Label);
    labelTS.isMeasured = false;
    labelTS.fontSize = '0.75rem';
    labelTS.x = am4core.percent(50);
    labelTS.y = 95;
    labelTS.horizontalCenter = 'middle';
    labelTS.verticalCenter = 'bottom';
    labelTS.text = d.toLocaleString();

    // Hand
    const hand = chart.hands.push(new am4charts.ClockHand());
    hand.axis = axis2;
    hand.startWidth = 10;
    hand.pin.radius = 10;
    hand.value = 50;

    // Title
    if (this.gaugeTitle) {
      const subtitle = chart.titles.create();
      subtitle.text = this.selSignal;
      subtitle.fontSize = '.875rem';
      subtitle.marginBottom = 15
    }
    const title = chart.titles.create();
    title.text = (this.gaugeTitle) ? this.gaugeTitle : this.selSignal;
    title.fontSize = (this.gaugeTitle) ? '1.25rem' : '1.5rem';
    title.marginBottom = (this.gaugeTitle) ? 5 : 15;


    setInterval(function () {
      const d = new Date();
      const value = Math.round(Math.random() * 100);
      labelValue.text = value + '%';
      labelTS.text = d.toLocaleString();
      const animation = new am4core.Animation(hand, {
        property: 'value',
        to: value
      }, 1000, am4core.ease.cubicOut).start();
    }, 2000);
  }

  // open(config) {
  //   this.modalService.open(config).result.then((result) => {
  //     if (result === 'save') {

  //     }
  //   });
  // }

  onClickOfCustomizeGaugeChart() {
    // Open Chart configuration modal popup
    const modal = document.getElementById('configure-gauge-modal-' + this.wId);
    modal.style.display = 'block';
    this.customizeGaugeChart = document.getElementById('configure-gauge-modal-' + this.wId);
    window.onclick = (event) => {
      if (event.target === modal) {
        modal.style.display = 'none';
      }
    };
  }

  onClickOfCustomizeGaugeChartModalClose() {
    // Close modal popup
    this.customizeGaugeChart.style.display = 'none';
  }

  saveGaugeChartConfiguration() {
    this.customizeGaugeChart.style.display = 'none';
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
    this.getGaugeConfiguration();
    setTimeout(() => {
      this.getGaugeChart();
    }, 500);

  }

  getGaugeConfiguration() {

    // Call service to get configured chart data & to verify chart is configured or not
    // this.widgetService.getColumnChartConfiguration().subscribe(
    //   response => {
    //     this.isColumnChartConfigured = true;
    //   }, error => {
    //     this.isColumnChartConfigured = false;
    //   }
    // );
    this.isGuageconfigured = true;
  }

  toggleShowThresholds() {
    this.showThresholds = !this.showThresholds;
  }

}


