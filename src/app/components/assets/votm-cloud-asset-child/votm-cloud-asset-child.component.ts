import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-votm-cloud-asset-child',
  templateUrl: './votm-cloud-asset-child.component.html',
  styleUrls: ['./votm-cloud-asset-child.component.scss']
})
export class VotmCloudAssetChildComponent implements OnInit {

  @Input('image') image: any;
  constructor() { }

  ngOnInit() {
  }

}
