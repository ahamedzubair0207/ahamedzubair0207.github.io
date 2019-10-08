import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { LocationService } from '../../../services/locations/location.service';
import { VotmCloudConfimDialogComponent } from '../../shared/votm-cloud-confim-dialog/votm-cloud-confim-dialog.component';
import { ToastrService } from 'ngx-toastr';
import { Toaster } from '../../shared/votm-cloud-toaster/votm-cloud-toaster';

@Component({
  selector: 'app-votm-cloud-locations-home',
  templateUrl: './votm-cloud-locations-home.component.html',
  styleUrls: ['./votm-cloud-locations-home.component.scss']
})
export class VotmCloudLocationsHomeComponent implements OnInit {

  locationsList = [];
  curLocId: string;
  curLocName: string;
  parentOrgId: string;
  parentOrgName: string;
  curOrgId: string;
  curOrgName: string;
  locToDelete: string;
  message: string;

  @ViewChild('confirmBox', null) confirmBox: VotmCloudConfimDialogComponent;
  locNameToDelete: any;
  toaster: Toaster = new Toaster(this.toastr);

  constructor(private locService: LocationService, private router: Router, private route: ActivatedRoute, private toastr: ToastrService) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.curLocId = params.get('locId');
      this.curLocName = params.get('locName');
      this.parentOrgId = params.get('orgId');
      this.parentOrgName = params.get('orgName');
      console.log(' this.curLocId ', this.parentOrgId, this.parentOrgName);
      if (!this.curLocId) {
        this.fetchlocationTree();
      } else {
        this.fetchlocationTreeById();
      }
    });
    // this.fetchlocationTree();
  }

  private fetchlocationTreeById() {
    this.locService.getLocationTree(this.curLocId).subscribe(response => {
      this.locationsList = response.map(x => ({
        ...x,
        opened: true
      }));
    });
  }

  onCreateNewLocation() {
    this.router.navigate([`loc/create/${this.parentOrgId}/${this.parentOrgName}`]);
  }

  onCreateNewAsset() {
    this.router.navigate([`asset/create/${this.parentOrgId}/${this.parentOrgName}`]);
  }

  private fetchlocationTree() {
    this.locService.getAllLocationTree(this.parentOrgId).subscribe(response => {
      this.locationsList = response.map(x => ({
        ...x,
        opened: true
      }));
    });
  }

  openConfirmDialog(delLocId, delLocName) {
    this.message = `Do you want to delete the "${delLocName}" location?`;
    this.locToDelete = delLocId;
    this.locNameToDelete = delLocName;
    this.confirmBox.open();
  }

  deleteLocationById(event) {
    console.log('event on close ', event);
    if (event) {
      this.locService.deleteLocation(this.locToDelete)
        .subscribe(response => {
          this.toaster.onSuccess(`You have deleted ${this.locNameToDelete} successfully.`, 'Delete Success!');
          this.locNameToDelete = '';
          this.fetchlocationTree();
        }, error => {
          this.toaster.onFailure('Something went wrong on server. Please try after sometiime.', 'Delete Fail!');
          this.locNameToDelete = '';
        });
    }
    this.locToDelete = '';
  }

}
