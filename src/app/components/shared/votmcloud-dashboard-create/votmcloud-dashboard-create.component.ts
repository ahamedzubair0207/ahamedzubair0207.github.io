import { UserProfile } from './../../../models/userprofile.model';
import { SharedService } from './../../../services/shared.service';
import { DashboardService } from './../../../services/dasboards/dashboard.service';
import { Component, OnInit, Output, EventEmitter, ViewChild, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DashBoard } from 'src/app/models/dashboard.model';
import { DbTplItem } from 'src/app/models/db-tpl-item';
import * as moment from 'moment-timezone';
@Component({
  selector: 'app-votmcloud-dashboard-create',
  templateUrl: './votmcloud-dashboard-create.component.html',
  styleUrls: ['./votmcloud-dashboard-create.component.scss']
})
export class VotmcloudDashboardCreateComponent implements OnInit {

  @Output() save: EventEmitter<any> = new EventEmitter<any>();
  @Output() cancel: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('addDashboardModal', null) content: any;
  @Input() dashboardDataById: { act: string; title: string; dashboardName: string; dashboardHTML: any; };
  selTemplate: string;
  dbTemplates: DbTplItem[];
  @Input() dashboardTab: DashBoard = new DashBoard();
  loggedInUser: UserProfile;
  currentDate: string;
  constructor(
    private modalService: NgbModal,
    private dbService: DashboardService,
    private sharedService: SharedService
    ) { }

  ngOnInit() {
    this.loggedInUser = this.sharedService.getLoggedInUser();
    this.currentDate = moment(new Date()).tz(this.loggedInUser.userConfigSettings[0].timeZoneDescription)
      .format(moment.localeData(this.loggedInUser.userConfigSettings[0].localeName)
        .longDateFormat('L')) + ' '
      + moment(new Date()).tz(this.loggedInUser.userConfigSettings[0].timeZoneDescription)
        .format(moment.localeData(this.loggedInUser.userConfigSettings[0].localeName)
          .longDateFormat('LTS'));
    this.dbTemplates = this.dbService.getDashboardTemplates();
    this.selTemplate = this.dbTemplates[0].name;
  }

  open() {
    this.modalService
    .open(this.content, { ariaLabelledBy: 'modal-basic-title', backdrop: 'static', keyboard: false });
  }

  onClose(flag) {
    if (flag) {
      this.cancel.next();
    } else {
      console.log('ashboard Tab', this.dashboardTab);
      this.save.emit(this.dashboardTab);
    }
    this.dashboardTab = new DashBoard();
    this.modalService.dismissAll();
  }

}
