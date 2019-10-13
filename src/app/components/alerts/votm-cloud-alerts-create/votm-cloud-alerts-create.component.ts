import { Component, OnInit, ViewChild } from '@angular/core';
import { DatePipe, Location as RouterLocation } from '@angular/common';
import { Select2OptionData } from 'ng2-select2';
import { Toaster } from '../../shared/votm-cloud-toaster/votm-cloud-toaster';
import { ToastrService } from 'ngx-toastr';
import { Alert, AlertRuleUserGroup } from 'src/app/models/alert.model';
import { VotmCloudConfimDialogComponent } from '../../shared/votm-cloud-confim-dialog/votm-cloud-confim-dialog.component';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertsService } from 'src/app/services/alerts/alerts.service';
import { UserService } from 'src/app/services/users/userService';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { UserGroup } from 'src/app/models/user-groups';
import { UserRole } from 'src/app/models/user-role';
import { config } from 'rxjs';
import { NavigationService } from 'src/app/services/navigation/navigation.service';
import { TreeNode } from 'primeng/api';

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
  treeSignalAssociationList: TreeNode[] = [];
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

  //Ahamed Code
  public message: string;
  closeResult: string;
  previousURLToNavigate: string;
  previousUrl: any;
  subscriptions: any;
  toaster: Toaster = new Toaster(this.toastr);
  accessScopeName: string;
  uomTypes: any[] = [];
  @ViewChild('confirmBox', null) confirmBox: VotmCloudConfimDialogComponent;
  searchSignalText: any;



  constructor(
    private activeroute: ActivatedRoute,
    private modalService: NgbModal,
    private routerLocation: RouterLocation,
    private toastr: ToastrService,
    private route: Router,
    private alertsService: AlertsService,
    private userService: UserService,
    private navigationService: NavigationService) {

  }

  ngOnInit() {
    this.pageType = this.activeroute.snapshot.data['type'];
    this.activeroute.paramMap.subscribe(params => {
      this.curOrgId = params.get('curOrgId');
      this.curOrgName = params.get('curOrgName');
      this.orgId = params.get('orgId');
      this.alertId = params.get('alertId');
      this.alert.organizationScopeId = this.orgId;
      this.getAbsoluteThreshold();
      this.navigationService.lastOrganization.subscribe(response => {
        this.accessScopeName = response;
      });
      if (this.alertId) {
        this.alertsService.getAlertByAlertId(this.alertId)
          .subscribe(response => {
            // console.log('Alert Record', response);
            this.alert = response;
            // this.alert.alertRuleUserGroup[0].userId = 'ea8a69d9-50a1-4773-a7ef-324cd33b3296';
            this.userResponsibities = [];
            this.alert.UomTypeId = response.uomTypeId;
            this.alert.alertRuleTypeId = response.alertRuleTypeId ? response.alertRuleTypeId.toUpperCase() : null;
            if (this.alert.alertRuleUserGroup && this.alert.alertRuleUserGroup.length > 0) {
              this.alert.alertRuleUserGroup.forEach(alertRuleUserGroup => {
                if (alertRuleUserGroup.userId) {
                  this.userResponsibities[alertRuleUserGroup.userId] = alertRuleUserGroup.alertUserGroupRoleId;
                } else {
                  this.userResponsibities[alertRuleUserGroup.userGroupId] = alertRuleUserGroup.alertUserGroupRoleId;
                }
              });
            }

            if (this.alert.alertRuleConfigurationMapping && this.alert.alertRuleConfigurationMapping.length) {
              this.alert.alertRuleConfigurationMapping.forEach(configuration => {
                this.absoluteThresholds.forEach(threshold => {
                  if (threshold.alertConfigurationId.toLowerCase() === configuration.alertConfigurationId.toLowerCase()) {
                    threshold.alertConfigurationValue = configuration.alertConfigurationValue;
                    threshold.active = configuration.active;
                  }
                });
              });
            }

            this.selectedSignals = [];
            this.alert.alertRuleSignalMapping.forEach(signalMapping => {
              this.selectedSignals.push(signalMapping.signalMappingId);
            });
            this.selectedSignals = this.getUniqueValues(this.selectedSignals);
            this.createAssetCheckedProperties();
            setTimeout(() => {
              this.checkIfParentsArechecked();
            });
            // this.selectSignals();
            console.log('NG ONINIT')
          });
        this.ALertRuleUserGroupSubscriber();
      } else {
        this.userGroupSubscribers = [];
      }
      // this.alertId ='';
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
    ];
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

  ngAfterViewInit() {
    // this.createAssetCheckedProperties();
  }

  onUserSelection(user) {
    // console.log('Notified User ', user);
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
      this.alert.alertRuleUserGroup.push({ alertUserGroupRoleId: '', name: user.firstName + ' ' + user.lastName, userId: user.userId, userEmail: user.emailId });
    }
    // console.log(' this.alert.alertRuleUserGroup ', this.alert.alertRuleUserGroup);
  }

  onUserGroupSelection(userGroup) {
    // console.log('Notified User ', userGroup);
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
    // console.log(' this.alert.alertRuleUserGroup ', this.alert.alertRuleUserGroup);
  }

  getMeticTypes() {
    this.alertsService.getAllMetricTypes()
      .subscribe(response => {
        // console.log('getMeticTypes ', response);
        this.metricTypes = [];
        if (response && response.length > 0) {
          response.forEach(item => {
            this.metricTypes.push({ id: item.uomtypeId, name: item.uomtypeName });
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
        // console.log('getAccessScopeByOrgId ', response);
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
        // console.log('user Roles ', response);
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
        // console.log('userGroupSubscribers ', this.userGroupSubscribers);
      });
  }

  getAbsoluteThreshold() {
    this.absoluteThresholds = [
      {
        // For 3D97A28E-7D8E-4C7D-98CE-251909FED1A9    Absolute ---- Ahamed
        // Common for Every Alert Type

        alertConfigurationId: '364F5CB4-B725-4BD9-8DAA-B3B365123454',
        alertConfigurationLabel: 'Low Critical',   // 364F5CB4-B725-4BD9-8DAA-B3B365123454    Low Critical
        alertConfigurationValue: '',
        class: 'alert-danger text-center',
        active: false
      },
      {
        alertConfigurationId: 'A307C43E-6C4B-47B1-8427-E13788CF4257',
        alertConfigurationLabel: 'Low Warning',  // A307C43E-6C4B-47B1-8427-E13788CF4257    Low Warning
        alertConfigurationValue: '',
        class: 'alert-warning text-center',
        active: false
      },
      {
        alertConfigurationId: 'F4410D8E-3BA9-40C1-9D23-9414BCA3DABD',
        alertConfigurationLabel: 'Baseline',  // F4410D8E-3BA9-40C1-9D23-9414BCA3DABD    Baseline
        alertConfigurationValue: '',
        class: 'alert-success text-center',
        active: false
      },
      {
        alertConfigurationId: '6531DB3F-39CC-4459-8680-AAB303A5B188',
        alertConfigurationLabel: 'High Warning',  // 6531DB3F-39CC-4459-8680-AAB303A5B188    High Warning
        alertConfigurationValue: '',
        class: 'alert-warning text-center',
        active: false
      },
      {
        alertConfigurationId: '4E045A60-4BEE-44B4-9AF9-151725534706',
        alertConfigurationLabel: 'High Critical',   // 4E045A60-4BEE-44B4-9AF9-151725534706    High Critical
        alertConfigurationValue: '',
        class: 'alert-danger text-center',
        active: false
      },

    ];
  }

  getAlertRuleSignalAssociatedAssetByOrgId() {
    this.alertsService.getAlertRuleSignalAssociatedAssetByOrgId(this.orgId, this.alertId)
      .subscribe(response => {
        // console.log('response ', response);
        this.alertRuleSignalAssociatedAsset = response;
        this.createAssetCheckedProperties();
        setTimeout(() => {
          this.checkIfParentsArechecked();
        });

      });
  }

  createAssetCheckedProperties() {
    console.log('this.alertRuleSignalAssociatedAsset ', this.alertRuleSignalAssociatedAsset);

    if (!this.selectedSignals) {
      this.selectedSignals = [];
    }
    if (this.alertRuleSignalAssociatedAsset) {
      this.treeSignalAssociationList = [];
      if (this.alertRuleSignalAssociatedAsset &&
        this.alertRuleSignalAssociatedAsset.locations &&
        this.alertRuleSignalAssociatedAsset.locations.length > 0) {


        this.alertRuleSignalAssociatedAsset.locations.forEach(location => {
          this.assetsChecked[location.locationId] = false;
          let treeNode: TreeNode = {};
          treeNode.data = { id: location.locationId, label: `Organization > ${location.locationName}`, value: location, parent: null };
          treeNode.children = [];
          treeNode.expanded = true;
          location.signals.forEach(signal => {
            treeNode.children.push({ expanded: true, data: { id: signal.signalMappingId, label: signal.signalName, value: signal, parent: location } });
          });
          this.treeSignalAssociationList.push(treeNode);

          // this.selectUnselectAssetCheckbox(location);

          if (location.assets && location.assets.length > 0) {
            let tempTreeNode: TreeNode = {};
            location.assets.forEach(asset => {
              this.assetsChecked[asset.assetId] = false;
              tempTreeNode.data = { id: asset.assetId, label: `${treeNode.label} > ${asset.assetName}`, value: asset, parent: location };
              tempTreeNode.children = [];
              tempTreeNode.expanded = true;
              asset.signals.forEach(signal => {
                tempTreeNode.children.push({ expanded: true,data: { id: signal.signalMappingId, label: signal.signalName, value: signal, parent: asset } });
              });
              this.treeSignalAssociationList.push(tempTreeNode);
              // this.selectUnselectAssetCheckbox(asset);
            });
          }
        });
      }
    }

    this.selectSignals();
    console.log(' this.treeSignalAssociationList ', this.treeSignalAssociationList);
  }

  onAssetCollapse(event) {
    console.log('onAssetCollapse', event);
    let asset = event.node.data.value;
    this.selectUnselectAssetCheckbox(asset);
  }

  onAssetExpand(event) {
    console.log('onAssetExpand', event);
    let asset = event.node.data.value;
    this.selectUnselectAssetCheckbox(asset);
  }

  onSignalFilter(){
    console.log(this.searchSignalText)
    // this.treeSignalAssociationList.forEach
  }

  checkIfParentsArechecked() {
    if (this.alertRuleSignalAssociatedAsset) {
      if (this.alertRuleSignalAssociatedAsset &&
        this.alertRuleSignalAssociatedAsset.locations &&
        this.alertRuleSignalAssociatedAsset.locations.length > 0) {
        this.alertRuleSignalAssociatedAsset.locations.forEach(location => {
          this.selectUnselectAssetCheckbox(location);
          if (location.assets && location.assets.length > 0) {
            location.assets.forEach(asset => {
              this.selectUnselectAssetCheckbox(asset);
            });
          }
        });
      }
    }
  }

  selectSignals() {
    if (this.selectedSignals && this.selectedSignals.length > 0) {
      this.selectedSignals.forEach(signalId => {
        this.assetsChecked[signalId] = true;
      })
    }
  }

  onAssetChecked(event, value, parent) {
    // console.log('value ', value)
    let asset;
    if (value) {
      if (value.hasOwnProperty('signalId')) {
        // Signal
        this.onSignalSelectionChange(event, value.signalMappingId, parent);
      } else {
        if (value.hasOwnProperty('assets') && value.hasOwnProperty('signals')) {
          // Location
          asset = value
        } else {
          //ASset
          asset = value
        }
      }
    }
    if (!this.alert.alertRuleSignalMapping || this.alert.alertRuleSignalMapping.length === 0) {
      this.alert.alertRuleSignalMapping = [];
    }


    if (asset && asset.signals && asset.signals.length > 0) {
      if (event.target.checked) {
        asset.signals.forEach(signal => {
          if (this.selectedSignals.indexOf(signal.signalMappingId) < 0) {
            this.alert.alertRuleSignalMapping.push({ signalMappingId: signal.signalMappingId });
            this.selectedSignals.push(signal.signalMappingId);
            this.assetsChecked[signal.signalMappingId] = true;
          }
        });
      } else {
        asset.signals.forEach(signal => {
          let index = this.alert.alertRuleSignalMapping.findIndex(x => x.signalMappingId === signal.signalMappingId);
          if (index >= 0) {
            this.alert.alertRuleSignalMapping.splice(index, 1);
            this.assetsChecked[signal.signalMappingId] = false;
          }
          let ind = this.selectedSignals.indexOf(signal.signalMappingId);
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

  onSignalSelectionChange(event, signalMappingId: string, asset) {
    // console.log('ASSET ', asset);
    // console.log('onSignalSelectionChange ', event, signalMappingId);
    if (!this.alert.alertRuleSignalMapping || this.alert.alertRuleSignalMapping.length === 0) {
      this.alert.alertRuleSignalMapping = [];
    }
    if (event && event.target.checked) {
      this.alert.alertRuleSignalMapping.push({ signalMappingId: signalMappingId });
      this.selectedSignals.push(signalMappingId);
    } else {
      let index = this.alert.alertRuleSignalMapping.findIndex(x => x.signalMappingId === signalMappingId);
      if (index >= 0) {
        this.alert.alertRuleSignalMapping.splice(index, 1);
      }
      index = this.selectedSignals.indexOf(signalMappingId);
      this.selectedSignals.splice(index, 1);
    }

    this.selectUnselectAssetCheckbox(asset);
    // console.log(this.selectedSignals);
    // this.alert.alertRuleSignalMapping = this.getUniqueValues(this.alert.alertRuleSignalMapping);
    // console.log('this.alert.alertRuleSignalMapping ', this.alert.alertRuleSignalMapping);
  }

  selectUnselectAssetCheckbox(asset) {
    if (asset && asset.signals && asset.signals.length > 0) {
      let tempSignalArray = [];

      asset.signals.forEach(signal => {
        tempSignalArray.push(signal.signalMappingId);
      });
      let checker = (arr, target) => target.every(v => arr.includes(v));

      let isAssetSelected = checker(this.selectedSignals, tempSignalArray);



      let checkBoxId = asset.assetId ? asset.assetId : asset.locationId;
      let checkbox: any = document.getElementById(checkBoxId);
      if (isAssetSelected) {
        console.log('Interminate', checkbox);
        if (checkbox) {
          checkbox.indeterminate = false;
          checkbox.checked = true;
        }
        asset.assetId ? this.assetsChecked[asset.assetId] = true : this.assetsChecked[asset.locationId] = true;
      } else {
        let isSignalFound: boolean = false;
        asset.signals.forEach(signal => {
          this.selectedSignals.forEach(signalMappingId => {
            if (signal.signalMappingId === signalMappingId) {
              isSignalFound = true;
            }
          });
        });
        if (isSignalFound) {
          // interminate
          // console.log('Interminate', checkbox);
          asset.assetId ? this.assetsChecked[asset.assetId] = false : this.assetsChecked[asset.locationId] = false;
          if (checkbox) {
            checkbox.indeterminate = true;
            // console.log('selected signals ', asset.locationId, this.selectedSignals, tempSignalArray, isAssetSelected, 'interminate');
          }
        } else {
          asset.assetId ? this.assetsChecked[asset.assetId] = false : this.assetsChecked[asset.locationId] = false;
          if (checkbox) {
            checkbox.indeterminate = false;
            // console.log('checkbox ', checkbox.checked)
          }

          asset.assetId ? this.assetsChecked[asset.assetId] = false : this.assetsChecked[asset.locationId] = false;
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
    console.log('onResponsibityChangeForUserId ', event, userGroup);
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
      if (threshold.alertConfigurationValue && threshold.active) {
        this.alert.alertRuleConfigurationMapping.push({
          active: threshold.active,
          alertConfigurationId: threshold.alertConfigurationId,
          alertConfigurationValue: threshold.alertConfigurationValue,
          alertRuleTypeId: this.alert.alertRuleTypeId
        });
      }
    });
    if (this.alertId) {
      this.alertsService.updateAlertRule(this.alert)
        .subscribe(response => {
          this.toaster.onSuccess('Successfully Updated', 'Saved');
          console.log('response ', response);
          this.routerLocation.back();
        }, error => {
          this.toaster.onFailure('Something went wrong. Please fill the form correctly', 'Fail');
        });
    } else {
      this.alertsService.createAlertRule(this.alert)
        .subscribe(response => {
          this.toaster.onSuccess('Successfully saved', 'Saved');
          console.log('response ', response);
          this.routerLocation.back();
        }, error => {
          this.toaster.onFailure('Something went wrong. Please fill the form correctly', 'Fail');
        });
    }
    console.log('onResponsibityChange ', this.alert);
  }

  notifiedUserModal() {
    // Get the modal
    var modal = document.getElementById('userModal');
    modal.style.display = 'block';
    this.modal = document.getElementById('userModal');
    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName('close')[0];

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
      if (event.target == modal) {
        modal.style.display = 'none';
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
      this.route.navigate([`alertRule/view/${this.alertId}`]);
    } else {
      this.route.navigate([`alertRule/view/${this.alertId}`]);
    }
  }


  // Ahamed Code
  deleteAlertById(event) {
    if (event) {
      this.alertsService.deleteAlert(this.alert.alertRuleId)
        .subscribe(response => {
          this.toaster.onSuccess(`You have deleted ${this.alert.alertRuleName} successfully.`, 'Delete Success!');
          // this.route.navigate([`loc/home/${this.parentLocId}/${this.parentLocName}`])
          this.routerLocation.back();
        }, error => {
          this.toaster.onFailure('Something went wrong on server. Please try after sometiime.', 'Delete Fail!');
        });
    }
  }

  onUserGroupDelete(userGroupSubscriber) {
    console.log(userGroupSubscriber, this.alert.alertRuleUserGroup);
    let found: boolean;
    let count: number;
    let isUserId: boolean;
    if (userGroupSubscriber) {
      if (userGroupSubscriber.userId) {
        isUserId = true;
      }
      this.alert.alertRuleUserGroup.forEach((userGroup, index) => {
        if (isUserId) {
          if (userGroup.userId === userGroupSubscriber.userId) {
            found = true;
            count = index;
          }
        } else {
          if (userGroup.userGroupId === userGroupSubscriber.userGroupId) {
            found = true;
            count = index;
          }
        }
      });
      if (found) {
        this.alert.alertRuleUserGroup.splice(count, 1);
        // console.log(count);
      }
    }
    console.log(userGroupSubscriber, this.alert.alertRuleUserGroup);
  }
}
