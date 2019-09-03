import { Component, OnInit } from '@angular/core';
import { DatePipe, Location as RouterLocation } from '@angular/common';

@Component({
  selector: 'app-votm-cloud-asset-template-details',
  templateUrl: './votm-cloud-asset-template-details.component.html',
  styleUrls: ['./votm-cloud-asset-template-details.component.scss']
})
export class VotmCloudAssetTemplateDetailsComponent implements OnInit {

  constructor(private routerLocation: RouterLocation) { }

  ngOnInit() {
  }

  onCancelClick(event) {
    this.routerLocation.back();
  }

}
