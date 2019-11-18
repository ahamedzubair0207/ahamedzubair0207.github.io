import { Component, OnInit, NgZone, Input } from '@angular/core';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { DbItem } from 'src/app/models/db-item';

am4core.useTheme(am4themes_animated);
@Component({
  selector: 'app-votm-simple-gauge',
  templateUrl: './votm-simple-gauge.component.html',
  styleUrls: ['./votm-simple-gauge.component.scss']
})
export class VotmSimpleGaugeComponent implements OnInit {

  private chart: am4charts.XYChart;
  id: any;
  @Input() locked: boolean;
  @Input() data: DbItem;

  constructor(private zone: NgZone) {
    this.id = Math.floor((Math.random() * 100) + 1);
   }

  ngOnInit() {
  }

  ngAfterViewInit() {

    am4core.options.autoSetClassName = true;

    // create chart
    let chart = am4core.create("chartdiv-simple-"+this.id, am4charts.GaugeChart);
    chart.innerRadius = am4core.percent(82);
    chart.startAngle = -225;
    chart.endAngle = 45;

    // Normal axis
    let axis = chart.xAxes.push(new am4charts.ValueAxis<am4charts.AxisRendererCircular>());
    axis.min = 0;
    axis.max = 100;
    axis.strictMinMax = true;
    axis.renderer.radius = am4core.percent(95);
    axis.renderer.inside = true;
    axis.renderer.line.strokeOpacity = 1;
    axis.renderer.ticks.template.disabled = false
    axis.renderer.ticks.template.strokeOpacity = 1;
    axis.renderer.ticks.template.length = -8;
    axis.renderer.grid.template.disabled = true;
    axis.renderer.labels.template.radius = -25;
    axis.renderer.labels.template.adapter.add("text", function (text) {
      return text + "%";
    })

    /**
     * Axis for ranges
     */

    let colorSet = new am4core.ColorSet();

    let axis2 = chart.xAxes.push(new am4charts.ValueAxis<am4charts.AxisRendererCircular>());
    axis2.min = 0;
    axis2.max = 100;
    axis2.renderer.radius = am4core.percent(90);
    axis2.renderer.innerRadius = 10
    axis2.strictMinMax = true;
    axis2.renderer.labels.template.disabled = true;
    axis2.renderer.ticks.template.disabled = true;
    axis2.renderer.grid.template.disabled = true;

    var range0 = axis2.axisRanges.create();
    range0.value = 0;
    range0.endValue = 20;
    range0.axisFill.fillOpacity = 1;
    range0.axisFill.fill = am4core.color("#dc3545");
    range0.axisFill.zIndex = - 1;

    var range1 = axis2.axisRanges.create();
    range1.value = 20;
    range1.endValue = 40;
    range1.axisFill.fillOpacity = 1;
    range1.axisFill.fill = am4core.color("#ffc107");
    range1.axisFill.zIndex = -1;

    var range2 = axis2.axisRanges.create();
    range2.value = 40;
    range2.endValue = 60;
    range2.axisFill.fillOpacity = 1;
    range2.axisFill.fill = am4core.color("#28a745");
    range2.axisFill.zIndex = -1;

    var range3 = axis2.axisRanges.create();
    range3.value = 60;
    range3.endValue = 80;
    range3.axisFill.fillOpacity = 1;
    range3.axisFill.fill = am4core.color("#ffc107");
    range3.axisFill.zIndex = -1;

    var range4 = axis2.axisRanges.create();
    range4.value = 80;
    range4.endValue = 100;
    range4.axisFill.fillOpacity = 1;
    range4.axisFill.fill = am4core.color("#dc3545");
    range4.axisFill.zIndex = - 1;

    /**
     * Label
     */

    let label = chart.radarContainer.createChild(am4core.Label);
    label.isMeasured = false;
    label.fontSize = "1.5rem";
    label.x = am4core.percent(50);
    label.y = 75; //am4core.percent(100);
    label.horizontalCenter = "middle";
    label.verticalCenter = "bottom";
    label.text = "50%";

    // Hand
    let hand = chart.hands.push(new am4charts.ClockHand());
    hand.axis = axis2;
    hand.startWidth = 10;
    hand.pin.radius = 10;
    hand.value = 50;

    // Title
    var title = chart.titles.create();
    title.text = "Signal Name";
    title.fontSize = "1.5rem";
    title.marginBottom = 15

    setInterval(function () {
      let value = Math.round(Math.random() * 100);
      label.text = value + "%";
      let animation = new am4core.Animation(hand, {
        property: "value",
        to: value
      }, 1000, am4core.ease.cubicOut).start();
    }, 2000);

    // let chart = am4core.create("chartdiv-simple-"+this.id, am4charts.GaugeChart);

    // chart.paddingRight = 20;

    // chart.innerRadius = -25;

    // var axis = chart.xAxes.push(new am4charts.ValueAxis<am4charts.AxisRendererCircular>());
    // axis.min = 0;
    // axis.max = 100;
    // axis.strictMinMax = true;
    // axis.renderer.grid.template.stroke = new am4core.InterfaceColorSet().getFor("background");
    // axis.renderer.grid.template.strokeOpacity = 0.3;

    // var colorSet = new am4core.ColorSet();

    // var range0 = axis.axisRanges.create();
    // range0.value = 0;
    // range0.endValue = 50;
    // range0.axisFill.fillOpacity = 1;
    // range0.axisFill.fill = colorSet.getIndex(0);
    // range0.axisFill.zIndex = - 1;

    // var range1 = axis.axisRanges.create();
    // range1.value = 50;
    // range1.endValue = 80;
    // range1.axisFill.fillOpacity = 1;
    // range1.axisFill.fill = colorSet.getIndex(2);
    // range1.axisFill.zIndex = -1;

    // var range2 = axis.axisRanges.create();
    // range2.value = 80;
    // range2.endValue = 100;
    // range2.axisFill.fillOpacity = 1;
    // range2.axisFill.fill = colorSet.getIndex(4);
    // range2.axisFill.zIndex = -1;

    // var hand = chart.hands.push(new am4charts.ClockHand());

    // // using chart.setTimeout method as the timeout will be disposed together with a chart
    // chart.setTimeout(randomValue, 2000);

    // function randomValue() {
    //     hand.showValue(Math.random() * 100, 1000, am4core.ease.cubicOut);
    //     chart.setTimeout(randomValue, 2000);
    // }

  }

  ngOnDestroy() {
    this.zone.runOutsideAngular(() => {
      if (this.chart) {
        this.chart.dispose();
      }
    });
  }

}


