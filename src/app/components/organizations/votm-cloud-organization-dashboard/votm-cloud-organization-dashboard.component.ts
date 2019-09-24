import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { VotmCloudConfimDialogComponent } from '../../shared/votm-cloud-confim-dialog/votm-cloud-confim-dialog.component';

@Component({
  selector: 'app-votm-cloud-organization-dashboard',
  templateUrl: './votm-cloud-organization-dashboard.component.html',
  styleUrls: ['./votm-cloud-organization-dashboard.component.scss']
})
export class VotmCloudOrganizationDashboardComponent implements OnInit {

  addDashboardmodal: any;
  dashboardData: any;
  dashboardTemplates: {};
  delDashboardId: any;

  message: string;
  @ViewChild('confirmBox', null) confirmBox: VotmCloudConfimDialogComponent;
  userdashboardData: { id: string; templateName: string; dashboardName: string; }[];

  constructor(
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.dashboardData = {
      act: 'add',
      title : 'Dashboard',
      id: '1',
      templateName: 'Standard Organization Dashboard'
    };
    this.dashboardData = this.getDashboards();

    this.dashboardTemplates = [
      {
        id: '1',
        templateName: 'Standard Organization Dashboard'
      },
      {
        id: '2',
        templateName: 'Standard Location Dashboard'
      },
      {
        id: '3',
        templateName: 'Standard Asset Dashboard'
      }
    ];
    console.log(this.dashboardTemplates);
    console.log(this.dashboardData);
  }

  getDashboards() {
    this.userdashboardData = [
      {
        id: '1',
        templateName: 'Standard Organization Dashboard',
        dashboardName: 'Organization Dashboard'
      },
      {
        id: '2',
        templateName: 'Standard Location Dashboard',
        dashboardName: 'Location Dashboard'
      },
      {
        id: '3',
        templateName: 'Standard Asset Dashboard',
        dashboardName: 'Asset Dashboard'
      }
    ];

    return this.userdashboardData;
  }

  openAddDashboardModal(dashboardAct: string) {

    if (dashboardAct === 'editDashboard') {
      this.dashboardData = {
        act: 'edit',
        title : 'Configure Dashboard',
        dashboardName: 'Organization Dashboard'

      };
    } else if (dashboardAct === 'addDashboard') {
      this.dashboardData = {
        act: 'create',
        title : 'Create Dashboard',
        dashboardName: ''
      };
    }
    console.log('dashboard---', this.dashboardData);
    // Get the modal
    let addDashboardmodal = document.getElementById('addDashboardModalWrapper');
    addDashboardmodal.style.display = 'block';
    this.addDashboardmodal = document.getElementById('addDashboardModalWrapper');
    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName('close')[0];

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
      if (event.target === addDashboardmodal) {
        addDashboardmodal.style.display = 'none';
      }
    };

  }
  closeAddDashboardModal(event: string) {
    console.log('==', event);
    this.addDashboardmodal.style.display = 'none';
    // if (event === 'save') {
    //
    // } else if (event === 'create') {
    //
    // }
  }

  openConfirmDialog(delDashboardId, deshboardName) {
    this.delDashboardId = delDashboardId;
    this.message = `Do you want to delete the "${deshboardName}" Dashboard?`;
    this.confirmBox.open();
  }

  deleteOrganizationDashboardById(event) {
    console.log('deleteOrganizationDashboardById===', event);
    if (event) {
      // delete dashboard service goes here
    }
  }

}
