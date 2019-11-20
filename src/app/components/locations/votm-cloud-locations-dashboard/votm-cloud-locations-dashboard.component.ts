import { Component, OnInit, Input } from '@angular/core';
import { DbItem } from 'src/app/models/db-item';

@Component({
  selector: 'app-votm-cloud-locations-dashboard',
  templateUrl: './votm-cloud-locations-dashboard.component.html',
  styleUrls: ['./votm-cloud-locations-dashboard.component.scss']
})
export class VotmCloudLocationsDashboardComponent implements OnInit {
  locked: boolean = true; // For Dashboard
  @Input() dbItem: DbItem;

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
    // this.parentLocked.emit(this.locked);
  }

}
