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

  // constructor() { }
  constructor(
    // private eventService: EventsService,
    // private route: ActivatedRoute,
    // private router: Router
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

}
