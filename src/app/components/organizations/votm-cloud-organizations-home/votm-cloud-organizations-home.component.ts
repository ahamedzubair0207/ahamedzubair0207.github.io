import { Component, OnInit } from '@angular/core';
import { OrganizationService} from '../../../services/organizations/organization.service';

@Component({
  selector: 'app-votm-cloud-organizations-home',
  templateUrl: './votm-cloud-organizations-home.component.html',
  styleUrls: ['./votm-cloud-organizations-home.component.scss']
})
export class VotmCloudOrganizationsHomeComponent implements OnInit {

  organizationsList = [];
  constructor(private orgservice: OrganizationService) { }

  ngOnInit() {
    this.getOrganization();
  }
  getOrganization(){
    this.organizationsList = this.orgservice.getAllOrganization().map(x => ({
      ...x,
      opened:false
    }));
  }
}
