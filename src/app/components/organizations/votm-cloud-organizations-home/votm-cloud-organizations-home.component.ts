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
  curOrgId: string;
  curOrgName: string;
  orgToDelete: string;
  toaster: Toaster = new Toaster(this.toastr);

  @ViewChild('confirmBox', null) confirmBox: VotmCloudConfimDialogComponent;
  orgNameToDelete: any;
  message: any;

  constructor(private orgservice: OrganizationService, private route: ActivatedRoute, private toastr: ToastrService, private router: Router, private breadcrumbs : BreadcrumbsService) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.curOrgId = params.get("orgId");
      this.curOrgName = params.get("orgName");
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

  deleteOrganizationById(event, delOrgId) {
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
    this.orgservice.getOrganizationTree(this.curOrgId).subscribe(
      response => {
        this.organizationsList = response.map(
          x => ({
            ...x,
            opened: true
          })
        );
      }
    );
  }

}
