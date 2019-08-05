import { Component, OnInit } from '@angular/core';
import { LocationService } from '../../../services/locations/location.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-votm-cloud-locations-home',
  templateUrl: './votm-cloud-locations-home.component.html',
  styleUrls: ['./votm-cloud-locations-home.component.scss']
})
export class VotmCloudLocationsHomeComponent implements OnInit {

  locationsList = [];

  curOrgId : string;
  curOrgName : string;
  constructor(private locService: LocationService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.curOrgId = this.route.snapshot.paramMap.get("orgId");
    this.curOrgName = this.route.snapshot.paramMap.get("orgName");
    this.getLocation();
  }
  getLocation(){
    this.locationsList = this.locService.getAllLocations().map(x => ({
      ...x,
      opened:false
    }));
  }
}
