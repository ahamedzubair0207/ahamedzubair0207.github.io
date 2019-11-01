import { Component, OnInit, ViewChild } from '@angular/core';
import { AtlasMapComponent, LoadMapService } from "@acaisoft/angular-azure-maps";


@Component({
  selector: 'app-votm-cloud-admin-network-map',
  templateUrl: './votm-cloud-admin-network-map.component.html',
  styleUrls: ['./votm-cloud-admin-network-map.component.scss'],
  providers: [LoadMapService]
})
export class VotmCloudAdminNetworkMapComponent implements OnInit {

  key: string = 'g5km6coCc-GZ7BuSq2OXfwBK_sswYgVMG10VZ6yu4Rg';
  @ViewChild('maper', null) maper: AtlasMapComponent;

  config = {
    'zoom': 1.5,
    'center': [20,20],
    'interactive': true,
  };
  
  constructor(private mapService: LoadMapService) { }

  ngOnInit() {
    // that will lazy loaded azure map script and styles
    this.mapService.load().toPromise().then(() => {
      atlas.setSubscriptionKey(this.key); // that inject your azure key
    });
  }



  

}
