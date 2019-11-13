import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { VotmCloudConfimDialogComponent } from '../../shared/votm-cloud-confim-dialog/votm-cloud-confim-dialog.component';
import { ToastrService } from 'ngx-toastr';
import { Toaster } from '../../shared/votm-cloud-toaster/votm-cloud-toaster';
import { TreeNode } from 'primeng/api'
import { SensorsService} from '../../../services/sensors/sensors.service';

@Component({
  selector: 'app-votm-cloud-sensors-home',
  templateUrl: './votm-cloud-sensors-home.component.html',
  styleUrls: ['./votm-cloud-sensors-home.component.scss']
})
export class VotmCloudSensorsHomeComponent implements OnInit {
  sensorList: Array<TreeNode> = [];
  curLocId: string;
  curLocName: string;
  parentOrgId: string;
  parentOrgName: string;
  curOrgId: string;
  curOrgName: string;
  sensorToDelete: string;
  message: string;

  @ViewChild('confirmBox', null) confirmBox: VotmCloudConfimDialogComponent;
  locNameToDelete: any;
  toaster: Toaster = new Toaster(this.toastr);
  searchedText: any;

  constructor(private sensorService: SensorsService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.getSensorTree();
    });
  }

  private getSensorTree(){
    this.sensorService.getSensorTree()
    .subscribe(response => {
      this.sensorList = [];
      if (response && response.length > 0) {
        this.sensorList = this.fillSensorsData(response);
      }
    });
  }

  fillSensorsData(sensors: any[]): TreeNode[] {
    let treeSensors: TreeNode[] = [];
    sensors.forEach(sensor => {
      let treeSensor: TreeNode = {};
      treeSensor.data = { id: sensor.sensorId, name: sensor.sensorName, type: 'Sensor' };
      // treeSensor.expanded = true;
      treeSensor.children = [];
      if (sensor.node && sensor.node.length > 0) {
        sensor.node.forEach(signal => {
          treeSensor.children.push({ data: { id: signal.signalId, name: signal.signalName, type: 'Signal' }, children: [] });
        });
      }
      treeSensors.push(treeSensor);
    });
    return treeSensors;
  }

  deleteSensorById(event) {}

}
