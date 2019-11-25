import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { LocationService } from '../../../services/locations/location.service';
import { VotmCloudConfimDialogComponent } from '../../shared/votm-cloud-confim-dialog/votm-cloud-confim-dialog.component';
import { ToastrService } from 'ngx-toastr';
import { Toaster } from '../../shared/votm-cloud-toaster/votm-cloud-toaster';
import { TreeNode } from 'primeng/api';

@Component({
  selector: 'app-votm-cloud-locations-home',
  templateUrl: './votm-cloud-locations-home.component.html',
  styleUrls: ['./votm-cloud-locations-home.component.scss']
})
export class VotmCloudLocationsHomeComponent implements OnInit {

  locationsList: Array<TreeNode> = [];
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
  searchedText: any;
  loader: boolean;

  constructor(private locService: LocationService, private router: Router, private route: ActivatedRoute, private toastr: ToastrService) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.curLocId = params.get('locId');
      this.curLocName = params.get('locName');
      this.parentOrgId = params.get('orgId');
      this.parentOrgName = params.get('orgName');
      if (!this.curLocId) {
        this.fetchlocationTree();
      } else {
        this.fetchlocationTreeById();
      }
    });
    // this.fetchlocationTree();
  }

  private fetchlocationTreeById() {
    this.loader = true;
    this.locService.getLocationTree(this.curLocId).subscribe(response => {
      this.locationsList = [];
      if (response && response.length > 0) {
        this.locationsList = this.fillLocationData(response);
      }
      this.loader = false;
    });

  }

  fillLocationData(locations: any[]) {
    let locationList: TreeNode[] = [];
    locations.forEach(org => {
      let tempLoc: TreeNode = { data: org };
      tempLoc.children = [];
      if (org.node && org.node.length > 0) {
        tempLoc.children = this.fillLocationData(org.node);
      } else {
        tempLoc.children = [];
      }
      locationList.push(tempLoc);
    });
    return locationList;
  }

  onCreateNewLocation() {
    this.router.navigate([`loc/create/${this.parentOrgId}/${this.parentOrgName}`]);
  }

  onCreateNewAsset() {
    this.router.navigate([`asset/create/${this.parentOrgId}/${this.parentOrgName}`]);
  }

  private fetchlocationTree() {
    this.loader = true;
    this.locService.getAllLocationTree(this.parentOrgId).subscribe(response => {
      this.locationsList = [];
      if (response && response.length > 0) {
        this.locationsList = this.fillLocationData(response);
      }
      this.loader = false;
    });
  }

  openConfirmDialog(delLocId, delLocName) {
    this.message = `Do you want to delete the "${delLocName}" location?`;
    this.locToDelete = delLocId;
    this.locNameToDelete = delLocName;
    this.confirmBox.open();
  }

  deleteLocationById(event) {
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

  onLocationSearch() {
    if (this.searchedText) {
      this.locService.searchLocations(this.searchedText)
        .subscribe(response => {
          // this.locationsList = response;
        });
    }
  }

}
