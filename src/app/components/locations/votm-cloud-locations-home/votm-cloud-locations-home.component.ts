import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap } from "@angular/router";
import { LocationService } from '../../../services/locations/location.service';
import { VotmCloudConfimDialogComponent } from '../../shared/votm-cloud-confim-dialog/votm-cloud-confim-dialog.component';

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
  locToDelete: string;
  
  @ViewChild('confirmBox', null) confirmBox: VotmCloudConfimDialogComponent;

  constructor(private locService: LocationService, private route: ActivatedRoute) { }

  ngOnInit() {
    
    this.route.paramMap.subscribe((params : ParamMap)=> {
      this.curLocId = params.get("locId");
      this.curLocName = params.get("locName");

      this.locService.getLocationTree(this.curLocId).subscribe(
        response => {
          this.locationsList = response.map(
            x => ({
            ...x,
            opened:true
            })
          );
        }
      );

    });

  }

  openConfirmDialog(delLocId) {
    this.locToDelete = delLocId;
    this.confirmBox.open();
  }

  deleteLocationById(event, delLocId) {
    console.log('event on close ', event);
    if (event) {
      this.locService.deleteLocation(this.locToDelete)
        .subscribe(response => {
          this.fetchLocList();
        });
    }
    this.locToDelete = '';
  }

  fetchLocList(){

  }
  
}
