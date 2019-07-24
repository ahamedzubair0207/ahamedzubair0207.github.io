import { Component, OnInit } from '@angular/core';
import { LocationService } from '../../../services/locations/location.service';

@Component({
  selector: 'app-votm-cloud-locations-home',
  templateUrl: './votm-cloud-locations-home.component.html',
  styleUrls: ['./votm-cloud-locations-home.component.scss']
})
export class VotmCloudLocationsHomeComponent implements OnInit {

  locationsList = [];
  constructor(private locService: LocationService) { }

  ngOnInit() {
    this.getLocation();
  }
  getLocation(){
    this.locationsList = this.locService.getAllLocations().map(x => ({
      ...x,
      opened:false
    }));
  }
}
