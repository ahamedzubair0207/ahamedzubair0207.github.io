import { Component, OnInit } from '@angular/core';

import { Select2OptionData } from 'ng2-select2';
import { Alert } from 'src/app/models/alert.model';
import { ActivatedRoute } from '@angular/router';
import { AlertsService } from 'src/app/services/alerts/alerts.service';
import { UserService } from 'src/app/services/users/userService';
import { UserGroup } from 'src/app/models/user-groups';
import { UserRole } from 'src/app/models/user-role';

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
  alertRuleSignalAssociatedAsset: any = {};
  absoluteThresholds: any[] = [];
  selectedSignals: string[] = [];
  userGroups: UserGroup[] = [];
  userRoles: UserRole[] = [];
  responsibilities: any[] = [];
  userResponsibities = {};

  constructor(private activeroute: ActivatedRoute, private alertsService: AlertsService, private userService: UserService) {

  }

  ngOnInit() {
    this.pageType = this.activeroute.snapshot.data['type'];
    this.activeroute.paramMap.subscribe(params => {
      this.curOrgId = params.get("curOrgId");
      this.curOrgName = params.get("curOrgName");
      this.orgId = params.get('orgId');
      this.getAbsoluteThreshold();
      this.getAlertRuleSignalAssociatedAssetByOrgId();
    });
    if (this.pageType.toUpperCase() === ' CREATE') {
      this.alert.alertRuleConfigurationMapping = [];
      // this.alert.alertRuleConfigurationMapping.push({})
    }
    this.selectedSignals = ['fa7b422d-2018-4fdb-ba50-0b4be9bf2735'];
    this.getAllUserGroups();
    this.getUserRoles();
    this.responsibilities = [
      { text: 'None', value: 'None' },
      { text: 'Responsibilty1', value: 'Responsibilty1' },
      { text: 'Responsibilty2', value: 'Responsibilty2' },
      { text: 'Responsibilty3', value: 'Responsibilty3' }
    ];

    this.alert.alertRuleUserGroup = [{ alertUserGroupId: "d042f524-d834-4a03-a21d-06bb3c743679", alertUserGroupRoleId: "1ed266f3-87f7-484a-b402-17a8b4a86836" }];
  }

  getUserRoles() {
    this.userService.getUserRoles()
      .subscribe(response => {
        console.log('user Roles ', response);
        this.userRoles = response;
        this.userRoles.forEach(tempRole => {
          this.userResponsibities[tempRole.roleId] = '';
        });
      });
    setTimeout(() => {
      this.userResponsibities['3e1427fe-792c-405b-92d4-196f37b13119'] = '1ed266f3-87f7-484a-b402-17a8b4a86836';
      this.userResponsibities['6f9b732f-d269-462b-90f3-13bdf285b082'] = '0fe90108-9073-45b4-b8fb-192ce722140d';
    }, 1000);
  }

  getAllUserGroups() {
    this.userService.getUserGroups()
      .subscribe(response => {
        this.userGroups = response;
      });
  }

  getAbsoluteThreshold() {
    this.absoluteThresholds = [

      {
        alertConfigurationId: '3A54142B-3453-4232-85C2-EEF4C62E4C77',
        alertConfigurationLabel: 'Low Critical',
        alertConfigurationValue: '',
        class: 'alert-danger text-center',
        active: false
      },
      {
        alertConfigurationId: 'C89DBBDF-E927-4044-9A76-F40EF1CE6611',
        alertConfigurationLabel: 'Low Warning',
        alertConfigurationValue: '',
        class: 'alert-warning text-center',
        active: false
      },
      {
        alertConfigurationId: '277B236A-C642-461A-A615-175EA69F2FAD',
        alertConfigurationLabel: 'TargetValue',
        alertConfigurationValue: '',
        class: 'alert-success text-center',
        active: false
      },
      {
        alertConfigurationId: '4FA3DDCA-56FA-47FA-9251-5D1D7C04C322',
        alertConfigurationLabel: 'High Warning',
        alertConfigurationValue: '',
        class: 'alert-warning text-center',
        active: false
      },
      {
        alertConfigurationId: '4E045A60-4BEE-44B4-9AF9-151725534706',
        alertConfigurationLabel: 'High Critical',
        alertConfigurationValue: '',
        class: 'alert-danger text-center',
        active: false
      },
    ];
  }

  getAlertRuleSignalAssociatedAssetByOrgId() {
    this.alertsService.getAlertRuleSignalAssociatedAssetByOrgId(this.orgId)
      .subscribe(response => {
        console.log('response ', response);
        this.alertRuleSignalAssociatedAsset = response;
      });
  }

  getUniqueValues(values: any[]) {
    return values.filter((value, index) => {
      return index === values.findIndex(obj => {
        return JSON.stringify(obj) === JSON.stringify(value);
      });
    });
  }

  onSignalSelectionChange(event, signalId: string) {
    console.log('onSignalSelectionChange ', event, signalId);
    if (!this.alert.alertRuleSignalMapping || this.alert.alertRuleSignalMapping.length === 0) {
      this.alert.alertRuleSignalMapping = [];
    }
    if (event && event.target.checked) {
      this.alert.alertRuleSignalMapping.push({ signalId: signalId });
    }
    else {
      let index = this.alert.alertRuleSignalMapping.findIndex(x => x.signalId === signalId);
      if (index >= 0) {
        this.alert.alertRuleSignalMapping.splice(index, 1)
      }
    }
    // this.alert.alertRuleSignalMapping = this.getUniqueValues(this.alert.alertRuleSignalMapping);
    console.log('this.alert.alertRuleSignalMapping ', this.alert.alertRuleSignalMapping);
  }

  onResponsibityChange(event, userGroup: UserGroup) {

    let allKeys = Object.keys(this.userResponsibities);

    this.alert.alertRuleUserGroup = [];
    allKeys.forEach(key => {
      if (this.userResponsibities[key]) {
        this.alert.alertRuleUserGroup.push({ alertUserGroupId: key, alertUserGroupRoleId: this.userResponsibities[key] });
      }
    });
    this.submitAlertRule();
  }

  submitAlertRule() {
    this.alert.alertRuleConfigurationMapping = [];
    this.absoluteThresholds.forEach(threshold => {
      if (threshold.alertConfigurationValue) {
        this.alert.alertRuleConfigurationMapping.push({
          active: threshold.active,
          alertConfigurationId: threshold.alertConfigurationId,
          alertConfigurationValue: threshold.alertConfigurationValue
        });
      }
    });

    console.log('onResponsibityChange ', this.alert);
  }

}
