import { Component, OnInit, ViewChild } from '@angular/core';
import { VotmCloudAdminNetworkMapComponent } from '../votm-cloud-admin-network-map/votm-cloud-admin-network-map.component';

@Component({
  selector: 'app-votm-cloud-admin-network-management',
  templateUrl: './votm-cloud-admin-network-management.component.html',
  styleUrls: ['./votm-cloud-admin-network-management.component.scss']
})
export class VotmCloudAdminNetworkManagementComponent implements OnInit {
  @ViewChild('networkmap', null) networkmap: VotmCloudAdminNetworkMapComponent;
  constructor() { }

  ngOnInit() {
  }

  onMapTabSelection() {
    if (this.networkmap && this.networkmap.map && this.networkmap.map.map)
      setTimeout(() => {
        this.networkmap.map.map.resize();
      }, 200);
  }
}
