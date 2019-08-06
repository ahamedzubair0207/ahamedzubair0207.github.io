import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from "@angular/router";
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
    

    this.route.paramMap.subscribe((params : ParamMap)=> {
      this.curOrgId = params.get("orgId");
      this.curOrgName = params.get("orgName");
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

    });

  }

}
