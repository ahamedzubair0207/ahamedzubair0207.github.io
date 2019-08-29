import { Component, OnInit } from '@angular/core';
import { DatePipe, Location as RouterLocation } from '@angular/common';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-votm-cloud-locations-signal',
  templateUrl: './votm-cloud-locations-signal.component.html',
  styleUrls: ['./votm-cloud-locations-signal.component.scss']
})
export class VotmCloudLocationsSignalComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private route: Router,private routerLocation: RouterLocation) { }

  ngOnInit() {
  }

  onCancelClick(event) {
    this.routerLocation.back();
  }

}
