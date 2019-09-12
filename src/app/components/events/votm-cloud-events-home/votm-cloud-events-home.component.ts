import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-votm-cloud-events-home',
  templateUrl: './votm-cloud-events-home.component.html',
  styleUrls: ['./votm-cloud-events-home.component.scss']
})
export class VotmCloudEventsHomeComponent implements OnInit {

  subscriptions: Subscription[] = [];
  eventsLogs: [];
  addEventmodal: any;

  // constructor() { }
  constructor(
    // private eventService: EventsService,
    // private route: ActivatedRoute,
    // private router: Router
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    // this.subscriptions.push(this.route.params.subscribe(
    //   (params: Params) => {
    //     this.fetchAllEventsLog();
    //   }));
  }

  fetchAllEventsLog() {
    // this.subscriptions.push(this.eventService.getEventsLog()
    //   .subscribe(response => {
    //     this.eventsLogs = response;
    //   }));
  }

  openAddEventModal() {
    // Get the modal
    let addEventmodal = document.getElementById('addEventModalWrapper');
    addEventmodal.style.display = 'block';
    this.addEventmodal = document.getElementById('addEventModalWrapper');
    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName('close')[0];

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
      if (event.target == addEventmodal) {
        addEventmodal.style.display = 'none';
      }
    };

  }
  closeAddEventModal(event: string) {
    this.addEventmodal.style.display = 'none';
    // if (event === 'save') {
    //
    // } else {
    //
    // }
  }


}
