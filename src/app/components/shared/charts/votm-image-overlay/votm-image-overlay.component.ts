import { LocationSignalService } from './../../../../services/locationSignal/location-signal.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Toaster } from '../../votm-cloud-toaster/votm-cloud-toaster';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { TreeNode } from 'primeng/api';
import { LocationService } from 'src/app/services/locations/location.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-votm-image-overlay',
  templateUrl: './votm-image-overlay.component.html',
  styleUrls: ['./votm-image-overlay.component.scss']
})
export class VotmImageOverlayComponent implements OnInit {


  customizeImageOverlay: any;
  isImageOverlayConfigured: boolean;
  toaster: Toaster = new Toaster(this.toastr);
  associatedSignals: any[];
  curLocId: string;
  locationsList: Array<TreeNode> = [];
  LocationSourceChild: any[];
  widgetlocImageID: any;
  widgetLocationData: any;
  widgetimgURL: any;
  iconSize: any;
  constructor(
    private toastr: ToastrService,
    private locationSignalService: LocationSignalService,
    private route: ActivatedRoute,
    private locationService: LocationService,
    private domSanitizer: DomSanitizer,
  ) {

  }

  ngOnInit() {
    this.isImageOverlayConfigured = false;

    this.route.paramMap.subscribe((params: ParamMap) => {
      this.curLocId = params.get('locId');
      // this.curLocName = params.get('locName');
      // this.parentOrgId = params.get('orgId');
      // this.parentOrgName = params.get('orgName');
      console.log('m y this.curLocId ', this.curLocId);
      if (!this.curLocId) {
        // this.fetchlocationTree();
      } else {
        // this.fetchlocationTreeById();
        this.locationService.getLocationTreeByID(this.curLocId).subscribe(response => {
          this.locationsList = [];
          if (response && response.length > 0) {
            this.locationsList = this.fillLocationData(response);
          }
          console.log('my this.locationsList ', this.locationsList[0]['children']);
          this.LocationSourceChild = this.locationsList[0]['children'];
        });
      }

    });

  }

  fillLocationData(locations: any[]) {
    const locationList: TreeNode[] = [];
    locations.forEach(org => {
      const tempLoc: TreeNode = { data: org };
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

  onClickOfCustomizeImageOverlay() {
    // Open Chart configuration modal popup
    const modal = document.getElementById('configure-image-overlay-modal');
    modal.style.display = 'block';
    this.customizeImageOverlay = document.getElementById('configure-image-overlay-modal');
    window.onclick = (event) => {
      if (event.target === modal) {
        modal.style.display = 'none';
      }
    };
  }

  onClickOfCustomizeImageOverlayModalClose() {
    // Close modal popup
    this.customizeImageOverlay.style.display = 'none';
  }

  onChangeOverlaySource(event) {
    if (event === 'location') {
      $('#overlaySourceLocation, #locationsList').removeClass('d-none');
      $('#overlaySourceAsset, #assetsList').addClass('d-none');
    } else if (event === 'asset') {
      $('#overlaySourceAsset, #assetsList').removeClass('d-none');
      $('#overlaySourceLocation, #locationsList').addClass('d-none');
    }
  }

  getImageOverlayConfiguration(locationID) {

    // Call service to get configured image overlay data 
    // this.widgetService.getImageOverlayConfiguration().subscribe(
    //   response => {
    //     this.isImageOverlayConfigured = true;
    //   }, error => {
    //     this.isImageOverlayConfigured = false;
    //   }
    // );
    this.isImageOverlayConfigured = true;

    console.log('locationID======', locationID);
    this.getLocationById(locationID); // get location Image data
    this.locationSignalService.getSignalAssociation(locationID)
      .subscribe(
        response => {

          for (let i = 0; i < response.length; i++) {
            const signal = response[i];
            signal.imageCordinates = signal.imageCordinates[signal.associationName];
            signal.pos = {};
            signal.pos['left'] = signal.imageCordinates.x;
            signal.pos['top'] = signal.imageCordinates.y;
            signal.isClicked = false;
            signal.icon = 'icon-sig-humidity ' + this.iconSize;
            signal.associated = true;
            signal.id = i;
          }
          this.associatedSignals = [...response];
        },
        error => {

        }
      );
  }

  getPositionStyle(signal) {
    const style = {
      left: 'calc(' + signal.pos.left + '% - 16px)',
      top: 'calc(' + signal.pos.top + '% - 16px)'
    };
    return style;
  }

  getLocationTree() {
    //1387c6d3-cabc-41cf-a733-8ea9c9169831
  }

  getLocationById(locationID) {
    this.locationService.getLocationById(locationID)
      .subscribe(response => {
        this.widgetLocationData = response;
        if (this.widgetLocationData.logo && this.widgetLocationData.logo.imageName) {
          const fileExtension = this.widgetLocationData.logo.imageName.slice(
            (Math.max(0, this.widgetLocationData.logo.imageName.lastIndexOf('.')) || Infinity) + 1);
          this.widgetimgURL = this.domSanitizer.bypassSecurityTrustUrl(`data:image/${fileExtension};base64,${this.widgetLocationData.logo.image}`);
        }
      });
  }

  saveImageOverlayConfiguration() {
    this.customizeImageOverlay.style.display = 'none';
    this.toaster.onSuccess('Chart Configured Successfully', 'Success');

    console.log('widgetlocImage', this.widgetlocImageID);
    console.log('widgetlocImage', this.iconSize);

    // Call services to save image overlay configuration data
    // this.widgetService.addImageOverlayConfiguration(imageOvelayConfigureObj).subscribe(
    //   response => {
    //     this.toaster.onSuccess('Widget Configured Successfully', 'Success');
    //     this.onClickOfCustomizeImageOverlayModalClose();
    //     this.getChartConfiguration();
    //   }, error => {
    //     this.toaster.onFailure('Error in Widget Configuration', 'Failure');
    //     this.onClickOfCustomizeImageOverlayModalClose();
    //   }
    // );
    this.getImageOverlayConfiguration(this.widgetlocImageID);
    // setTimeout(() => {
    //   console.log('image overlay called');

    // }, 500);
  }

}
