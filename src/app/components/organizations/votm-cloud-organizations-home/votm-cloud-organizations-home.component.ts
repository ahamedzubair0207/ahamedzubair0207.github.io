import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { OrganizationService} from '../../../services/organizations/organization.service';

@Component({
  selector: 'app-votm-cloud-organizations-home',
  templateUrl: './votm-cloud-organizations-home.component.html',
  styleUrls: ['./votm-cloud-organizations-home.component.scss']
})
export class VotmCloudOrganizationsHomeComponent implements OnInit {

  organizationsList = [];
  curOrgId : string;
  curOrgName : string;
  constructor(private orgservice: OrganizationService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.curOrgId = this.route.snapshot.paramMap.get("orgId");
    this.curOrgName = this.route.snapshot.paramMap.get("orgName");

    this.orgservice.getOrganizationTree(this.curOrgId).subscribe(
      response => {
        this.organizationsList = response.map(
          x => ({
          ...x,
          opened:false
          })
        );
      }
    );

  }

}
