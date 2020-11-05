// import { Component, OnInit, ViewChild, Input } from '@angular/core';
// import { DbItem } from 'src/app/models/db-item';
// import { VotmCloudConfimDialogComponent } from '../../shared/votm-cloud-confim-dialog/votm-cloud-confim-dialog.component';

import { DomSanitizer } from '@angular/platform-browser';
import { OverlayPanel } from 'primeng/overlaypanel';
import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { VotmCloudConfimDialogComponent } from '../../shared/votm-cloud-confim-dialog/votm-cloud-confim-dialog.component';
import { OrganizationService } from 'src/app/services/organizations/organization.service';
import { setData } from 'src/assets/js/data';
import { DbItem } from 'src/app/models/db-item';

@Component({
  selector: 'app-votm-cloud-assets-dashboard',
  templateUrl: './votm-cloud-assets-dashboard.component.html',
  styleUrls: ['./votm-cloud-assets-dashboard.component.scss']
})
export class VotmCloudAssetsDashboardComponent implements OnInit {
  addDashboardmodal: any;
  dashboardData: any;
  dashboardTemplates: {};
  delDashboardId: any;
  kioskMode: any;

  message: string;
  @ViewChild('confirmBox', null) confirmBox: VotmCloudConfimDialogComponent;
  // @ViewChild('op', null) panel: OverlayPanel;
  userdashboardData: { id: string; templateName: string; dashboardName: string; dashboardHTML: any; }[];
  dashboardDataById: { act: string; title: string; dashboardName: string; dashboardHTML: any; };
  addDashboardArray: any;
  http: any;

  @Input() dbItem: DbItem;
  locked: boolean = true;


  constructor() { }

  ngOnInit() {
  }

  resizeDashboard(dbId: any) {
    // console.log(dbId);
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

  // Dashboard lock toggle
  toggleLock(dbItem) {
    this.locked = !this.locked;
    if (this.locked) {
      // Hide Dashboards Edit & delete button
      $('#dashboard' + dbItem.dashboardId + '-tab > .dashboard-configure-icon').hide();
    } else {
      // Show Dashboards Edit & delete button
      $('#dashboard' + dbItem.dashboardId + '-tab > .dashboard-configure-icon').removeClass('d-none').show();
    }
    // this.parentLocked.emit(this.locked);
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

  // onClickOfKioskModalClose() {
  //   // Close modal popup
  //   this.kioskMode.style.display = 'none';
  // }
}
