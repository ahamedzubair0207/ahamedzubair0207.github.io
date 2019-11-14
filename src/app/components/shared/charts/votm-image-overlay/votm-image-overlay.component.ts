import { DbItem } from './../../../../models/db-item';
import { AssetSignalService } from 'src/app/services/assetSignal/asset-signal.service';
import { LocationSignalService } from './../../../../services/locationSignal/location-signal.service';
import { Component, OnInit, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Toaster } from '../../votm-cloud-toaster/votm-cloud-toaster';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { TreeNode } from 'primeng/api';
import { LocationService } from 'src/app/services/locations/location.service';
import { DomSanitizer } from '@angular/platform-browser';
import { AssetsService } from 'src/app/services/assets/assets.service';

@Component({
  selector: 'app-votm-image-overlay',
  templateUrl: './votm-image-overlay.component.html',
  styleUrls: ['./votm-image-overlay.component.scss']
})
export class VotmImageOverlayComponent implements OnInit {

  @Input() data: DbItem;
  @Input() id: string;
  customizeImageOverlay: any;
  isImageOverlayConfigured: boolean;
  toaster: Toaster = new Toaster(this.toastr);
  associatedSignals: any[];
  curLocId: string;
  locationsList: Array<TreeNode> = [];
  LocationSourceChild: any[];
  widgetlocImageID: any;
  widgetImageData: any;
  widgetimgURL: any = '../../../../assets/images/default-image.svg';
  iconSize: any;
  assetsList: Array<TreeNode> = [];
  assetsSourceChild: any[];
  widgetassetimageID: any;
  overLaySource: any;
  wId: string;
  parentOrgId: string;
  assetId: string;
  widgetImageOverlaySource: any;
  constructor(
    private toastr: ToastrService,
    private locationSignalService: LocationSignalService,
    private assetSignalService: AssetSignalService,
    private route: ActivatedRoute,
    private locationService: LocationService,
    private assetService: AssetsService,
    private domSanitizer: DomSanitizer,
  ) {

  }

  ngOnInit() {
    this.wId = this.data.id + '-' + this.id;
    this.isImageOverlayConfigured = false;
    this.widgetImageOverlaySource = ['Location', 'Asset', 'Custom'];

    this.route.paramMap.subscribe((params: ParamMap) => {
      this.curLocId = params.get('locId');
      // this.curLocName = params.get('locName');
      this.parentOrgId = params.get('orgId');
      // this.parentOrgName = params.get('orgName');
      this.assetId = params.get('assetId');
      console.log('m y this.curLocId parentOrgId', this.curLocId, this.parentOrgId);

      if (this.parentOrgId) {
        // Organization dashboard
        // fetch all location & assets by org id
        this.fetchlocationTreeByOrganizationId();
        // Fetch all asset tree by orgid
        this.fetchAssetsTreeByOrganizationId();
      } else if (this.curLocId) {
        // Location dashbaord
        // fetch all child location & it selft
        this.fetchlocationTreeByLocationId();

        // fetch all assets by location ID
        // this.fetchlocationTreeById();
        this.fetchAssetsTreeByLocationId();
      } else if (this.assetId) {
        // Asset Dashboard
        // Fetch all child assets & itself
        this.fetchAssetsTreeByAssetId();
      }


    });

  }

  fetchlocationTreeByOrganizationId() {
    this.locationService.getAllLocationTree(this.parentOrgId).subscribe(response => {
      this.locationsList = [];
      if (response && response.length > 0) {
        this.LocationSourceChild = this.fillLocationData(response);
      }
      console.log('location by Org id ', this.locationsList);
      // this.LocationSourceChild = this.locationsList[0].children;
    });
  }

  fetchAssetsTreeByOrganizationId() {
    this.assetService.getAssetTreeByOrgId(this.parentOrgId)
      .subscribe(response => {
        this.assetsList = [];
        if (response && response.length > 0) {
          this.assetsList = this.fillAssetData(response);
        }
        console.log('location by Org id ', this.assetsList);
        this.assetsSourceChild = this.assetsList;
      });
  }

  fetchlocationTreeByLocationId() {
    this.locationService.getLocationTreeByID(this.curLocId).subscribe(response => {
      this.locationsList = [];
      if (response && response.length > 0) {
        this.locationsList = this.fillLocationData(response);
      }
      console.log('my this.locationsList ', this.locationsList);
      this.LocationSourceChild = this.locationsList[0].children;
      // Requirement to Include Parent location (it self in dropdown)
      this.LocationSourceChild.push({data: this.locationsList[0].data});
      console.log('my updated locationsList ', this.locationsList);
    });
  }

  fetchAssetsTreeByAssetId() {
    this.assetService.getAssetTreeByAssetId('acc9975e-c02a-4fc5-be83-a047821c0b08')
      .subscribe(response => {
        this.assetsList = [];
        if (response && response.length > 0) {
          // this.assetsList = this.fillAssetData(response);
          this.assetsList = response[0].node[0].node;
        }
        console.log('assets by asset id ', this.assetsList);
        this.assetsSourceChild = this.assetsList;

        // this.assetsSourceChild.push({data: response[0].node[0]});
        // console.log('my updated assets ', this.assetsSourceChild);
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

  fetchAssetsTreeByLocationId() {
    this.assetService.getAssetTreeByLocId(this.curLocId)
      .subscribe(response => {
        this.assetsList = [];
        if (response && response.length > 0) {
          this.assetsList = this.fillAssetData(response);
        }
        console.log('my assetsList ', this.assetsList);
        this.assetsSourceChild = this.assetsList;
      });
  }
  fillAssetData(assets: any[]) {
    const assetList: TreeNode[] = [];
    assets.forEach(asset => {
      const tempAsset: TreeNode = { data: asset };
      tempAsset.children = [];
      if (asset.node && asset.node.length > 0) {
        tempAsset.children = this.fillAssetData(asset.node);
      } else {
        tempAsset.children = [];
      }
      assetList.push(tempAsset);
    });
    return assetList;
  }

  onClickOfCustomizeImageOverlay() {
    // Open Chart configuration modal popup
    const modal = document.getElementById('configure-image-overlay-modal-' + this.wId);
    modal.style.display = 'block';
    this.customizeImageOverlay = document.getElementById('configure-image-overlay-modal-' + this.wId);
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
      $('#overlaySourceLocation-' + this.wId).removeClass('d-none');
      $('#locationsList-' + this.wId).removeClass('d-none');
      $('#overlaySourceAsset-' + this.wId).addClass('d-none');
      $('#assetsList-' + this.wId).addClass('d-none');
    } else if (event === 'asset') {
      $('#overlaySourceAsset-' + this.wId).removeClass('d-none');
      $('#assetsList-' + this.wId).removeClass('d-none');
      $('#overlaySourceLocation-' + this.wId).addClass('d-none');
      $('#locationsList-' + this.wId).addClass('d-none');
    }
  }

  getImageOverlayConfiguration(overlaySource) {

    // Call service to get configured image overlay data
    // this.widgetService.getImageOverlayConfiguration().subscribe(
    //   response => {
    //     this.isImageOverlayConfigured = true;
    //   }, error => {
    //     this.isImageOverlayConfigured = false;
    //   }
    // );
    this.isImageOverlayConfigured = true;
    if (!this.iconSize) {
      this.iconSize = 'widget-icon-small';
    }
    if (overlaySource === 'location') {
      if (!this.widgetlocImageID) {
        this.widgetlocImageID = this.curLocId;
      }
      console.log('locationID======', this.widgetlocImageID);
      this.getLocationById(this.widgetlocImageID); // get location Image data
      this.locationSignalService.getSignalAssociation(this.widgetlocImageID)
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
      } else if (overlaySource === 'asset') {
        this.getAssetById(this.widgetassetimageID); // get asset Image data
        this.assetSignalService.getAssetSignalAssociation(this.widgetassetimageID)
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
        this.widgetImageData = response;
        if (this.widgetImageData.logo && this.widgetImageData.logo.imageName) {
          const fileExtension = this.widgetImageData.logo.imageName.slice(
            (Math.max(0, this.widgetImageData.logo.imageName.lastIndexOf('.')) || Infinity) + 1);
          this.widgetimgURL = this.domSanitizer.bypassSecurityTrustUrl(`data:image/${fileExtension};base64,${this.widgetImageData.logo.image}`);
        }
      });
  }

  getAssetById(assetID) {
    this.assetService.getAssetById(assetID)
      .subscribe(response => {
        this.widgetImageData = response;
        if (this.widgetImageData.logo && this.widgetImageData.logo.imageName) {
          const fileExtension = this.widgetImageData.logo.imageName.slice(
            (Math.max(0, this.widgetImageData.logo.imageName.lastIndexOf('.')) || Infinity) + 1);
          this.widgetimgURL = this.domSanitizer.bypassSecurityTrustUrl(`data:image/${fileExtension};base64,${this.widgetImageData.logo.image}`);
        }
      });
  }

  saveImageOverlayConfiguration() {
    this.customizeImageOverlay.style.display = 'none';
    this.toaster.onSuccess('Chart Configured Successfully', 'Success');

    console.log('widgetlocImage', this.widgetlocImageID);
    console.log('widgetassetimageID', this.widgetassetimageID, this.overLaySource);

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
    // if (!this.widgetlocImageID) {
    //   this.widgetlocImageID = this.curLocId;
    // }
    this.getImageOverlayConfiguration(this.overLaySource);
    // setTimeout(() => {
    //   console.log('image overlay called');

    // }, 500);

    // if (this.overLaySource === 'asset') {
    //   this.getImageOverlayConfiguration(this.widgetlocImageID);
    // }

  }

}
