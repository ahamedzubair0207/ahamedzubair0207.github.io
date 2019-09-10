import { Component, OnInit } from '@angular/core';
import { DatePipe, Location as RouterLocation } from '@angular/common';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-votom-cloud-assets-signal',
  templateUrl: './votom-cloud-assets-signal.component.html',
  styleUrls: ['./votom-cloud-assets-signal.component.scss']
})
export class VotomCloudAssetsSignalComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private route: Router,private routerLocation: RouterLocation) { }

  ngOnInit() {
  }

  onCancelClick(event) {
    this.routerLocation.back();
  }

}
