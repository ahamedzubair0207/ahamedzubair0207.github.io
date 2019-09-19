import { Component, OnInit } from '@angular/core';

import { Select2OptionData } from 'ng2-select2';
import { Alert } from 'src/app/models/alert.model';

@Component({
  selector: 'app-votm-cloud-alerts-create',
  templateUrl: './votm-cloud-alerts-create.component.html',
  styleUrls: ['./votm-cloud-alerts-create.component.scss']
})
export class VotmCloudAlertsCreateComponent implements OnInit {
  alert: Alert = new Alert();

  constructor() {

  }

  ngOnInit() {
  }

}
