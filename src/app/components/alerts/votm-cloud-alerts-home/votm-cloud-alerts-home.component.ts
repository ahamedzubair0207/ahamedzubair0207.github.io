import { Component, OnInit, Input } from '@angular/core';
import { AlertsService } from 'src/app/services/alerts/alerts.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-votm-cloud-alerts-home',
  templateUrl: './votm-cloud-alerts-home.component.html',
  styleUrls: ['./votm-cloud-alerts-home.component.scss']
})
export class VotmCloudAlertsHomeComponent implements OnInit {

  @Input() alertList: any[];

  constructor(private router: Router) { }

  ngOnInit() {
  }

  onEditViewClick(alert, action) {
    this.router.navigate([`alert/${action}/${alert.alertId}`]);
  }

}
