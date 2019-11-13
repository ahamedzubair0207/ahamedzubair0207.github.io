import { Component, OnInit, NgZone, Input, Output } from '@angular/core';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import { TreeNode } from 'primeng/api'
import { ActivatedRoute, ParamMap } from '@angular/router';
import { SensorsService } from '../../../../services/sensors/sensors.service';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import { ToastrService } from 'ngx-toastr';
import { Toaster } from 'src/app/components/shared/votm-cloud-toaster/votm-cloud-toaster';

@Component({
  selector: 'app-votm-cloud-admin-sensor-home',
  templateUrl: './votm-cloud-admin-sensor-home.component.html',
  styleUrls: ['./votm-cloud-admin-sensor-home.component.scss']
})
export class VotmCloudAdminSensorHomeComponent implements OnInit {

  allSensors: {};
  private chart: am4charts.PieChart;
  sensorsStatusData: any;
  sensorsBettreyLevelData: any;
  sensorsSignalLevelData: any;
  sensorList: Array<TreeNode> = [];
  curLocId: string;
  curLocName: string;
  parentOrgId: string;
  parentOrgName: string;
  curOrgId: string;
  curOrgName: string;
  batteryValue: any;
  signalStrength: string;
  toaster: Toaster = new Toaster(this.toastr);
  // Flag to check sensor list is from Organization or from n/w mangement
  // app-votm-cloud-admin-sensor-home == selector called in Org create component with originList="originListView"
  @Input() originList: any;
  OrgId: string;

  constructor(
    private sensorService: SensorsService,
    private route: ActivatedRoute,
    private zone: NgZone,
    private toastr: ToastrService
    ) { }

  ngOnInit() {
    // this.getAllGateways();
    this.route.paramMap.subscribe((params: ParamMap) => {

      this.curOrgId = params.get('curOrgId');
      this.OrgId = params.get('orgId');
      console.log('sensor originList==========', this.originList);
      console.log('sensor curOrgId==========', this.curOrgId);
      console.log('sensor OrgId==========', this.OrgId);

      if (this.OrgId && this.OrgId !== '') {
        // Fetch sensors of Organization
        this.getSensorTreeByTypeAndId('organization', this.OrgId);
        console.log('org sensor list');

      } else  {
        // Fetch all sensors
        this.getSensorTree();
      }

    });
  }

  private getSensorTreeByTypeAndId(type, typeId) {
    this.sensorService.getSensorDetailsByTypeAndId(type, typeId)
      .subscribe(response => {
        this.sensorList = [];
        if (response && response.length > 0) {
          this.sensorList = this.fillSensorsData(response);
          console.log('org sensor list ==', this.sensorList);

        }
      });
  }

  private getSensorTree() {
    this.sensorService.getSensorTree()
      .subscribe(response => {
        this.sensorList = [];
        if (response && response.length > 0) {
          this.sensorList = this.fillSensorsData(response);
          console.log('sensor list ==', this.sensorList);

        }
      });
  }

  fillSensorsData(sensors: any[]): TreeNode[] {
    let treeSensors: TreeNode[] = [];
    sensors.forEach(sensor => {
      let treeSensor: TreeNode = {};

      treeSensor.data = {
        id: sensor.sensorId,
        name: sensor.sensorName,
        locationId: sensor.parentLocationId,
        locationName: sensor.parentLocationName,
        sensorType: sensor.sensorType,
        serialNumber: sensor.serialNumber,
        description: sensor.description,
        modelNumber: sensor.modelNumber,
        sensorStatusName: sensor.sensorStatusName,
        gwSerialNumber: sensor.gwSerialNumber,
        isLink: sensor.isLink,
        gwLocationId: sensor.gwLocationId,
        gwLocationName: sensor.gwLocationName,
        type: 'Sensor'
      };
      // treeSensor.expanded = true;
      treeSensor.data.batteryValue = '';
      treeSensor.data.signalStrength = '';
      treeSensor.children = [];
      if (sensor.node && sensor.node.length > 0) {
        sensor.node.forEach(signal => {
          treeSensor.children.push({
            data: {
              id: signal.signalId,
              name: signal.signalName,
              isLink: sensor.isLink,
              type: 'Signal'
            },
            children: []
          });

          // Push Signal Battery Value from child battery signal
          if (signal.signalName !== null &&
            // signal.signalId === 'e9326142-068b-494b-bff7-421a44fa0cae' ||
            // signal.signalName.toLowerCase() === 'battery'
            signal.signalId === 'e9326142-068b-494b-bff7-421a44fa0cae'
            ) {
              treeSensor.data.batteryValue = signal.signalValue;
          }

          // Push Signal Battery Value from child battery signal
          if (signal.signalName !== null &&
            // signal.signalId === 'fa7b422d-2018-4fdb-ba50-0b4be9bf2735' ||
            // signal.signalName.toLowerCase() === 'signal'
            signal.signalId === 'fa7b422d-2018-4fdb-ba50-0b4be9bf2735'
            ) {
              treeSensor.data.signalStrength = signal.signalValue;
          }

        });
      }
      treeSensors.push(treeSensor);
    });
    // console.log('sensors ', treeSensors);
    return treeSensors;
  }

  checkRowDisplay(sensorObj) {
    // e9326142-068b-494b-bff7-421a44fa0cae == battery
    // fa7b422d-2018-4fdb-ba50-0b4be9bf2735 == signal
    if (
        sensorObj.name !== null &&
        // (sensorObj.id !== 'e9326142-068b-494b-bff7-421a44fa0cae' || sensorObj.name.toLowerCase() !== 'battery') &&
        // (sensorObj.id !== 'fa7b422d-2018-4fdb-ba50-0b4be9bf2735' || sensorObj.name.toLowerCase() !== 'signal')
        (sensorObj.id !== 'e9326142-068b-494b-bff7-421a44fa0cae') &&
        (sensorObj.id !== 'fa7b422d-2018-4fdb-ba50-0b4be9bf2735')
    ) {
      return true;
    }

    return false;
  }

  unlinkSensor(sensorId) {
    const sensorObj = {
      isLink: false,
    };
    this.sensorService.updateSensorLinkStatus(sensorId, sensorObj)
      .subscribe(response => {
        this.toaster.onSuccess('Sensor Unlinked Successfully', 'Updated');
        this.getSensorTreeByTypeAndId('organization', this.OrgId);
      }, error => {
        this.toaster.onFailure('Something went wrong. Please try again', 'Fail');
    });
  }

  getAllGateways() {
    this.allSensors = [
      {
        sensorname: 'Pressure - E3000012',
        serialnumber: 'E3000012',
        type: 'Pressure',
        gw: 'Compressor',
        battery: '2.91',
        signal: '18%',
        status: ''
      },
      {
        sensorname: 'Temprature - E3000047',
        serialnumber: 'E3000047',
        type: 'Temprature',
        gw: 'Pump Room',
        battery: '2.53',
        signal: '13%',
        status: ''
      },
      {
        sensorname: 'Vibration - E3000053',
        serialnumber: 'E3000053',
        type: 'Vibration',
        gw: 'Production',
        battery: '3.54',
        signal: '25%',
        status: ''
      },
      {
        sensorname: 'Humidity - E3000072',
        serialnumber: 'E3000072',
        type: 'Humidity',
        gw: 'Test Room',
        battery: '3.18',
        signal: '58%',
        status: ''
      }
    ];
  } // get allGetWays fun end

  ngAfterViewInit() {

    this.sensorsStatusData = [
      {
        type: 'Online',
        percent: 70,
        color: '#67b7dc',
        subs: ''
      },
      {
        type: 'Offline',
        percent: 30,
        color: '#6794dc',
        subs: ''
      }];

    this.sensorsPieChartGraph('sensor-status-chartdiv-pie-sliced', this.sensorsStatusData);

    this.sensorsBettreyLevelData = [
      {
        type: 'Good',
        percent: 50,
        color: '#67b7dc',
        subs: ''
      },
      {
        type: 'Low',
        percent: 30,
        color: '#6794dc',
        subs: ''
      },
      {
        type: 'Replace',
        percent: 20,
        color: '#6784dc',
        subs: ''
      }
    ];
    this.sensorsPieChartGraph('bettery-level-chartdiv-pie-sliced', this.sensorsBettreyLevelData);

    this.sensorsSignalLevelData = [
      {
        type: 'Great',
        percent: 60,
        color: '#67b7dc',
        subs: ''
      },
      {
        type: 'Good',
        percent: 30,
        color: '#6794dc',
        subs: ''
      },
      {
        type: 'Low',
        percent: 10,
        color: '#6784dc',
        subs: ''
      }
    ];
    this.sensorsPieChartGraph('signal-level-chartdiv-pie-sliced', this.sensorsSignalLevelData);
  }

  ngOnDestroy() {
    this.zone.runOutsideAngular(() => {
      if (this.chart) {
        this.chart.dispose();
      }
    });
  }

  sensorsPieChartGraph(id, typesData) {
    let chart = am4core.create(id, am4charts.PieChart);
    // Set data
    var selected;
    // var types = [
    //   {
    //     type: 'Online',
    //     percent: 70,
    //     color: chart.colors.getIndex(0),
    //   },
    //   {
    //     type: 'Offline',
    //     percent: 30,
    //     color: chart.colors.getIndex(1),
    //   }];
    var types = typesData;
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

  }

}
