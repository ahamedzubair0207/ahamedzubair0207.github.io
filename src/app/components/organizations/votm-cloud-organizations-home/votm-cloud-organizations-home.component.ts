import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap } from "@angular/router";
import { OrganizationService} from '../../../services/organizations/organization.service';
import { VotmCloudConfimDialogComponent } from '../../shared/votm-cloud-confim-dialog/votm-cloud-confim-dialog.component';

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
  
  @ViewChild('confirmBox', null) confirmBox: VotmCloudConfimDialogComponent;
  
  constructor(private orgservice: OrganizationService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params : ParamMap)=> {
      this.curOrgId = params.get("orgId");
      this.curOrgName = params.get("orgName");
      this.fetchOrgList();
    });
  }

  openConfirmDialog(delOrgId) {
    this.orgToDelete = delOrgId;
    this.confirmBox.open();
  }

  deleteOrganizationById(event, delOrgId) {
    console.log('event on close ', event);
    if (event) {
      this.orgservice.deleteOrganization(this.orgToDelete)
        .subscribe(response => {
          this.fetchOrgList();
        });
    }
    this.orgToDelete = '';
  }

  fetchOrgList(){
    this.orgservice.getOrganizationTree(this.curOrgId).subscribe(
      response => {
        this.organizationsList = response.map(
          x => ({
          ...x,
          opened:true
          })
        );
      }
    );
  }

}
