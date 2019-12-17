import { Component, OnInit, Input, ViewChild, ViewEncapsulation } from '@angular/core';
import { AlertsService } from 'src/app/services/alerts/alerts.service';
import { VotmCloudConfimDialogComponent } from '../../shared/votm-cloud-confim-dialog/votm-cloud-confim-dialog.component';
import { Router, ActivatedRoute } from '@angular/router';
import { Location as RouterLocation } from '@angular/common';
import { Toaster } from '../../shared/votm-cloud-toaster/votm-cloud-toaster';
import { ToastrService } from 'ngx-toastr';
import { Alert } from 'src/app/models/alert.model';
import {TableModule} from 'primeng/table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NavigationService } from 'src/app/services/navigation/navigation.service';


@Component({
  selector: 'app-votm-cloud-alerts-home',
  templateUrl: './votm-cloud-alerts-home.component.html',
  styleUrls: ['./votm-cloud-alerts-home.component.scss'],
})
export class VotmCloudAlertsHomeComponent implements OnInit {

  @Input() alertList: Array<TableModule> = [];
  @Input() orgId: string;
  message: any;
  alertToDelete: string;
  alertRuleToDelete: any;
  @ViewChild('confirmBox', null) confirmBox: VotmCloudConfimDialogComponent;
  toaster: Toaster = new Toaster(this.toastr);
  pageTypePopup: string;
  requiredData: any;
  accessScopeName: string;

  @Input() AlertorgName: string;
  AlertpageType: any;
  AlertcurOrgId: any;
  AlertcurOrgName: any;
  AlertorgId: string;
  AlertalertId: any;
  AlertaccessScopeName: any;

  curOrgId: string;
  curOrgName: string;
  alertId: string;
  alertModalTitle: string;
  isGetAlertsAPILoading = false;

  constructor(
    private router: Router,
    private alertsService: AlertsService,
    private toastr: ToastrService,
    private routerLocation: RouterLocation,
    private activatedRoute: ActivatedRoute,
    private ngbModal: NgbModal,
    private navigationService: NavigationService,
    ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      this.AlertcurOrgId = params.get('curOrgId');
      this.AlertcurOrgName = params.get('curOrgName');
      this.AlertorgId = params.get('orgId');
    });
  }

  onEditViewClick(alert, action) {
    this.router.navigate([`alert/${action}/${alert.alertId}`]);
  }

  onCreateAlertClick() {
    this.router.navigate([`alertRule/create`], { relativeTo: this.activatedRoute });
  }

  openConfirmDialog(delAlertId, name) {
    this.alertToDelete = delAlertId;
    this.message = `Do you want to delete the "${name}" Alert Rule?`;
    this.confirmBox.open();
    this.alertRuleToDelete = name;
  }

  deleteAlert(event) {
    if (event) {
      this.alertsService.deleteAlert(this.alertToDelete)
        .subscribe(response => {
          this.toaster.onSuccess(`You have deleted ${this.alertRuleToDelete} successfully.`, 'Delete Success!');
          this.alertRuleToDelete = '';

          this.alertsService.getAllAlertsByOrgId(this.orgId)
            .subscribe(response => {
              // console.log('response ', response);
              this.alertList = response;
            });

        }, error => {
          this.toaster.onFailure('Something went wrong on server. Please try after sometiime.', 'Delete Fail!');
          this.alertRuleToDelete = '';
        });
    }
    this.alertRuleToDelete = '';
  }

  getAllAlertsByOrgID(orgID) {
    this.alertList = [];
    this.isGetAlertsAPILoading = true;
    this.alertsService.getAllAlertsByOrgId(orgID)
    .subscribe(
      response => {
        this.alertList = response;
        console.log('this.alertList===', this.alertList);
        this.isGetAlertsAPILoading = false;
      },
      error => {
        this.isGetAlertsAPILoading = false;
      }
    );
  }

  openCreateAlert(content) {
    this.AlertpageType = 'Create';
    this.alertModalTitle = 'Alert Rule Configuration';
    this.AlertaccessScopeName = this.AlertorgName;
    this.AlertalertId = '';
    this.ngbModal.open(content, { size: 'xl', scrollable: true });
  }

  openEditAlert(content, alertId) {
    this.AlertpageType = 'Edit';
    this.alertModalTitle = 'Alert Rule Configuration';
    this.AlertaccessScopeName = this.AlertorgName;
    this.AlertalertId = alertId;
    this.ngbModal.open(content, { size: 'xl', scrollable: true });
  }

  openViewAlert(content, alertId) {
    this.AlertpageType = 'View';
    this.alertModalTitle = 'Alert Rule Configuration';
    this.AlertaccessScopeName = this.AlertorgName;
    this.AlertalertId = alertId;
    this.ngbModal.open(content, { size: 'xl', scrollable: true });
  }

  onCreateAlertRule() {
    this.alertsService.createAlertRuleEvent.emit();
    console.log('onCreateAlertRule this.AlertorgId===', this.AlertorgId);
    this.isGetAlertsAPILoading = true;
    setTimeout(
      () => {
        this.getAllAlertsByOrgID(this.AlertorgId);
      },  1000
    );

    this.ngbModal.dismissAll();
  }

}
