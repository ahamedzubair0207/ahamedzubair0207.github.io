import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-votm-cloud-locations-asset',
  templateUrl: './votm-cloud-locations-asset.component.html',
  styleUrls: ['./votm-cloud-locations-asset.component.scss']
})
export class VotmCloudLocationsAssetComponent implements OnInit {

  @Input('image') image: any;
  constructor() { }

  ngOnInit() {
  }

}
