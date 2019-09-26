import { OverlayPanel } from 'primeng/overlaypanel';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { VotmCloudConfimDialogComponent } from '../../shared/votm-cloud-confim-dialog/votm-cloud-confim-dialog.component';
import { OrganizationService } from 'src/app/services/organizations/organization.service';

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
  @ViewChild('op', null) panel: OverlayPanel;
  userdashboardData: { id: string; templateName: string; dashboardName: string; dashboardHTML: any; }[];
  dashboardDataById: { act: string; title: string; dashboardName: string; dashboardHTML: any; };
  addDashboardArray: any;
  http: any;
  dashboardResponseHTML: any;

  constructor(
    private modalService: NgbModal,
    private organizationService: OrganizationService
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
    // service to get all dashboards by userid

    this.userdashboardData = [
      {
        id: '1',
        templateName: 'Standard Organization Dashboard',
        dashboardName: 'Organization Dashboard',
        dashboardHTML: '<h1>temp dashbaord html</h1>'
      },
      {
        id: '2',
        templateName: 'Standard Location Dashboard',
        dashboardName: 'Location Dashboard',
        dashboardHTML: this.getDashboardHTML('parkerdashboard')
      },
      {
        id: '3',
        templateName: 'Standard Asset Dashboard',
        dashboardName: 'Asset Dashboard',
        dashboardHTML: this.getDashboardHTML('parkerdashboard')
      }
    ];

    return this.userdashboardData;
  }

  async getDashboardHTML(formName) {
    console.log(formName, '--getDashboardHTML');
    // return this.http.get('./assets/dashboards/' + formName  + '.html', {responseType: 'text'});
    // await this.organizationService.getDashboardHTML(formName)
    //   .subscribe(response => {
    //     console.log(response);
    //     this.dashboardResponseHTML = response;
    //     console.log(this.dashboardResponseHTML);
    //   });
    // console.log('response====', this.dashboardResponseHTML);
    // return this.dashboardResponseHTML;
    this.organizationService.getDashboardHTML(formName);
  }

  openAddDashboardModal(dashboardAct: string, dashboardId: any, dashboardNames: string) {

    // this.dashBoardDataByID = getDashboardById(dashboardId)
    console.log(dashboardNames);

    if (dashboardAct === 'editDashboard') {
      this.dashboardDataById = {
        act: 'edit',
        title : 'Edit Dashboard',
        dashboardName: dashboardNames,
        dashboardHTML: this.getDashboardHTML('parkerdashboard')
      };
    } else if (dashboardAct === 'addDashboard') {
      this.dashboardDataById = {
        act: 'create',
        title : 'Create Dashboard',
        dashboardName: '',
        dashboardHTML: ''
      };
    }
    console.log('dashboardDataById---', this.dashboardDataById);
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

  onDashboardFormSubmit() {
    console.log('onDashboardFormSubmit', this.dashboardDataById);
    this.addDashboardArray = {
      id: '4',
      templateName: 'Standard Asset Dashboard',
      dashboardName: this.dashboardDataById.dashboardName
    };
    this.dashboardData.push(this.addDashboardArray);
    console.log('this.dashboardData---added', this.dashboardData);

    this.closeAddDashboardModal(true);
  }

  closeAddDashboardModal(event: any) {
    console.log('==', event);
    this.addDashboardmodal.style.display = 'none';
    // if (event === 'save') {
    //
    // } else if (event === 'create') {
    //
    // }
  }

  openConfirmDialog(delDashboardId, dashboardName) {
    this.delDashboardId = delDashboardId;
    this.message = `Do you want to delete the "${dashboardName}" Dashboard?`;
    this.confirmBox.open();
  }

  deleteOrganizationDashboardById(event) {
    console.log('deleteOrganizationDashboardById===', event);
    if (event) {
      // delete dashboard service goes here
    }
  }

  getDashboardById(dashboardId: any) {
    this.dashboardData = this.getDashboards();
    //return this.dashboardById = this.dashboardData.id;
  }

}
