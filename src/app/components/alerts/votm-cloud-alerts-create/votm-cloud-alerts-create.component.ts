import { Component, OnInit } from '@angular/core';
import { DatePipe, Location as RouterLocation } from '@angular/common';
import { Select2OptionData } from 'ng2-select2';
import { Toaster } from '../../shared/votm-cloud-toaster/votm-cloud-toaster';
import { ToastrService } from 'ngx-toastr';
import { Alert, AlertRuleUserGroup } from 'src/app/models/alert.model';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertsService } from 'src/app/services/alerts/alerts.service';
import { UserService } from 'src/app/services/users/userService';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
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
  modal: any;
  alertRuleSignalAssociatedAsset: any = {};
  absoluteThresholds: any[] = [];
  selectedSignals: string[] = [];
  userGroups: UserGroup[] = [];
  userRoles: UserRole[] = [];
  responsibilities: any[] = [];
  userResponsibities = {};
  assetsChecked = {};
  ruleTypes: any[] = [];
  metricTypes: any[] = [];
  accessScopes: any[] = [];
  alertId: string;
  notifyUsers: any[] = [];
  userGroupSubscribers: any[] = [];

  constructor(private activeroute: ActivatedRoute, private modalService: NgbModal,
    private routerLocation: RouterLocation, private toastr: ToastrService,
    private route: Router, private alertsService: AlertsService, private userService: UserService) {

  }

  ngOnInit() {
    this.pageType = this.activeroute.snapshot.data['type'];
    this.activeroute.paramMap.subscribe(params => {
      this.curOrgId = params.get("curOrgId");
      this.curOrgName = params.get("curOrgName");
      this.orgId = params.get('orgId');
      this.alertId = params.get('alertId');
      if (this.alertId) {
        this.alertsService.getAlertByAlertId(this.alertId)
          .subscribe(response => {
            console.log('Alert Record', response);
            this.alert = response;
            this.alert.alertRuleUserGroup[0].userId = 'ea8a69d9-50a1-4773-a7ef-324cd33b3296';
            this.userResponsibities = [];
            this.alert.alertRuleUserGroup.forEach(alertRuleUserGroup => {
              if (alertRuleUserGroup.userId) {
                this.userResponsibities[alertRuleUserGroup.userId] = alertRuleUserGroup.alertUserGroupRoleId;
              } else {
                this.userResponsibities[alertRuleUserGroup.userGroupId] = alertRuleUserGroup.alertUserGroupRoleId;
              }
            });
          });
        this.ALertRuleUserGroupSubscriber();
      } else {
        this.userGroupSubscribers = [];
      }
      // this.alertId ='';
      this.getAbsoluteThreshold();
      this.getAlertRuleSignalAssociatedAssetByOrgId();
      this.getAccessScopeByOrgId();
    });
    this.getMeticTypes();
    this.getUserGroupRoles();
    this.getAllUserGroups();

    this.ruleTypes = [
      {
        id: '3D97A28E-7D8E-4C7D-98CE-251909FED1A9',
        name: 'Absolute'
      },
      {
        id: 'B45A2094-C4D6-4D36-B26C-3A9F195C6D6F',
        name: 'Relative'
      }
    ]
    if (this.pageType.toUpperCase() === ' CREATE') {
      this.alert.alertRuleConfigurationMapping = [];
      // this.alert.alertRuleConfigurationMapping.push({})
    }
    // this.selectedSignals = ['fa7b422d-2018-4fdb-ba50-0b4be9bf2735'];

    // this.getUserRoles();
    this.responsibilities = [
      { text: 'None', value: 'None' },
      { text: 'Responsibilty1', value: 'Responsibilty1' },
      { text: 'Responsibilty2', value: 'Responsibilty2' },
      { text: 'Responsibilty3', value: 'Responsibilty3' }
    ];

    // this.alert.alertRuleUserGroup = [{ alertUserGroupId: "d042f524-d834-4a03-a21d-06bb3c743679", alertUserGroupRoleId: "1ed266f3-87f7-484a-b402-17a8b4a86836" }];


  }

  onUserSelection(user) {
    console.log('Notified User ', user);
    let found: boolean = false;
    if (!this.alert.alertRuleUserGroup) {
      this.alert.alertRuleUserGroup = [];
    }
    this.alert.alertRuleUserGroup.forEach(usergroup => {
      if (usergroup.userId === user.userId) {
        found = true;
      }
    });
    if (!found) {
      this.userResponsibities[user.userId] = '';
      this.alert.alertRuleUserGroup.push({ alertUserGroupRoleId: '', name: user.firstName + ' ' + user.lastName, userId: user.userId });
    }
    console.log(' this.alert.alertRuleUserGroup ', this.alert.alertRuleUserGroup);
  }

  onUserGroupSelection(userGroup) {
    console.log('Notified User ', userGroup);
    let found: boolean = false;
    if (!this.alert.alertRuleUserGroup) {
      this.alert.alertRuleUserGroup = [];
    }
    this.alert.alertRuleUserGroup.forEach(tempUsergroup => {
      if (tempUsergroup.userGroupId === userGroup.userGroupId) {
        found = true;
      }
    });
    if (!found) {
      this.userResponsibities[userGroup.userGroupId] = '';
      this.alert.alertRuleUserGroup.push({ alertUserGroupRoleId: '', name: userGroup.userGroupName, userGroupId: userGroup.userGroupId });
    }
    console.log(' this.alert.alertRuleUserGroup ', this.alert.alertRuleUserGroup);
  }

  getMeticTypes() {
    this.alertsService.getAllMetricTypes()
      .subscribe(response => {
        console.log('getMeticTypes ', response);
        this.metricTypes = [];
        if (response && response.length > 0) {
          response.forEach(item => {
            this.metricTypes.push({ id: item.alertTypeId, name: item.alertTypeName });
          });
        }
      });
  }
  /* 
    // getUserGroupRoles() {
    //   this.alertsService.getUserGroupRoles()
    //     .subscribe(response => {
    //       console.log('getUserGroupRoles ', response);
    //     });
    // } */

  getAccessScopeByOrgId() {
    this.alertsService.getAccessScopeByOrgId(this.orgId)
      .subscribe(response => {
        console.log('getAccessScopeByOrgId ', response);
        // accessScopes
        this.accessScopes = [];
        if (response && response.length > 0) {
          response.forEach(item => {
            this.accessScopes.push({ id: item.id, name: item.name });
          });
        }
      });
  }

  getUserGroupRoles() {
    this.alertsService.getUserGroupRoles()
      .subscribe(response => {
        console.log('user Roles ', response);
        this.userRoles = response;
        // this.userRoles.forEach(tempRole => {
        //   this.userResponsibities[tempRole.roleId] = '';
        // });
      });
    setTimeout(() => {
      // this.userResponsibities['3e1427fe-792c-405b-92d4-196f37b13119'] = '1ed266f3-87f7-484a-b402-17a8b4a86836';
      // this.userResponsibities['6f9b732f-d269-462b-90f3-13bdf285b082'] = '0fe90108-9073-45b4-b8fb-192ce722140d';
    }, 1000);
  }

  getAllUserGroups() {
    this.userService.getUserGroups()
      .subscribe(response => {
        this.userGroups = response;
      });
  }

  ALertRuleUserGroupSubscriber() {
    this.alertsService.ALertRuleUserGroupSubscriber(this.alertId)
      .subscribe(response => {
        let tempUserGroupSubscribers: AlertRuleUserGroup[] = response;
        this.userGroupSubscribers = [];
        for (let i = 0; i < tempUserGroupSubscribers.length; i++) {
          if (tempUserGroupSubscribers[i].userGroupId || tempUserGroupSubscribers[i].userId) {
            this.userGroupSubscribers.push(tempUserGroupSubscribers[i]);
          }
        }
        console.log('userGroupSubscribers ', this.userGroupSubscribers);
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
    this.alertsService.getAlertRuleSignalAssociatedAssetByOrgId(this.orgId, this.alertId)
      .subscribe(response => {
        console.log('response ', response);
        this.alertRuleSignalAssociatedAsset = response;
        this.createAssetCheckedProperties();
      });
  }

  createAssetCheckedProperties() {
    if (this.alertRuleSignalAssociatedAsset && this.alertRuleSignalAssociatedAsset.locations && this.alertRuleSignalAssociatedAsset.locations.length > 0) {
      this.alertRuleSignalAssociatedAsset.locations.forEach(location => {
        this.assetsChecked[location.locationId] = false;
        if (location.assets && location.assets.length > 0) {
          location.assets.forEach(asset => {
            this.assetsChecked[asset.assetId] = false;
          })
        }
      })
    }
  }

  onAssetChecked(event, asset) {
    if (asset && asset.signals && asset.signals.length > 0) {
      if (event.target.checked) {
        asset.signals.forEach(signal => {
          this.alert.alertRuleSignalMapping.push({ signalId: signal.signalId });
          this.selectedSignals.push(signal.signalId);
        });
      } else {
        asset.signals.forEach(signal => {
          let index = this.alert.alertRuleSignalMapping.findIndex(x => x.signalId === signal.signalId);
          if (index >= 0) {
            this.alert.alertRuleSignalMapping.splice(index, 1);
          }
          let ind = this.selectedSignals.indexOf(signal.signalId);
          if (ind >= 0) {
            this.selectedSignals.splice(ind, 1);
          }
        });
      }
    }
    console.log(this.selectedSignals);
  }

  getUniqueValues(values: any[]) {
    return values.filter((value, index) => {
      return index === values.findIndex(obj => {
        return JSON.stringify(obj) === JSON.stringify(value);
      });
    });
  }

  onSignalSelectionChange(event, signalId: string, asset) {
    console.log('onSignalSelectionChange ', event, signalId);
    if (!this.alert.alertRuleSignalMapping || this.alert.alertRuleSignalMapping.length === 0) {
      this.alert.alertRuleSignalMapping = [];
    }
    if (event && event.target.checked) {
      this.alert.alertRuleSignalMapping.push({ signalId: signalId });
      this.selectedSignals.push(signalId);
    }
    else {
      let index = this.alert.alertRuleSignalMapping.findIndex(x => x.signalId === signalId);
      if (index >= 0) {
        this.alert.alertRuleSignalMapping.splice(index, 1);
      }
      index = this.selectedSignals.indexOf(signalId);
      this.selectedSignals.splice(index, 1);
    }

    this.selectUnselectAssetCheckbox(asset);
    // this.alert.alertRuleSignalMapping = this.getUniqueValues(this.alert.alertRuleSignalMapping);
    console.log('this.alert.alertRuleSignalMapping ', this.alert.alertRuleSignalMapping);
  }

  selectUnselectAssetCheckbox(asset) {
    if (asset && asset.signals && asset.signals.length > 0) {
      let tempSignalArray = [];

      asset.signals.forEach(signal => {
        tempSignalArray.push(signal.signalId);
      });
      let checker = (arr, target) => target.every(v => arr.includes(v));

      let isAssetSelected = checker(this.selectedSignals, tempSignalArray);
      console.log(isAssetSelected, this.selectedSignals, tempSignalArray);
      if (isAssetSelected) {
        this.assetsChecked[asset.assetId] = true;
      } else {
        let isSignalFound: boolean = false;
        asset.signals.forEach(signal => {
          this.selectedSignals.forEach(signalId => {
            if (signal.signalId === signalId) {
              isSignalFound = true;
            }
          });
        });
        if (isSignalFound) {
          // intermediate
        } else {
          this.assetsChecked[asset.assetId] = false;
        }
      }
    }
  }

  onResponsibityChangeForUserGroup(event, userGroup: AlertRuleUserGroup) {
    console.log('onResponsibityChangeForUserGroup ', event)
    this.alert.alertRuleUserGroup.forEach(alertRuleUserGroup => {
      if (alertRuleUserGroup.userGroupId === userGroup.userGroupId) {
        console.log(event.target.value);
        alertRuleUserGroup.alertUserGroupRoleId = event.target.value;
      }
    });
    console.log(' this.alert.alertRuleUserGroup ', this.alert.alertRuleUserGroup);
   
  }

  onResponsibityChangeForUserId(event, userGroup: AlertRuleUserGroup) {
    console.log('onResponsibityChangeForUserId ', event, userGroup)
    this.alert.alertRuleUserGroup.forEach(alertRuleUserGroup => {
      if (alertRuleUserGroup.userId === userGroup.userId) {
        console.log(event.target.value);
        alertRuleUserGroup.alertUserGroupRoleId = event.target.value;
      }
    });
    console.log(' this.alert.alertRuleUserGroup ', this.alert.alertRuleUserGroup);
    // this.alert.alertRuleUserGroup.forEach(alertRuleUserGroup=>{
    //   if(alertRuleUserGroup.)
    // })

    // let allKeys = Object.keys(this.userResponsibities);

    // this.alert.alertRuleUserGroup = [];
    // allKeys.forEach(key => {
    //   if (this.userResponsibities[key]) {
    //     this.alert.alertRuleUserGroup.push({ alertUserGroupId: key, alertUserGroupRoleId: this.userResponsibities[key] });
    //   }
    // });
  }

  onAlertRuleSubmit() {
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
    this.alertsService.createAlertRule(this.alert)
      .subscribe(response => {
        console.log('response ', response);
      })

    console.log('onResponsibityChange ', this.alert);
  }

  notifiedUserModal() {
    // Get the modal
    var modal = document.getElementById("userModal");
    modal.style.display = "block";
    this.modal = document.getElementById("userModal");
    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    }
  }

  onAddNotifiedUsersClick() {
    if (!this.notifyUsers || this.notifyUsers.length === 0) {
      this.userService.getAllUsers()
        .subscribe(response => {
          console.log('response ', response);
          this.notifyUsers = [];
          this.notifyUsers = response;
        });
    }
  }

  onCancelClick(event) {
    this.routerLocation.back();
  }

  onLockClick() {
    if (this.pageType.toLowerCase() === 'view') {
      this.route.navigate([`preferences/edit`])
    } else {
      this.route.navigate([`preferences/view`])
    }
  }
}
