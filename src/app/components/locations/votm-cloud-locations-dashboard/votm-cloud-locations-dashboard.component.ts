import { Component, OnInit, Input } from '@angular/core';
import { DbItem } from 'src/app/models/db-item';

@Component({
  selector: 'app-votm-cloud-locations-dashboard',
  templateUrl: './votm-cloud-locations-dashboard.component.html',
  styleUrls: ['./votm-cloud-locations-dashboard.component.scss']
})
export class VotmCloudLocationsDashboardComponent implements OnInit {
  locked: boolean = true;
  @Input() dbItem: DbItem;

  constructor() { }

  ngOnInit() {
  }

  toggleLock() {
    this.locked = !this.locked;
  }

}
