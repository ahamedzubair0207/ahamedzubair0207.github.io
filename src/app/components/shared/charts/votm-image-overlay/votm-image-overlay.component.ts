import { SharedService } from 'src/app/services/shared.service';
import { DashBoard } from './../../../../models/dashboard.model';
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
import * as moment from 'moment-timezone';
import { VotmCommon } from '../../votm-common';
import { ImageOverlayWidget } from 'src/app/models/image-overlay-widget.model';
import { DashboardService } from 'src/app/services/dasboards/dashboard.service';
import { Logo } from 'src/app/models/logo.model';

@Component({
  selector: 'app-votm-image-overlay',
  templateUrl: './votm-image-overlay.component.html',
  styleUrls: ['./votm-image-overlay.component.scss']
})
export class VotmImageOverlayComponent implements OnInit, OnDestroy {

  @Input() data: DashBoard;
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
  // widgetlocImageID: any;
  widgetImageData: any;
  widgetimgURL: any;
  // iconSize = 'widget-icon-extra-small';
  assetsList: any[] = [];
  assetsSourceChild: any[];
  // widgetassetimageID: any;
  // overLaySource = 'location';
  dashboardWidget: any;
  wId: string;
  parentOrgId: string;
  assetId: string;
  widgetImageOverlaySource: any;
  // signalsCheckboxChecked = true;
  // assetsCheckboxChecked = true;
  @ViewChild('overlayImage', { static: false }) eloverlayImg: ElementRef;
  imgOffsetLeft = null;
  imgOffsetTop = null;
  imgParentWidth = null;
  imgParentHeight = null;
  imgSourceHeight = null;
  imgSourceWidth = null;
  imgOffsetWidth = null;
  imgOffsetHeight = null;
  displaySignalHoverContent: any = {};
  orgId: string;
  message: string;
  widgetCustomImgURL: any;
  loggedInUser: any;
  imageOverlay: ImageOverlayWidget = new ImageOverlayWidget();
  sensors: any;
  showAssoc = true;
  showUnassoc = true;
  disable = false;
  showCustomLayout = false;
  saveCustomImageOverlayFlag = false;
  customImage: Logo;
  assetDashboard = false;

  constructor(
    private toastr: ToastrService,
    private locationSignalService: LocationSignalService,
    private assetSignalService: AssetSignalService,
    private route: ActivatedRoute,
    private locationService: LocationService,
    private assetService: AssetsService,
    private domSanitizer: DomSanitizer,
    private signalRService: SignalRService,
    private sharedService: SharedService,
    private dashboardService: DashboardService
  ) {

  }

  ngOnInit() {
    console.log('image overlay on init');
    this.imageOverlay.overlaySource = 'location';
    this.imageOverlay.iconDisplaySize = 'widget-icon-extra-small';
    this.imageOverlay.showSignals = true;
    this.imageOverlay.showAsset = true;

    this.loggedInUser = this.sharedService.getLoggedInUser();
    this.wId = this.data.dashboardId + '-' + this.id;
    this.isImageOverlayConfigured = false;
    this.widgetImageOverlaySource = ['Location', 'Asset', 'Custom'];
    /// Ahamed Code starts
    if (this.data) {
      if (this.data.dashboardId) {
        this.getDashboardWidget();
      }
    }

    //end
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.curLocId = params.get('locId');
      // this.curLocName = params.get('locName');
      this.parentOrgId = params.get('curOrgId');
      // this.parentOrgName = params.get('orgName');
      this.orgId = params.get('orgId');
      this.assetId = params.get('assetId');
      console.log('m y this.curLocId =', this.curLocId);
      console.log('m y parentOrgId =', this.parentOrgId);
      console.log('m y this.orgId =', this.orgId);
      console.log('m y this.assetId =', this.assetId);

      if ((this.parentOrgId || this.orgId) && !this.curLocId) {
        console.log('Organization dashboard');

        // Organization dashboard
        // fetch all location org id
        if (this.orgId) {
          this.fetchlocationTreeByOrganizationId(this.orgId);
        } else {
          this.fetchlocationTreeByOrganizationId(this.parentOrgId);
        }
        // Fetch all asset tree by orgid
        this.fetchAssetsTreeByOrganizationId();
        // console.log('Organization dashboard');

      } else if (this.curLocId) {
        console.log('Loacation dashboard');
        // Location dashbaord
        // fetch all child location & it selft
        this.fetchlocationTreeByLocationId();

        // fetch all assets by location ID
        // this.fetchlocationTreeById();
        this.fetchAssetsTreeByLocationId();
      } else if (this.assetId) {
        console.log('asset dashboard');
        this.assetDashboard = true;
        this.imageOverlay.overlaySource = 'asset';
        // Asset Dashboard
        // Fetch all child assets & itself
        this.fetchAssetsTreeByAssetId();
      }


    });

  }

  fetchlocationTreeByOrganizationId(organizationID) {
    // console.log('organizationID===', organizationID);

    this.locationService.getAllLocationsTreeByOrganizationID(organizationID).subscribe(response => {
      this.locationsList = [];
      if (response && response.length > 0) {
        // console.log('respponse this.LocationSourceChild by Org id ', response);
        this.LocationSourceChild = this.fillLocationDataList(response, []);
        // console.log('fillLocationDataList this.LocationSourceChild by Org id ', this.LocationSourceChild);
        //this.LocationSourceChild = [];
      }
      // // console.log('location by Org id ', this.locationsList);
      // this.LocationSourceChild = this.locationsList[0].children;
    });
  }

  fetchAssetsTreeByOrganizationId() {
    this.assetService.getAssetTreeByOrgId(this.parentOrgId)
      .subscribe(response => {
        this.assetsList = [];
        if (response && response.length > 0) {
          this.assetsList = this.fillAssetDataList(response, []);
          this.assetsSourceChild = this.assetsList;
        }
        // console.log('assets by Org id ', this.assetsList);
        this.assetsSourceChild = this.assetsList;
      });
  }

  fetchlocationTreeByLocationId() {
    this.locationService.getLocationTreeByID(this.curLocId).subscribe(response => {
      this.locationsList = [];
      if (response && response.length > 0) {
        this.locationsList = this.fillLocationDataList(response, []);
        this.LocationSourceChild = this.locationsList;
      }
      // console.log('my this.locationsList ', this.locationsList);
      // this.LocationSourceChild = this.locationsList[0].children;
      // Requirement to Include Parent location (it self in dropdown)
      // this.LocationSourceChild.push({ data: this.locationsList[0].data });
      // console.log('my updated locationsList ', this.locationsList);
    });
  }

  fetchAssetsTreeByAssetId() {
    this.assetService.getAssetTreeByAssetId(this.assetId)
      .subscribe(response => {
        this.assetsList = [];
        if (response && response.length > 0) {
          this.assetsList = this.fillAssetDataList(response, []);
          // this.assetsList = response[0].node[0].node;
          console.log('response assets by asset id ', response);
          console.log('assetsList assets by asset id ', this.assetsList);
          this.assetsSourceChild = this.assetsList;
        }
        // console.log('assets by asset id ', this.assetsList);
        // this.assetsSourceChild = this.assetsList;

        // this.assetsSourceChild.push({data: response[0].node[0]});
        // // console.log('my updated assets ', this.assetsSourceChild);
      });
  }

  fillLocationData(locations: any[]) {
    const locationList: TreeNode[] = [];
    locations.forEach(org => {
      const tempLoc: TreeNode = { data: org };
      tempLoc.children = [];
      if (org.node && org.node.length > 0) {
        // console.log('org.node====', org.node);
        tempLoc.children = this.fillLocationData(org.node);
      } else {
        tempLoc.children = [];
      }
      locationList.push(tempLoc);
    });
    return locationList;
  }

  fillLocationDataList(locations: any[], list) {
    const locationList = [];
    locations.forEach(loc => {
      list.push(loc);
      if (loc.node && loc.node.length > 0) {
        list = this.fillLocationDataList(loc.node, list);
      }
    });
    return list;
  }

  fetchAssetsTreeByLocationId() {
    this.assetService.getAssetTreeByLocId(this.curLocId)
      .subscribe(response => {
        this.assetsList = [];
        if (response && response.length > 0) {
          this.assetsList = this.fillAssetDataList(response, []);
          console.log('my assetsList  by location dashboard--', this.assetsList);
          console.log('my response  by location dashboard--', response);
          this.assetsSourceChild = this.assetsList;
        }
        // console.log('my assetsList ', this.assetsList);
        // this.assetsSourceChild = this.assetsList;
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

  fillAssetDataList(assets: any[], list) {
    const assetList = [];
    assets.forEach(asset => {
      list.push(asset);
      if (asset.node && asset.node.length > 0) {
        list = this.fillAssetDataList(asset.node, list);
      }
    });
    return list;
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
    if (this.customizeImageOverlay) {
      this.customizeImageOverlay.style.display = 'none';
    }
  }


  getImageOverlayConfiguration(overlaySource) {

    this.isImageOverlayConfigured = true;
    this.associatedSignals = [];
    this.associatedAssets = [];
    if (overlaySource === 'location') {

      // console.log('locationID======', this.widgetlocImageID);
      this.getLocationById(this.imageOverlay.overlaySourceID); // get location Image data
      if (this.imageOverlay.showSignals) {
        this.locationSignalService.getSignalAssociation(this.imageOverlay.overlaySourceID)
          .subscribe(
            response => {
              for (let i = 0; i < response.length; i++) {
                const signal = response[i];
                signal.icon = signal.iconFile + ' ' + this.imageOverlay.iconDisplaySize;
                signal.latestValue = 0;
                signal.modifiedOn =
                  moment(new Date()).tz(this.loggedInUser.userConfigSettings[0].timeZoneDescription)
                    .format(moment.localeData(this.loggedInUser.userConfigSettings[0].localeName)
                      .longDateFormat('L')) + ' '
                  + moment(new Date()).tz(this.loggedInUser.userConfigSettings[0].timeZoneDescription)
                    .format(moment.localeData(this.loggedInUser.userConfigSettings[0].localeName)
                      .longDateFormat('LTS'));
                this.displaySignalHoverContent['s-' + i] = false;
              }
              this.associatedSignals = [...response];
            }
          );
      }
      if (this.imageOverlay.showAsset) {
        this.locationService.getAssetAssociation(this.imageOverlay.overlaySourceID)
          .subscribe(
            response => {
              for (let i = 0; i < response.length; i++) {
                const signal = response[i];
                signal.icon = 'icon-asset-robot ' + this.imageOverlay.iconDisplaySize;
                this.displaySignalHoverContent['a-' + i] = false;
              }
              this.associatedAssets = [...response];
            }
          );
      }
    } else if (overlaySource === 'asset') {

      this.getAssetById(this.imageOverlay.overlaySourceID); // get asset Image data
      if (this.imageOverlay.showSignals) {
        this.assetSignalService.getAssetSignalAssociation(this.imageOverlay.overlaySourceID)
          .subscribe(
            response => {
              for (let i = 0; i < response.length; i++) {
                const signal = response[i];
                signal.icon = signal.iconFile + ' ' + this.imageOverlay.iconDisplaySize;
                signal.modifiedOn =
                  moment(new Date()).tz(this.loggedInUser.userConfigSettings[0].timeZoneDescription)
                    .format(moment.localeData(this.loggedInUser.userConfigSettings[0].localeName)
                      .longDateFormat('L')) + ' '
                  + moment(new Date()).tz(this.loggedInUser.userConfigSettings[0].timeZoneDescription)
                    .format(moment.localeData(this.loggedInUser.userConfigSettings[0].localeName)
                      .longDateFormat('LTS'));
                signal.latestValue = 0;
                this.displaySignalHoverContent['s-' + i] = false;
              }
              this.associatedSignals = [...response];
            }
          );
      }
      if (this.imageOverlay.showAsset) {
        this.assetService.getParentChildAssetAssociation(this.imageOverlay.overlaySourceID)
          .subscribe(
            response => {
              for (let i = 0; i < response.length; i++) {
                const asset = response[i];
                asset.icon = asset.iconFile + ' ' + this.imageOverlay.iconDisplaySize;
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
          let fileExtension = this.widgetImageData.logo.imageName.slice(
            (Math.max(0, this.widgetImageData.logo.imageName.lastIndexOf('.')) || Infinity) + 1);
          // For svg type files use svg+xml as extention
          if (fileExtension === 'svg') {
            fileExtension = 'svg+xml';
          }
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
          let fileExtension = this.widgetImageData.logo.imageName.slice(
            (Math.max(0, this.widgetImageData.logo.imageName.lastIndexOf('.')) || Infinity) + 1);
          // For svg type files use svg+xml as extention
          if (fileExtension === 'svg') {
            fileExtension = 'svg+xml';
          }
          this.widgetimgURL = this.domSanitizer.bypassSecurityTrustUrl
            (`data:image/${fileExtension};base64,${this.widgetImageData.logo.image}`);
        } else {
          this.widgetimgURL = '../../../../assets/images/default-image-svg.svg';
        }
      });
  }


  getDashboardWidget() {
    this.dashboardService.getDashboardWidgets(this.data.dashboardId)
      .subscribe(response => {
        if (response && response.length > 0) {
          response.forEach(widget => {
            if (widget.widgetName === 'Image Overlay Widget') {
              this.dashboardWidget = widget;
              this.imageOverlay = JSON.parse(widget.widgetConfiguration);
              console.log('getDashboardWidget ', this.imageOverlay);
              this.saveImageOverlayConfiguration([], false);
              // if (this.imageOverlay.signals) {
              // }
              // if (this.imageOverlay.signals) {

              // }
            }
          });

        }
      });
  }

  saveImageOverlayConfiguration(droppedList, saveChartWidget: boolean = true) {
    if (this.imageOverlay && this.imageOverlay.overlaySource === 'location' && !this.imageOverlay.overlaySourceID) {
      this.toaster.onFailure('Please select location for overlay', 'Image Overlay');
      return;
    }
    if (this.imageOverlay.overlaySource === 'asset' && !this.imageOverlay.overlaySourceID) {
      this.toaster.onFailure('Please select asset for overlay', 'Image Overlay');
      return;
    }
    console.log('imageOverlay ', this.imageOverlay);
    let body = {};
    if (this.imageOverlay.overlaySource === 'location' || this.imageOverlay.overlaySource === 'asset') {
      body = {
        widgetName: 'Image Overlay Widget',
        dashBoardId: this.data ? this.data.dashboardId : null,
        widgetConfiguration: JSON.stringify(this.imageOverlay),
        published: true,
        active: true,
      };
    } else {
      console.log('custom widget', droppedList);
      this.imageOverlay.droppedList = droppedList;
      this.imageOverlay.customImage = this.customImage;
      body = {
        widgetName: 'Image Overlay Widget',
        dashBoardId: this.data ? this.data.dashboardId : null,
        widgetConfiguration: JSON.stringify(this.imageOverlay),
        published: true,
        active: true,
      };
      //return;
    }

    if (saveChartWidget) {
      if (this.dashboardWidget) {
        body['dashboardWidgetId'] = this.dashboardWidget.dashboardWidgetId;
        this.dashboardService.updateDashboardWidget(body)
          .subscribe(response => {
            console.log('Updated successfully ', response);
            this.customizeImageOverlay.style.display = 'none';
            this.toaster.onSuccess('Chart Updated Successfully', 'Success');
          });
      } else {
        this.dashboardService.saveDashboardWidget(body)
          .subscribe(response => {
            console.log('saved successfully ', response);
            this.customizeImageOverlay.style.display = 'none';
            this.toaster.onSuccess('Chart Configured Successfully', 'Success');
          });
      }
    }

    this.getImageOverlayConfiguration(this.imageOverlay.overlaySource);

    // signal R code
    console.log('signalR connection code');
    const connString = 'Sensor*' + this.parentOrgId + '*' + this.imageOverlay.overlaySourceID;
    // console.log(connString);
    // connString = '7a59bdd8-6e1d-48f9-a961-aa60b2918dde*1387c6d3-cabc-41cf-a733-8ea9c9169831';
    this.signalRService.getSignalRConnection(connString);
    this.signalRService.signalData.subscribe(data => {
      // console.log(typeof data);

      const jsonData = JSON.parse(JSON.stringify(data));
      // console.log('componnet', jsonData.SignalName, '===', jsonData.SignalValue, '=====', jsonData.ParkerDeviceId);
      const index = this.associatedSignals.findIndex(assSig => {
        // console.log(jsonData);
        // console.log(assSig.parkerDeviceId, '===', jsonData.ParkerDeviceId);
        // console.log(assSig.signalId, '===', jsonData.SignalId);
        return assSig.parkerDeviceId === jsonData.ParkerDeviceId && assSig.signalId === jsonData.SignalId;
      });
      if (index !== -1) {
        this.convertUOMData(jsonData, index);
      }
    });
  }

  saveCustomImageOverlayPressed() {
    // this
    this.saveCustomImageOverlayFlag = true;
    console.log('image overlay saveCustomImageOverlayConfiguration==', this.saveCustomImageOverlayFlag);

  }

  convertUOMData(signalRObj, index) {
    const arr = [];
    arr.push({
      uomValue: signalRObj.SignalValue,
      signalId: signalRObj.SignalId,
      sensorId: signalRObj.SensorId
    });
    const obj = {
      userId: this.loggedInUser.userId,
      organizationId: this.parentOrgId,
      locationId: this.imageOverlay.overlaySource === 'Location' ? this.imageOverlay.overlaySourceID : undefined,
      precision: 3,
      uom: arr
    };

    this.sharedService.getUOMConversionData(obj).subscribe(
      response => {

        this.associatedSignals[index].latestValue = response[0].uomValue + (response[0].uomname ? ' ' + response[0].uomname : '');
        this.associatedSignals[index].modifiedOn =
          moment(signalRObj.RecievedDateTime).tz(this.loggedInUser.userConfigSettings[0].timeZoneDescription)
            .format(moment.localeData(this.loggedInUser.userConfigSettings[0].localeName)
              .longDateFormat('L')) + ' '
          + moment(signalRObj.RecievedDateTime).tz(this.loggedInUser.userConfigSettings[0].timeZoneDescription)
            .format(moment.localeData(this.loggedInUser.userConfigSettings[0].localeName)
              .longDateFormat('LTS'));

      }
    );
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


  preview(files) {
    this.message = '';
    if (files.length === 0) {
      return;
    }

    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = 'Only images are supported.';
      return;
    }
    this.handleFileSelect(files);
    var readerToPreview = new FileReader();
    // this.imagePath = files;
    readerToPreview.readAsDataURL(files[0]);
    readerToPreview.onload = (_event) => {
      this.widgetCustomImgURL = this.domSanitizer.bypassSecurityTrustUrl(readerToPreview.result.toString()); //readerToPreview.result;
      this.getCustomEntityAndSignal();
      this.showCustomLayout = true;
    };
  }

  handleFileSelect(files) {
    var file = files[0];
    if (files && file) {
      var reader: any = new FileReader();
      // reader.onload = this._handleReaderLoaded.bind(this);
      reader.onload = (e) => {
        // ADDED CODE
        let data;
        if (!e) {
          data = reader.content;
        } else {
          data = e.target.result;
        }
        const base64textString = btoa(data);
        this.customImage = new Logo();
        this.customImage.image = base64textString;
        this.customImage.imageName = file.name;
        this.customImage.imageType = file.type;
      };
      reader.readAsBinaryString(file);
    }
  }

  _handleReaderLoaded(readerEvt) {
    let base64textString;
    var binaryString = readerEvt.target.result;


    // SVG Code
    // let parser = new DOMParser();
    // let xmlDoc: XMLDocument = parser.parseFromString(binaryString.toString(), 'image/svg+xml');
    // // // console.log('XMLDocument ', xmlDoc, xmlDoc.getElementsByTagName('svg'))
    // const xml = (new XMLSerializer()).serializeToString(xmlDoc);
    // const svg64 = btoa(xml);
    // const b64Start = 'data:image/svg+xml;base64,';
    // const image64 = b64Start + svg64;
    // this.location.logo.image = image64;
    // // // console.log('this.location.logo.image ', this.location.logo.image)

    // Other Images
    base64textString = btoa(binaryString);
    // this.userprofile.logo.image = base64textString;

  }

  getAlarmStatusclass(alarmStatus) {
    if (
      alarmStatus === 'High Critical' ||
      alarmStatus === 'HighCritical' ||
      alarmStatus === 'Low Critical' ||
      alarmStatus === 'LowCritical'
    ) {
      return 'icon-state-danger';
    } else if (
      alarmStatus === 'High Warning' ||
      alarmStatus === 'HighWarning' ||
      alarmStatus === 'Low Warning' ||
      alarmStatus === 'LowWarning'
    ) {
      return 'icon-state-warning';
    } else {
      return 'icon-state-success';
    }
  }

  getAssetChildNode(assets, actualAssets) {
    for (const item of assets) {
      item.associated = false;
      item.icon = 'icon-asset-robot';
      item.associationName = item.name;
      item.associated = false;
      actualAssets.push(item);
    }
    return actualAssets;
  }

  getAssetsByLocation(locationId) {
    this.assetService.getAssetTreeByLocId(locationId)
      .subscribe(async response => {
        response = await this.getAssetChildNode(response, []);
        this.assetsList = this.sharedService.toSortListAlphabetically(response, 'name');
        this.getAssetAssociation(locationId);
      });
  }

  getAssetAssociation(locationId) {
    this.locationService.getAssetAssociation(locationId)
      .subscribe(
        response => {
          for (let i = 0; i < response.length; i++) {
            const childAsset = response[i];
            childAsset.isClicked = false;
            childAsset.icon = 'icon-asset-robot';
            childAsset.associated = true;
            childAsset.did = i;
            childAsset.bound = true;
            childAsset.imageCordinates = childAsset.imageCoordinates[childAsset.assetId];
            childAsset.pctPos = {};

            childAsset.pctPos['left'] = childAsset.imageCordinates.x;
            childAsset.pctPos['top'] = childAsset.imageCordinates.y;
          }
          this.associatedAssets = [...response];
          for (let i = 0; i < this.assetsList.length; i++) {
            const childAsset = this.assetsList[i];
            const index = this.associatedAssets.findIndex(assChild => assChild.assetId === childAsset.id);
            // console.log(index);
            if (index !== -1) {
              childAsset.associated = true;
              // console.log(this.location);
              // this.associatedAssets[index].organizationId = this.location.organizationId;
              // this.associatedAssets[index].locationId = this.location.locationId;
              // this.associatedAssets[index].locationName = this.location.locationName;
              this.associatedAssets[index].associationName = childAsset.name;
              // console.log(this.associatedAssets[index]);
            } else {
              childAsset.pctPos = { left: 0, top: 0 };
              childAsset.isClicked = false;
              childAsset.icon = 'icon-asset-robot';
              childAsset.associated = true;
              childAsset.did = this.associatedAssets.length;
              childAsset.bound = true;
              this.associatedAssets.push(childAsset);
            }
          }
          // console.log('aftererrrrrrrrrrrrr    ', this.associatedAssets.length);

        });
  }

  getCustomEntityAndSignal() {
    console.log('overLaySource', this.imageOverlay.overlaySource);
    if (this.imageOverlay.overlaySource === 'custom') {
      let entityId = '';
      if (this.curLocId) {
        entityId = this.curLocId;
      }

      // this.locationSignalService.getSignalAssociation(entityId)
      //   .subscribe(
      //     response => {
      //       this.associatedSignals = [...response];
      //     }
      // );

      this.getAssetsByLocation(entityId);
      this.getLocationSignalAssociation(entityId);

    }

  } // End - getCustomEntityAndSignal

  getLocationSignalAssociation(locationId) {
    this.locationSignalService.getSignalAssociation(locationId)
      .subscribe(
        response => {
          this.getLocationAllAvailableSignals(locationId);
          for (let i = 0; i < response.length; i++) {
            const signal = response[i];
            signal.imageCordinates = signal.imageCordinates[signal.associationName];
            signal.pctPos = {};
            signal.pctPos['left'] = signal.imageCordinates.x;
            signal.pctPos['top'] = signal.imageCordinates.y;
            signal.isClicked = false;
            signal.icon = signal.iconFile;
            signal.associated = true;
            signal.did = i;
            signal.bound = signal.sensorLinkStatus;
          }
          // this.associatedSignals = [...response];
        },
        error => {

        }
      );
  }

  /**
   * To get all available signals for that location and organization.
   * Location id and Organization Id will fetch from current route.
   * This function sets the sensor disable which are already associated.
   */
  getLocationAllAvailableSignals(locationId) {
    this.locationSignalService.getSignalsByLocation('location', locationId)
      .subscribe(async response => {
        // console.log(response);
        this.sensors = response;
        for (const sensor of this.sensors) {
          sensor.node = await this.sharedService.toSortListAlphabetically(sensor.node, 'signalName');
          for (const signal of sensor.node) {
            signal.sensorId = sensor.sensorId;
            signal.sensorName = sensor.sensorName;
            signal.signalId = signal.signalId;
            signal.signalName = signal.signalName;
            signal.associationName = signal.signalName;
            signal.associated = false;
            signal.imageCordinates = {
              x: 0,
              y: 0
            };
            signal.icon = signal.iconFile;
            for (const associateSignal of this.associatedSignals) {
              if (associateSignal.signalId === signal.signalId &&
                associateSignal.sensorId === signal.sensorId && sensor.isLink) {
                signal.associated = true;
                signal.associationName = associateSignal.associationName;

              }
            }
          }
        }

      },
        error => {

        });
  }

  showSignal(signal: any): boolean {
    return (signal.associated && this.showAssoc) || ((!signal.associated) && this.showUnassoc);
  }

  showSensor(signals: any): boolean {
    let hasAssocSignals = false;
    signals.forEach(signal => {
      hasAssocSignals = hasAssocSignals || ((signal.associated && this.showAssoc) || ((!signal.associated) && this.showUnassoc));
    });
    return hasAssocSignals;
  }

}
