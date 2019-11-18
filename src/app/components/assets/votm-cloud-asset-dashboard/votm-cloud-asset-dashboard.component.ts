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
  toggleLock() {
    this.locked = !this.locked;
  }

}
