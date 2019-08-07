import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from "@angular/router";
import { LocationService } from '../../../services/locations/location.service';

@Component({
  selector: 'app-votm-cloud-locations-home',
  templateUrl: './votm-cloud-locations-home.component.html',
  styleUrls: ['./votm-cloud-locations-home.component.scss']
})
export class VotmCloudLocationsHomeComponent implements OnInit {

  locationsList = [];
  curLocId: string;
  curLocName: string;
  curOrgId: string;
  curOrgName: string;
  parentOrgId: string;
  parentOrgName: string;

  constructor(private locService: LocationService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.curLocId = params.get("locId");
      this.curLocName = params.get("locName");

      this.locService.getLocationTree(this.curLocId).subscribe(
        response => {
          this.locationsList = response.map(
            x => ({
              ...x,
              opened: false
            })
          );
          this.getParentOrganizationInfo()
        }
      );

    });

  }

  getParentOrganizationInfo() {
    console.log(' this.locationsList ', this.locationsList)
    if (this.locationsList && this.locationsList.length > 0) {
      this.parentOrgId = this.locationsList[0].parentOrgId
      this.parentOrgName = this.locationsList[0].parentOrgName
    }
  }

}
