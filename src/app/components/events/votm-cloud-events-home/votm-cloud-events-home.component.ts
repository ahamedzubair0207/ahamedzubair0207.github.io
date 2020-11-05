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
  currentDate: string;
  selectedAcknowledgement = 1;
  closureActivity: string;
  closureNote: string;
  @Input() organizationId: string;
  @Input() locationId: string;
  @Input() assetId: string;
  closedBy: string;
  closedOn: string;
  previouslyOpenedRow = -1;
  @ViewChild('eventLogTable', { static: false }) eventLogTable: any;
  toaster: Toaster = new Toaster(this.toastr);
  eventLogsTemp: any[] = [];

  // constructor() { }
  constructor(
    private eventLogsService: EventLogsService,
    private sharedService: SharedService,
    private toastr: ToastrService,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    // this.loggedInUser = this.sharedService.getLoggedInUser();
    this.currentDate = this.sharedService.getDateTimeInUserLocale(new Date());
    // this.getEventActivities();
    // this.getEventLogs();
  }

  getEventLogs() {
    // this.eventLogsService.getEventLogs(this.organizationId, this.locationId, this.assetId)
    //   .subscribe(response => {
    //     this.eventLogsTemp = response;
    //     for (let i = 0; i < this.eventLogsTemp.length; i++) {
    //       this.getValueByUOM(this.eventLogsTemp[i], i);
    //     }
    //   });
  }

  getValueByUOM(eventObj, index) {
    console.log(index);
    const arr = [];
    arr.push({
      uomValue: eventObj.signalValue,
      signalId: eventObj.signalId,
      sensorId: eventObj.sensorId
    });
    const obj = {
      userId: this.loggedInUser.userId,
      organizationId: eventObj.organizationId,
      locationId: eventObj.locationId,
      precision: 3,
      uom: arr
    };
    this.sharedService.getUOMConversionData(obj).subscribe(
      response => {
        this.eventLogsTemp[index].signalValue = response[0].uomValue + (response[0].uomname ? ' ' + response[0].uomname : '');
        if (index === this.eventLogsTemp.length - 1) {
          const arr1 = [...this.eventLogsTemp];
          this.eventsLogs = [...arr1];
        }
      }
    );
  }

  getUserLocaleDateTime(time) {
    if (time) {
      return this.sharedService.getDateTimeInUserLocale(time);
    }
  }

  getEventActivities() {

  }

  toggleExpandRow(row, index) {
    this.selectedAcknowledgement = row.clousureTypeId;
    this.closureActivity = row.eventActivtiyId;
    this.closureNote = row.description;
    this.closedBy = !row.active ? row.closedBy : this.loggedInUser.userName;
    this.closedOn = !row.active ? row.closedOn : this.currentDate;
    // console.log('Toggled Expand Row!', row);
    this.eventLogTable.rowDetail.collapseAllRows();

    if (this.previouslyOpenedRow !== index) {
      this.eventLogTable.rowDetail.toggleExpandRow(row);
      this.previouslyOpenedRow = index;
    } else {
      this.previouslyOpenedRow = -1;
    }
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
    // console.log('Detail Toggled', event);
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
    if (this.selectedAcknowledgement === 2 || this.selectedAcknowledgement === 1) {
      obj['eventActivtiyId'] = null;
      obj['description'] = this.closureNote;
    }
    // this.eventLogsService.updateEventLog(obj).subscribe(
    //   response => {
    //     this.toaster.onSuccess('Event Log successfully updated', 'Updated');
    //     this.getEventLogs();
    //   }, error => {
    //     this.toaster.onFailure('Error in Event Log updated', 'Updated');
    //   }
    // );
  }

  openAddEventModal(content) {
    // Get the modal
    this.modalService.open(content,  { size: 'lg' }).result.then((result) => {
      // console.log(result);
      this.createEventActivity();
    }, (reason) => {
     // console.log('Dismissed', reason);
    });

  }

  createEventActivity() {

  }


}
