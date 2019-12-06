import { SharedService } from './../../../services/shared.service';
import { EventLogsService } from './../../../services/eventlogs/event-logs.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Params } from '@angular/router';
import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { Eventlog } from 'src/app/models/eventlog.model';
import { Toaster } from '../../shared/votm-cloud-toaster/votm-cloud-toaster';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-votm-cloud-events-home',
  templateUrl: './votm-cloud-events-home.component.html',
  styleUrls: ['./votm-cloud-events-home.component.scss']
})
export class VotmCloudEventsHomeComponent implements OnInit {

  subscriptions: Subscription[] = [];
  eventsLogs: Eventlog [];
  addEventmodal: any;
  loggedInUser: any;
  currentDate = (new Date()).toUTCString();
  selectedAcknowledgement = 1;
  closureActivity: string;
  closureNote: string;
  @Input() organizationId: string;
  @Input() locationId: string;
  @Input() assetId: string;
  closedBy: string;
  closedOn: string;
  @ViewChild('eventLogTable', { static: false }) eventLogTable: any;
  toaster: Toaster = new Toaster(this.toastr);


  // constructor() { }
  constructor(
    private eventLogsService: EventLogsService,
    private sharedService: SharedService,
    private toastr: ToastrService,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.loggedInUser = this.sharedService.getLoggedInUser();
    this.getEventActivities();
    this.getEventLogs();
  }

  getEventLogs() {
    this.eventLogsService.getEventLogs(this.organizationId, this.locationId, this.assetId)
      .subscribe(response => {
        this.eventsLogs = response;
      });
  }

  getEventActivities() {

  }

  toggleExpandRow(row) {
    this.selectedAcknowledgement = row.clousureTypeId;
    this.closureActivity = row.eventActivtiyId;
    this.closureNote = row.description;
    this.closedBy = !row.active ? row.closedBy : this.loggedInUser.userName;
    this.closedOn = !row.active ? row.closedOn : this.currentDate;
    console.log('Toggled Expand Row!', row);
    this.eventLogTable.rowDetail.collapseAllRows();
    this.eventLogTable.rowDetail.toggleExpandRow(row);
  }

  closeRow(row) {
    this.selectedAcknowledgement = undefined;
    this.closureActivity = undefined;
    this.closureNote = undefined;
    this.closedBy = undefined;
    this.closedOn = undefined;
    this.eventLogTable.rowDetail.toggleExpandRow(row);
  }

  onDetailToggle(event) {
    console.log('Detail Toggled', event);
  }

  getRowClass(event) {
    let className = '';
    if (event.alarmStatus.toLowerCase().includes('critical')) {
      className = 'event-danger';
    } else if (event.alarmStatus.toLowerCase().includes('warning')) {
      className = 'event-warning';
    } else if (event.alarmStatus.toLowerCase().includes('baseline')) {
      className = 'event-success';
    }
    return className;
  }

  updateEventLog(logObj: Eventlog) {
    const obj = {
      eventLogId: logObj.eventLogId,
      clousureType: this.selectedAcknowledgement,
      eventActivtiyId: null,
      description: null
    };
    if (this.selectedAcknowledgement === 2) {
      obj['eventActivtiyId'] = null;
      obj['description'] = this.closureNote;
    }
    this.eventLogsService.updateEventLog(obj).subscribe(
      response => {
        this.toaster.onSuccess('Event Log successfully updated', 'Updated');
        this.getEventLogs();
      }, error => {
        this.toaster.onFailure('Error in Event Log updated', 'Updated');
      }
    );
  }

  openAddEventModal(content) {
    // Get the modal
    this.modalService.open(content,  { size: 'lg' }).result.then((result) => {
      console.log(result);
      this.createEventActivity();
    }, (reason) => {
     console.log('Dismissed', reason);
    });

  }

  createEventActivity() {

  }


}
