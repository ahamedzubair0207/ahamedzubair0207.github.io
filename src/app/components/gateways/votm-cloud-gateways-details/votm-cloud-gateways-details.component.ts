import { Location as RouterLocation } from '@angular/common';
import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-votm-cloud-gateways-details',
  templateUrl: './votm-cloud-gateways-details.component.html',
  styleUrls: ['./votm-cloud-gateways-details.component.scss']
})
export class VotmCloudGatewaysDetailsComponent implements OnInit {

  @Output() showGatewayDetail = new EventEmitter<any>();
  @Input() gatewayId: string;

  constructor(
    private routerLocation: RouterLocation
  ) { }

  ngOnInit() {
    console.log('gatewayId===', this.gatewayId);

  }

  returnToGatewayList() {
    this.showGatewayDetail.emit(false);
  }

}
