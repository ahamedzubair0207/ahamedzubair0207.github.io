import { Component, OnInit, NgZone } from '@angular/core';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);
@Component({
  selector: 'app-votm-multi-gauge',
  templateUrl: './votm-multi-gauge.component.html',
  styleUrls: ['./votm-multi-gauge.component.scss']
})
export class VotmMultiGaugeComponent implements OnInit {

  private chart: am4charts.XYChart;
  id: any;

  constructor(private zone: NgZone) {
    this.id = Math.floor((Math.random() * 100) + 1);
   }

  ngOnInit() {
  }

  ngAfterViewInit() {
   
    let chart = am4core.create("chartdiv-multi-"+this.id, am4charts.GaugeChart);

    chart.paddingRight = 20;

    chart.innerRadius = -25;

    chart.startAngle = 0;
    chart.endAngle = 360;

    function createAxis(min, max, start, end, color) {
      var axis = chart.xAxes.push(new am4charts.ValueAxis<am4charts.AxisRendererCircular>());
      axis.min = min;
      axis.max = max;
      axis.strictMinMax = true;
      axis.renderer.useChartAngles = false;
      axis.renderer.startAngle = start;
      axis.renderer.endAngle = end;
      axis.renderer.minGridDistance = 100;

      axis.renderer.line.strokeOpacity = 1;
      axis.renderer.line.strokeWidth = 10;
      axis.renderer.line.stroke = am4core.color(color);
      
      axis.renderer.ticks.template.disabled = false;
      axis.renderer.ticks.template.stroke = am4core.color(color);
      axis.renderer.ticks.template.strokeOpacity = 1;
      axis.renderer.grid.template.disabled = true;
      axis.renderer.ticks.template.length = 10;
      
      return axis;
    }

    function createHand(axis) {
      var hand = chart.hands.push(new am4charts.ClockHand());
      hand.fill = axis.renderer.line.stroke;
      hand.stroke = axis.renderer.line.stroke;
      hand.axis = axis;
      hand.pin.disabled = true;
      hand.startWidth = 10;
      hand.endWidth = 0;
      hand.radius = am4core.percent(90);
      hand.innerRadius = am4core.percent(70);
      hand.value = 0;
      return hand;
    }

    var axis1 = createAxis(0, 100, -85, -5, "#EF6F6C");
    var axis2 = createAxis(0, 200, 5, 85, "#426A5A");
    var axis3 = createAxis(0, 20, 95, 175, "#7FB685");
    var axis4 = createAxis(0, 100, 185, 265, "#DDAE7E");

    var hand1 = createHand(axis1);
    var hand2 = createHand(axis2);
    var hand3 = createHand(axis3);
    var hand4 = createHand(axis4);

    setInterval(function() {
      hand1.showValue(Math.random() * axis1.max, 1000, am4core.ease.cubicOut);
      hand2.showValue(Math.random() * axis2.max, 1000, am4core.ease.cubicOut);
      hand3.showValue(Math.random() * axis3.max, 1000, am4core.ease.cubicOut);
      hand4.showValue(Math.random() * axis4.max, 1000, am4core.ease.cubicOut);
    }, 2000);
  
  }

  ngOnDestroy() {
    this.zone.runOutsideAngular(() => {
      if (this.chart) {
        this.chart.dispose();
      }
    });
  }

}


