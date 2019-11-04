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
      this.sensorList = response;
      console.log('sensor list ', this.sensorList);
    });
  }

  deleteSensorById(event) {}

}
