import { SignalRService } from './../../../../services/signalR/signal-r.service';
import { DbItem } from './../../../../models/db-item';
import { AssetSignalService } from 'src/app/services/assetSignal/asset-signal.service';
import { LocationSignalService } from './../../../../services/locationSignal/location-signal.service';
import { Component, OnInit, Input, OnDestroy, ElementRef, ViewChild } from '@angular/core';
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
export class VotmImageOverlayComponent implements OnInit, OnDestroy {

  @Input() data: DbItem;
  @Input() id: string;
  @Input() locked: boolean;
  customizeImageOverlay: any;
  isImageOverlayConfigured: boolean;
  toaster: Toaster = new Toaster(this.toastr);
  associatedSignals: any[] = [];
  associatedAssets: any[] = [];
  curLocId: string;
  locationsList: Array<TreeNode> = [];
  LocationSourceChild: any[];
  widgetlocImageID: any;
  widgetImageData: any;
  widgetimgURL: any;
  iconSize = 'widget-icon-extra-small';
  assetsList: Array<TreeNode> = [];
  assetsSourceChild: any[];
  widgetassetimageID: any;
  overLaySource = 'location';
  wId: string;
  parentOrgId: string;
  assetId: string;
  widgetImageOverlaySource: any;
  signalsCheckboxChecked = true;
  assetsCheckboxChecked = true;
  @ViewChild('overlayImage', { static: false }) eloverlayImg: ElementRef;
  imgOffsetLeft = null;
  imgOffsetTop = null;
  imgParentWidth = null;
  imgParentHeight = null;
  imgSourceHeight = null;
  imgSourceWidth = null;
  imgOffsetWidth = null;
  imgOffsetHeight = null;
  batterySignalId = 'e9326142-068b-494b-bff7-421a44fa0cae';
  signalSignalId = 'fa7b422d-2018-4fdb-ba50-0b4be9bf2735';
  displaySignalHoverContent: any = {};
  orgId: string;
  constructor(
    private toastr: ToastrService,
    private locationSignalService: LocationSignalService,
    private assetSignalService: AssetSignalService,
    private route: ActivatedRoute,
    private locationService: LocationService,
    private assetService: AssetsService,
    private domSanitizer: DomSanitizer,
    private signalRService: SignalRService
  ) {

  }

  ngOnInit() {
    this.wId = this.data.id + '-' + this.id;
    this.isImageOverlayConfigured = false;
    this.widgetImageOverlaySource = ['Location', 'Asset', 'Custom'];

    this.route.paramMap.subscribe((params: ParamMap) => {
      this.curLocId = params.get('locId');
      // this.curLocName = params.get('locName');
      this.parentOrgId = params.get('curOrgId');
      // this.parentOrgName = params.get('orgName');
      this.orgId = params.get('orgId');
      this.assetId = params.get('assetId');
      console.log('m y this.curLocId parentOrgId this.orgId', this.curLocId, this.parentOrgId, this.orgId);

      if ((this.parentOrgId || this.orgId) && !this.curLocId) {
        // Organization dashboard
        // fetch all location org id
        if (this.orgId) {
          this.fetchlocationTreeByOrganizationId(this.orgId);
        } else {
          this.fetchlocationTreeByOrganizationId(this.parentOrgId);
        }
        // Fetch all asset tree by orgid
        this.fetchAssetsTreeByOrganizationId();
        console.log('Organization dashboard');

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

  fetchlocationTreeByOrganizationId(organizationID) {
    console.log('organizationID===', organizationID);

    this.locationService.getAllLocationsTreeByOrganizationID(organizationID).subscribe(response => {
      this.locationsList = [];
      if (response && response.length > 0) {
        this.LocationSourceChild = this.fillLocationData(response);
        console.log('location response this.LocationSourceChild by Org id ', response, this.LocationSourceChild);
      }
      // console.log('location by Org id ', this.locationsList);
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
        console.log('assets by Org id ', this.assetsList);
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
        console.log('org.node====', org.node);
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
    this.signalRService.closeSignalRConnection();
  }

  onClickOfCustomizeImageOverlayModalClose() {
    // Close modal popup
    if(this.customizeImageOverlay){
    this.customizeImageOverlay.style.display = 'none';}
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
    this.associatedSignals = [];
    this.associatedAssets = [];
    if (overlaySource === 'location') {

      console.log('locationID======', this.widgetlocImageID);
      this.getLocationById(this.widgetlocImageID); // get location Image data
      if (this.signalsCheckboxChecked) {
        this.locationSignalService.getSignalAssociation(this.widgetlocImageID)
          .subscribe(
            response => {
              for (let i = 0; i < response.length; i++) {
                const signal = response[i];
                signal.icon = signal.iconFile + ' ' + this.iconSize;
                signal.latestValue = 0;
                this.displaySignalHoverContent['s-' + i] = false;
              }
              this.associatedSignals = [...response];
            }
        );
      }
      if (this.assetsCheckboxChecked) {
        this.locationService.getAssetAssociation(this.widgetlocImageID)
          .subscribe(
            response => {
              for (let i = 0; i < response.length; i++) {
                const signal = response[i];
                signal.icon = 'icon-asset-robot ' + this.iconSize;
                this.displaySignalHoverContent['a-' + i] = false;
              }
              this.associatedAssets = [...response];
            }
        );
      }
      } else if (overlaySource === 'asset') {

        this.getAssetById(this.widgetassetimageID); // get asset Image data
        if (this.signalsCheckboxChecked) {
          this.assetSignalService.getAssetSignalAssociation(this.widgetassetimageID)
          .subscribe(
            response => {
              for (let i = 0; i < response.length; i++) {
                const signal = response[i];
                signal.icon = signal.iconFile + ' ' + this.iconSize;
                signal.latestValue = 0;
                this.displaySignalHoverContent['s-' + i] = false;
              }
              this.associatedSignals = [...response];
            }
          );
        }
        if (this.assetsCheckboxChecked) {
          this.assetService.getParentChildAssetAssociation(this.widgetassetimageID)
            .subscribe(
              response => {
                for (let i = 0; i < response.length; i++) {
                  const asset = response[i];
                  asset.icon = asset.iconFile  + ' ' + this.iconSize;
                  this.displaySignalHoverContent['a-' + i] = false;
                }
                this.associatedAssets = [...response];
              }
          );
        }
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
          this.widgetimgURL = this.domSanitizer.bypassSecurityTrustUrl
          (`data:image/${fileExtension};base64,${this.widgetImageData.logo.image}`);
        } else {
          this.widgetimgURL = '../../../../assets/images/default-image-svg.svg';
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
          this.widgetimgURL = this.domSanitizer.bypassSecurityTrustUrl
          (`data:image/${fileExtension};base64,${this.widgetImageData.logo.image}`);
        } else {
          this.widgetimgURL = '../../../../assets/images/default-image-svg.svg';
        }
      });
  }

  saveImageOverlayConfiguration() {
    if (this.overLaySource === 'location' && !this.widgetlocImageID) {
      this.toaster.onFailure('Please select location for overlay', 'Image Overlay');
      return;
    }
    if (this.overLaySource === 'asset' && !this.widgetassetimageID) {
      this.toaster.onFailure('Please select asset for overlay', 'Image Overlay');
      return;
    }
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
    // signal R code
    let connString = this.parentOrgId + '*' + (this.widgetlocImageID ? this.widgetlocImageID : this.widgetassetimageID);
    console.log(connString);
    // connString = '7a59bdd8-6e1d-48f9-a961-aa60b2918dde*1387c6d3-cabc-41cf-a733-8ea9c9169831';
    this.signalRService.getSignalRConnection(connString);
    this.signalRService.signalData.subscribe(data => {
      console.log(typeof data);

      const jsonData = JSON.parse(JSON.stringify(data));
      console.log('componnet', jsonData.SignalName, '===', jsonData.SignalValue, '=====', jsonData.SensorId);
      const index = this.associatedSignals.findIndex(assSig => {
        console.log(assSig.parkerDeviceId, '===', jsonData.SensorId);
        console.log(assSig.signalId, '===', jsonData.SignalId);
        return assSig.parkerDeviceId === jsonData.SensorId && assSig.signalId === jsonData.SignalId;
      });
      if (index !== -1) {
        this.associatedSignals[index].latestValue = jsonData.SignalValue;
      }

    });
  }

  ngOnDestroy() {
    console.log('on destroy');
    this.signalRService.closeSignalRConnection();
  }

  // image overlay iocn positioning code
  onResize(event) {
    if (this.eloverlayImg) {
      this.imgOffsetTop = this.eloverlayImg.nativeElement.offsetTop;
      this.imgOffsetLeft = this.eloverlayImg.nativeElement.offsetLeft;
      this.imgOffsetWidth = this.eloverlayImg.nativeElement.offsetWidth;
      this.imgOffsetHeight = this.eloverlayImg.nativeElement.offsetHeight;
    }
  }

  onLoadLocImg() {
    const el = this.eloverlayImg.nativeElement;
    const imgType = el.currentSrc.split(/\#|\?/)[0].split('.').pop().trim();
    this.imgOffsetLeft = el.offsetLeft;
    this.imgOffsetTop = el.offsetTop;
    this.imgOffsetWidth = el.offsetWidth;
    this.imgOffsetHeight = el.offsetHeight;
    this.imgParentHeight = el.offsetParent.clientHeight;
    this.imgParentWidth = el.offsetParent.clientWidth;

    if (imgType !== 'svg') {
      this.imgSourceHeight = el.naturalHeight;
      this.imgSourceWidth = el.naturalWidth;
    } else {
      this.imgSourceWidth = 5000;
      this.imgSourceHeight = (5000.0 * parseFloat(el.naturalHeight) / parseFloat(el.naturalWidth)).toFixed(0);
    }
  }

}
