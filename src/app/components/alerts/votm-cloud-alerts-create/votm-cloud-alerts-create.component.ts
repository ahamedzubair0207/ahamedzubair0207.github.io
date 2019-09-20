import { Component, OnInit } from '@angular/core';

import { Select2OptionData } from 'ng2-select2';
import { Alert } from 'src/app/models/alert.model';
import { ActivatedRoute } from '@angular/router';
import { AlertsService } from 'src/app/services/alerts/alerts.service';

@Component({
  selector: 'app-votm-cloud-alerts-create',
  templateUrl: './votm-cloud-alerts-create.component.html',
  styleUrls: ['./votm-cloud-alerts-create.component.scss']
})
export class VotmCloudAlertsCreateComponent implements OnInit {
  alert: Alert = new Alert();
  pageType: string;
  curOrgId: string;
  curOrgName: string;
  orgId: string;
  alertRuleSignalAssociatedAsset: any;

  constructor(private activeroute: ActivatedRoute, private alertsService: AlertsService) {

  }

  ngOnInit() {
    this.pageType = this.activeroute.snapshot.data['type'];
    this.activeroute.paramMap.subscribe(params => {
      this.curOrgId = params.get("curOrgId");
      this.curOrgName = params.get("curOrgName");
      this.orgId = params.get('orgId');

      this.getAlertRuleSignalAssociatedAssetByOrgId();
    });
    if (this.pageType.toUpperCase() === ' CREATE') {
      this.alert.alertRuleConfigurationMapping = [];
      // this.alert.alertRuleConfigurationMapping.push({})
    }
  }

  getAlertRuleSignalAssociatedAssetByOrgId() {
    this.alertsService.getAlertRuleSignalAssociatedAssetByOrgId(this.orgId)
      .subscribe(response => {
        console.log('response ', response);
        this.alertRuleSignalAssociatedAsset = response;
      });
  }

}
