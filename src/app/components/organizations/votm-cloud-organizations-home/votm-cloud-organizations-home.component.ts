import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap } from "@angular/router";
import { OrganizationService } from '../../../services/organizations/organization.service';
import { BreadcrumbsService } from './../../../services/breadcrumbs/breadcrumbs.service';
import { Router } from '@angular/router';
import { VotmCloudConfimDialogComponent } from '../../shared/votm-cloud-confim-dialog/votm-cloud-confim-dialog.component';
import { Toaster } from '../../shared/votm-cloud-toaster/votm-cloud-toaster';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-votm-cloud-organizations-home',
  templateUrl: './votm-cloud-organizations-home.component.html',
  styleUrls: ['./votm-cloud-organizations-home.component.scss']
})
export class VotmCloudOrganizationsHomeComponent implements OnInit {

  organizationsList = [];
  svcLevels: any[] = [];
  sensorBlocks: any[] = [];
  cellularBlocks: any[] = [];
  curOrgId: string;
  curOrgName: string;
  orgToDelete: string;
  toaster: Toaster = new Toaster(this.toastr);
  isGetOrganizationsApiLoading = false;

  @ViewChild('confirmBox', null) confirmBox: VotmCloudConfimDialogComponent;
  orgNameToDelete: any;
  message: any;

  constructor(private orgservice: OrganizationService, private organizationService: OrganizationService, private route: ActivatedRoute, private toastr: ToastrService, private router: Router, private breadcrumbs : BreadcrumbsService) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.curOrgId = params.get('orgId');
      this.curOrgName = params.get('orgName');
      // console.log('ABCD ', params)
      this.fetchOrgList();
    });

    // console.log('ABCD ', this.route.snapshot.data['type'])
  }

  openConfirmDialog(delOrgId, name) {
    this.orgToDelete = delOrgId;
    this.message = `Do you want to delete the "${name}" organization?`;
    this.confirmBox.open();
    this.orgNameToDelete = name;
  }

  deleteOrganizationById(event) {
    console.log('event on close ', event);
    if (event) {
      this.orgservice.deleteOrganization(this.orgToDelete)
        .subscribe(response => {
          this.toaster.onSuccess(`You have deleted ${this.orgNameToDelete} successfully.`, 'Delete Success!');
          this.orgNameToDelete = '';
          this.fetchOrgList();

        }, error => {
          this.toaster.onFailure('Something went wrong on server. Please try after sometiime.', 'Delete Fail!');
          this.orgNameToDelete = '';
        });
    }
    this.orgToDelete = '';

  }

  getIntoContext(newOrg){
    this.breadcrumbs.addCrumb(newOrg);
    // breadcrum into context
    // [routerLink]="['/org/home', item.id, item.name]"
  }

  fetchOrgList() {
    this.isGetOrganizationsApiLoading = true;
    this.orgservice.getOrganizationTree(this.curOrgId).subscribe(
      response => {
        this.organizationsList = response.map(
          x => ({
            ...x,
            opened: true
          })
        );
        this.isGetOrganizationsApiLoading = false;
      }, error => {
        this.isGetOrganizationsApiLoading = false;
      }
    );
  }

  getOptionsListData(listData: string) {
    this.organizationService.getOptionsListData(listData)
      .subscribe(response => {
        if (listData === 'Service Levels') {
          this.svcLevels = [];
          this.svcLevels = response;
        }
        if (listData === 'Sensor Blocks') {
          this.sensorBlocks = [];
          this.sensorBlocks = response;
        }
        if (listData === 'Cellular Blocks') {
          this.cellularBlocks = [];
          this.cellularBlocks = response;
        }
      });
  }

}
