import { Component, OnInit } from '@angular/core';
import { LocationService } from '../services/Location/location.service';

@Component({
  selector: 'app-votm-cloud-sites-home',
  templateUrl: './votm-cloud-sites-home.component.html',
  styleUrls: ['./votm-cloud-sites-home.component.scss']
})
export class VotmCloudSitesHomeComponent implements OnInit {

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
