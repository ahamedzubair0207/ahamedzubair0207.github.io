import { DomSanitizer } from '@angular/platform-browser';
import { OverlayPanel } from 'primeng/overlaypanel';
import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { VotmCloudConfimDialogComponent } from '../../shared/votm-cloud-confim-dialog/votm-cloud-confim-dialog.component';
import { OrganizationService } from 'src/app/services/organizations/organization.service';
import { setData } from 'src/assets/js/data';
import { DbItem } from 'src/app/models/db-item';

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
  kioskMode: any;

  message: string;
  @ViewChild('confirmBox', null) confirmBox: VotmCloudConfimDialogComponent;
  @ViewChild('op', null) panel: OverlayPanel;
  userdashboardData: { id: string; templateName: string; dashboardName: string; dashboardHTML: any; }[];
  dashboardDataById: { act: string; title: string; dashboardName: string; dashboardHTML: any; };
  addDashboardArray: any;
  http: any;

  @Input() dbItem: DbItem;
  locked: boolean = true; // For Dashboard

  constructor(
    private modalService: NgbModal,
    private sanitizer: DomSanitizer,
    private organizationService: OrganizationService
  ) { }

  ngOnInit() {
    /*this.dashboardData = {
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
    this.getDashboardHTML('parkerdashboard', 0);*/
  }

  resizeDashboard(dbId: any) {
    console.log(dbId);
    $('#dashboardIconContainer-' + dbId).removeClass('position-relative');
    $('#dashboardIconContainer-' + dbId).addClass('dashboard-full-screen');
    $('#resizeDashboardId-' + dbId).hide();
    $('#actualDashboardId-' + dbId).show();
  }

  actualDashboard(dbId: any) {
    $('#dashboardIconContainer-' + dbId).removeClass('dashboard-full-screen');
    $('#dashboardIconContainer-' + dbId).addClass('position-relative');
    $('#actualDashboardId-' + dbId).hide();
    $('#resizeDashboardId-' + dbId).show();
  }

  

  toggleLock() {
    this.locked = !this.locked;
  }


  onClickOfKiosk() {
    // Open Chart configuration modal popup
    const modal = document.getElementById('configure-kiosk-mode-modal');
    modal.style.display = 'block';
    this.kioskMode = document.getElementById('configure-kiosk-mode-modal');
    window.onclick = (event) => {
      if (event.target === modal) {
        modal.style.display = 'none';
      }
    };
  }

  onClickOfKioskModalClose() {
    // Close modal popup
    this.kioskMode.style.display = 'none';
  }

  /*getDashboards() {
    // service to get all dashboards by userid

    this.userdashboardData = [
      {
        id: '1',
        templateName: 'Standard Organization Dashboard',
        dashboardName: 'Organization Dashboard',
        dashboardHTML: ''
      },
      {
        id: '2',
        templateName: 'Standard Location Dashboard',
        dashboardName: 'Location Dashboard',
        dashboardHTML: ''
      },
      {
        id: '3',
        templateName: 'Standard Asset Dashboard',
        dashboardName: 'Asset Dashboard',
        dashboardHTML: ''
      }
    ];

    return this.userdashboardData;
  }

  async getDashboardHTML(formName: string, index) {
    console.log(formName, '--getDashboardHTML functiona called');

    await this.organizationService.getDashboardHTML(formName)
      .subscribe(response => {
        console.log('return response---', response);
        this.userdashboardData[index].dashboardHTML = this.sanitizer.bypassSecurityTrustHtml(response);
        setTimeout( () => {
            // setData('Hello');
          }, 300);

      });
  }

  openAddDashboardModal(dashboardAct: string, dashboardId: any, dashboardNames: string) {

    // this.dashBoardDataByID = getDashboardById(dashboardId)
    console.log(dashboardNames);

    if (dashboardAct === 'editDashboard') {
      this.dashboardDataById = {
        act: 'edit',
        title : 'Edit Dashboard',
        dashboardName: dashboardNames,
        dashboardHTML: ''
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
    // return this.dashboardById = this.dashboardData.id;
  }*/

  // Dashboard lock toggle
  // toggleLock() {
  //   this.locked = !this.locked;
  // }

}
