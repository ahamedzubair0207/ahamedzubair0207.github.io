import { Component, OnInit, Input } from '@angular/core';
import { DbItem } from 'src/app/models/db-item';

@Component({
  selector: 'app-votm-cloud-asset-dashboard',
  templateUrl: './votm-cloud-asset-dashboard.component.html',
  styleUrls: ['./votm-cloud-asset-dashboard.component.scss']
})
export class VotmCloudAssetDashboardComponent implements OnInit {

  addDashboardmodal: any;
  dashboardData: any;
  dashboardTemplates: {};
  delDashboardId: any;
  kioskMode: any;

  @Input() dbItem: DbItem;
  locked: boolean = true; // For Dashboard

  constructor() { }

  ngOnInit() {
  }

  // Dashboard lock toggle
  toggleLock(dbItem) {
    this.locked = !this.locked;
    if (this.locked) {
      // Hide Dashboards Edit & delete button
      $('#dashboard' + dbItem.dashboardId + '-tab > .dashboard-configure-icon').hide();
    } else {
      // Show Dashboards Edit & delete button
      $('#dashboard' + dbItem.dashboardId + '-tab > .dashboard-configure-icon').removeClass('d-none').show();
    }
  }

}
