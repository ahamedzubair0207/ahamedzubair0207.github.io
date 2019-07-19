import { Component, OnInit } from '@angular/core';
import { OrganizationService} from '../services/Organization/organization.service';
@Component({
  selector: 'app-votm-cloud-organizations-home',
  templateUrl: './votm-cloud-organizations-home.component.html',
  styleUrls: ['./votm-cloud-organizations-home.component.scss']
})
export class VotmCloudOrganizationsHomeComponent implements OnInit {
organization:any;
public expandedIndex: number;
public expandedLoc: number;
  constructor(private orgservice: OrganizationService) {
    this.expandedIndex = -1;
    this.expandedLoc = -1;
   }
  
  ngOnInit() {
    this.getOrganization();
  }
  getOrganization(){
    this.organization = this.orgservice.getAllOrganization();
  }
  expandRow(index: number): void {
    debugger
    this.expandedIndex = index === this.expandedIndex ? -1 : index;
  }
  expandLoc(index: number): void {
    debugger
    this.expandedLoc = index === this.expandedLoc ? -1 : index;
  }
}
