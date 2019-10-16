declare const google: any;

import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { LocationService } from 'src/app/services/locations/location.service';
import { Location } from 'src/app/models/location.model';
import { ConfigSettingsService } from 'src/app/services/configSettings/configSettings.service';
import { ApplicationConfiguration } from 'src/app/models/applicationconfig.model';
import { Address } from 'src/app/models/address.model';
import { UnitOfMeassurement } from 'src/app/models/unitOfMeassurement.model';
import { Logo } from 'src/app/models/logo.model';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { DatePipe, Location as RouterLocation } from '@angular/common';
import { NgForm, FormGroup } from '@angular/forms';
import { VotmCloudConfimDialogComponent } from '../../shared/votm-cloud-confim-dialog/votm-cloud-confim-dialog.component';
import { Observable } from 'rxjs';
import { Select2OptionData } from 'ng2-select2';
declare var $: any;
import { ToastrService } from 'ngx-toastr';
import { Toaster } from '../../shared/votm-cloud-toaster/votm-cloud-toaster';
// import { } from '@types/googlemaps';
import * as moment from 'moment-timezone';
import { countyList } from 'src/app/services/countryList/countryStateList';
import { OrganizationService } from 'src/app/services/organizations/organization.service';
import { SortArrays } from '../../shared/votm-sort';



@Component({
  selector: 'app-votm-cloud-locations-create',
  templateUrl: './votm-cloud-locations-create.component.html',
  styleUrls: ['./votm-cloud-locations-create.component.scss'],
  providers: [DatePipe]
})
export class VotmCloudLocationsCreateComponent implements OnInit {

  public imagePath;
  imgURL: any;
  public message: string;
  closeResult: string;
  modal: any;
  UOM: any;
  pageLabels: any;
  locationTypes: Array<any>;
  states: Array<any> = [];
  countries: Array<any>;
  tempUoM: UnitOfMeassurement;
  tempMeasurement: string;
  parentOrganizationInfo: any;
  isSignalAssociationClicked = false;
  isGatewayAssociationClicked = false;
  pageTitle: string;
  pageType: any;

  uomArray: Array<any> = [];
  uomModels: {};
  locId: string;
  parentLocId: string;
  location: Location = new Location();
  applicationConfiguration: ApplicationConfiguration = new ApplicationConfiguration();
  curOrgId: string;
  curOrgName: string;
  radiusValue: any;
  radiusUnit: any;
  rectangleValue1: any;
  rectangleUnit: any;
  rectangleValue2: any;
  dropdownSettings: {};
  gatewayList: Array<Select2OptionData>; // { item_id: string; item_text: string; }[];
  // gatewayList: Array<any>;
  selectedItems: Array<Select2OptionData>; // { item_id: string; item_text: string; }[];
  previousURLToNavigate: string;
  previousUrl: any;
  subscriptions: any;
  options: Select2Options;
  selectedGateways: string[] = [];

  @ViewChild('locationForm', null) locationForm: NgForm;
  @ViewChild('confirmBox', null) confirmBox: VotmCloudConfimDialogComponent;
  @ViewChild('file', null) locationImage: any;
  @ViewChild('address1', null) address1: any;
  @ViewChild('confirmBoxDash', null) confirmBoxDash: VotmCloudConfimDialogComponent;
  parentLocName: string;
  fileName: any;
  fileExtension: string;
  toaster: Toaster = new Toaster(this.toastr);
  geoLocationErrorMessage: any;

  countryObject: any[] = [];
  // Dashboard Item
  addDashboardmodal: any;
  dashboardData: any;
  dashboardTemplates: {};
  delDashboardId: any;
  // @ViewChild('op', null) panel: OverlayPanel;
  userdashboardData: { id: string; templateName: string; dashboardName: string; dashboardHTML: any; }[];
  dashboardDataById: { act: string; title: string; dashboardName: string; dashboardHTML: any; };
  addDashboardArray: any;
  isAddOrganizationAPILoading = false;
  organizationList: any[] = [];
  locationListForDropDown: any[] = [];

  constructor(
    private modalService: NgbModal,
    private locationService: LocationService,
    private configSettingsService: ConfigSettingsService,
    private domSanitizer: DomSanitizer,
    private activatedRoute: ActivatedRoute,
    private route: Router,
    private datePipe: DatePipe,
    private routerLocation: RouterLocation,
    private toastr: ToastrService,
    private organizationService: OrganizationService
  ) {
    this.UOM = 'SI';
    this.subscriptions = route.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if (this.previousUrl) {
          this.previousURLToNavigate = JSON.parse(JSON.stringify(this.previousUrl));
        }
        this.previousUrl = event.url;
      }
    });
  }

  ngOnInit() {
    // this.locationService.getCountries()
    //   .subscribe(response => {
    //     if (response) {
    //       this.countryObject = response;
    //       this.countries = [];
    //       response.forEach(country => {
    //         this.countries.push({ value: country.countryName, text: country.countryName })
    //       });
    //     }
    //   });
    this.activatedRoute.paramMap.subscribe(params => {
      this.curOrgId = params.get('curOrgId');
      this.curOrgName = params.get('curOrgName');
      this.parentLocId = params.get('parentLocId');
      this.parentLocName = params.get('parentLocName');
      this.locId = params.get('locId');
      if (!this.parentLocId && !this.locId) {
        this.getAllOrganizations();
        this.getAllLocationByOrganization(this.curOrgId);
      }
      if (!this.locId) {
        this.locationObject();
      } else {
        this.getLocationById();
      }
    });

    this.countries = countyList;

    var abbrs = {
      EST: 'Eastern Standard Time',
      EDT: 'Eastern Daylight Time',
      CST: 'Central Standard Time',
      CDT: 'Central Daylight Time',
      MST: 'Mountain Standard Time',
      MDT: 'Mountain Daylight Time',
      PST: 'Pacific Standard Time',
      PDT: 'Pacific Daylight Time',
    };

    moment.fn.zoneName = function () {
      var abbr = this.zoneAbbr();
      return abbrs[abbr] || abbr;
    };

    this.options = {
      multiple: true
    };
    // this.getGeoLocation('London').subscribe(response => {
    //   console.log('response ', response);
    // endpoint - Option List Data ----- Sensor Blocks ------ Cellular Blocks ------ Service Levels
    // });

    this.pageType = this.activatedRoute.snapshot.data['type'];
    this.pageTitle = `${this.pageType} Location`;


    this.parentOrganizationInfo = {
      parentOrganizationId: this.curOrgId,
      parentOrganizationName: this.curOrgName
    };
    this.getScreenLabels();
    this.getAllAppInfo();
    this.location.organizationId = this.parentOrganizationInfo.parentOrganizationId;
    this.location.parentLocationId = this.parentLocId;
    this.tempMeasurement = 'Imperial';
    this.location.active = true;
    this.UOM = 'Imperial';
    this.locationTypes = [{ value: 'locationType1', text: 'locationType1' }, { value: 'locationType2', text: 'locationType2' }];
    // this.locationService.getLocationInfoFromAzureMap(null)
    //   .subscribe(response => {
    //     // console.log('AHAMED from azure map ', response);
    //   })

    this.gateGateways();

    this.multiDropdownConfigSetting();

    // dashboard data
    this.dashboardData = this.getDashboards();
    this.getDashboardsTemplates();
  }

  getAllLocationByOrganization(orgId: string) {
    this.locationService.getAllLocationTree(orgId)
      .subscribe(response => {
        this.location.parentLocationId = null;
        this.locationListForDropDown = response;
        this.locationListForDropDown.sort(SortArrays.compareValues('name'));
      })
  }

  onParentOrgChange(event) {
    this.getAllLocationByOrganization(event.target.value);
  }

  getAllOrganizations() {
    this.organizationService.getAllOrganizationsList()
      .subscribe(response => {
        this.organizationList = response;
        let orgFound = false;
        this.organizationList.forEach(org => {
          if (org.id === this.curOrgId) {
            orgFound = true;
          }
        });
        if (!orgFound) {
          this.organizationList.push({ id: this.curOrgId, name: this.curOrgName });
        }
        this.organizationList.sort(SortArrays.compareValues('name'));
        // this.organization.parentOrganizationId = JSON.parse(JSON.stringify(this.organization.parentOrganizationId));
      });
  }

  getLocationById() {
    this.locationService.getLocationById(this.locId)
      .subscribe(response => {
        this.location = response;
        this.parentLocId = this.location.parentLocationId ? this.location.parentLocationId : this.parentLocId;
        this.parentLocName = this.location.parentLocationName ? this.location.parentLocationName : this.parentLocName;
        if (!this.location.address || this.location.address.length === 0) {
          this.location.address = [new Address()];
          this.location.address[0].addressType = 'Billing';
        }
        this.fetchStates();
        this.selectedGateways = [];
        if (this.location.gateways) {
          this.selectedGateways = [...this.location.gateways];
        }
        if (this.location.logo && this.location.logo.imageName) {
          this.fileExtension = this.location.logo.imageName.slice((Math.max(0, this.location.logo.imageName.lastIndexOf('.')) || Infinity) + 1);
          this.imgURL = this.domSanitizer.bypassSecurityTrustUrl(`data:image/${this.fileExtension};base64,${this.location.logo.image}`);
          this.location.logo.imageType = this.fileExtension;
        }
        // if (this.location.geoFenceType === 'bf0bc7b5-1bf8-4a59-a3b5-35904937e89e' && this.location.geoFenceValue.indexOf('undefined') < 0) {
        //   var str = this.location.geoFenceValue;
        //   var matches = str.match(/(\d+)/);
        //   // console.log(matches[0], str.slice(matches[0].length, str.length - (matches[0].length - 1)));
        //   if (matches && matches.length > 0) {
        //     this.radiusValue = matches[0];
        //     this.radiusUnit = str.slice(matches[0].length, str.length - (matches[0].length - 1));
        //   }
        // }
        // if (this.location.geoFenceType === 'd5764af5-114b-48e6-9980-544634167826' && this.location.geoFenceValue.indexOf('undefined') < 0) {
        //   let str = this.location.geoFenceValue;
        //   var matches = str.split('*')[1].match(/(\d+)/);
        //   var matches2 = str.split('*')[1].match(/[a-zA-Z]/gi);
        //   this.rectangleValue1 = str.split('*')[0];
        //   this.rectangleValue2 = matches[0];
        //   this.rectangleUnit = matches2.join('');
        // }
        // this.location.localeId = this.location.locale;
        // this.location.timeZoneId = this.location.timeZone;
        // this.location.uoMId = this.location.uoM;
      });
  }

  onCountryChange() {
    // console.log('Country change', this.location.address[0].country);
    if (this.location.address && this.location.address.length > 0) {
      this.location.address[0].state = null;
    } else {
      this.location.address = [new Address()];
      this.location.address[0].state = null;
    }
    this.fetchStates();
  }

  fetchStates() {
    this.countries.forEach(country => {
      if (country.countryName === this.location.address[0].country) {
        this.states = [];
        country.states.forEach((state: any) => {
          this.states.push({ value: state, text: state });
        });
      }
    });
  }

  private multiDropdownConfigSetting() {
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
  }

  private gateGateways() {
    this.gatewayList = [
      { id: 'e9004bb5-67cd-466a-9014-034808a4da4b', text: '4G- PVSG-IQAN' },
      { id: 'e9004bb5-67cd-466a-9014-034808a4da4b', text: 'Gateway 2' },
      { id: 'e9004bb5-67cd-466a-9014-034808a4da4b', text: 'Gateway 3' },
      { id: 'e9004bb5-67cd-466a-9014-034808a4da4b', text: 'Gateway 4' },
      { id: 'e9004bb5-67cd-466a-9014-034808a4da4b', text: 'Gateway 5' }
    ];
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  onGeoLocationClick() {
    if (this.checkAddress()) {
      let address = `${this.location.address[0].address1} ${this.location.address[0].address2} ${this.location.address[0].city} ${this.location.address[0].postalCode} ${this.location.address[0].state} ${this.location.address[0].country}`;
      this.locationService.getLocationInfoFromAzureMap(address)
        .subscribe((response: any) => {
          console.log('onGeoLocationClick ', response);
          if (response && response.results && response.results.length > 0) {
            this.location.latitude = response.results[0].position.lat;
            this.location.longitude = response.results[0].position.lon;
          }
        });
    }
  }

  onLookupClick() {
    if (this.checkAddress()) {
      if (this.location.latitude && this.location.longitude) {
        this.locationService.getTimezoneByCordinates(`${this.location.latitude},${this.location.longitude}`)
          .subscribe((response: any) => {
            console.log('onLookupClick ', response);
            if (response && response.TimeZones && response.TimeZones[0].Id) {
              let currentDate = new Date();
              let tempTimezone = moment.tz([currentDate.getFullYear(), currentDate.getMonth()], response.TimeZones[0].Id).format('zz');
              tempTimezone = tempTimezone.toUpperCase();
              tempTimezone = tempTimezone.replace('DAYLIGHT', 'STANDARD');
              this.applicationConfiguration.timeZone.forEach(tz => {
                if (tz.timeZoneName.toUpperCase() === tempTimezone.toUpperCase()) {
                  this.location.timeZoneId = tz.timeZoneId;
                }
              });
            }
          });
      } else {

      }
    }
  }

  checkAddress() {
    if (this.location.address && this.location.address.length > 0) {
      if (this.location.address[0].address1
        && this.location.address[0].city
        && this.location.address[0].country && this.location.address[0].postalCode
        && this.location.address[0].state) {
        return true;
      } else {
        this.geoLocationErrorMessage = 'Address is not correct. ';
        if (!this.location.address[0].address1) {
          this.geoLocationErrorMessage += 'Please fill street name.';
        } else if (!this.location.address[0].city) {
          this.geoLocationErrorMessage += 'Please fill city name.';
        } else if (!this.location.address[0].postalCode) {
          this.geoLocationErrorMessage += 'Please fill postal code.';
        } else if (!this.location.address[0].state) {
          this.geoLocationErrorMessage += 'Please fill state name.';
        } else if (!this.location.address[0].country) {
          this.geoLocationErrorMessage += 'Please fill country name.';
        }
        this.markGeoLocationInvalid();
      }
    } else {
      this.markGeoLocationInvalid();
    }
    return false;
  }

  markGeoLocationInvalid() {
    this.locationForm.form.controls['geoLocationLong'].markAsDirty();
    this.locationForm.form.controls['geoLocationLat'].markAsDirty();
    this.locationForm.form.controls['geoLocationLong'].setErrors({ 'invalidLonLat': true });
    this.locationForm.form.controls['geoLocationLat'].setErrors({ 'invalidLonLat': true });
  }

  // getLocationInfo() {
  //   this.locationService.getLocationById(this.locId)
  //     .subscribe(response => {
  //       // console.log('response ', response);
  //       this.location = response;
  //       this.fillUoM();
  //       this.location.timeZoneId = this.location.timeZone;
  //       this.location.localeId = this.location.locale;
  //       this.location.uoMId = this.location.uoM;
  //     });
  // }


  onItemSelect(data: { value: string[] }) {
    this.location.gateways = (data && data.value) ? data.value : [];
  }
  onSelectAll(items: any) {
  }
  createNestedLocation(event) {
    this.route.navigate([`loc/create/${this.location.locationId}/${this.location.locationName}/${this.location.organizationId}/${this.parentOrganizationInfo.parentOrganizationName}`]);
  }

  creteAsset(event) {
    this.route.navigate([`asset/create/${this.curOrgId}/${this.curOrgName}/${this.location.locationId}/${this.location.locationName}`]);
  }
  locationObject() {
    this.location.address = [new Address()];
    this.location.address[0].addressType = 'Billing';
    this.location.address[0].state = null;
    this.location.address[0].country = null;
    this.location.timeZoneId = null;
    this.location.localeId = null;
  }

  getScreenLabels() {
    this.configSettingsService.getCreateLocScreenLabels()
      .subscribe(response => {
        this.pageLabels = response;
      });
  }

  getAllAppInfo() {
    this.configSettingsService.getApplicationInfo()
      .subscribe((response: any) => {
        this.applicationConfiguration = response;
        let uom = this.applicationConfiguration.unitOfMeassurement;
        this.uomModels = {};
        for (let i = 0; i < uom.length; i++) {
          this.uomModels[uom[i].uomTypeName] = '';
        }
        this.fillUoM();
      });
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
    this.imagePath = files;
    readerToPreview.readAsDataURL(files[0]);
    readerToPreview.onload = (_event) => {
      this.imgURL = this.domSanitizer.bypassSecurityTrustUrl(readerToPreview.result.toString());; //readerToPreview.result;
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
        let base64textString = btoa(data);
        console.log('this.organization ', this.location, data);
        this.location.logo.image = base64textString;
      };

      this.location.logo = new Logo();
      this.location.logo.imageName = file.name;
      this.location.logo.imageType = file.type;
      reader.readAsBinaryString(file);
    }
  }

  _handleReaderLoaded(readerEvt) {
    let base64textString;
    var binaryString = readerEvt.target.result;


    // SVG Code
    // let parser = new DOMParser();
    // let xmlDoc: XMLDocument = parser.parseFromString(binaryString.toString(), 'image/svg+xml');
    // // console.log('XMLDocument ', xmlDoc, xmlDoc.getElementsByTagName('svg'))
    // const xml = (new XMLSerializer()).serializeToString(xmlDoc);
    // const svg64 = btoa(xml);
    // const b64Start = 'data:image/svg+xml;base64,';
    // const image64 = b64Start + svg64;
    // this.location.logo.image = image64;
    // // console.log('this.location.logo.image ', this.location.logo.image)

    // Other Images
    base64textString = btoa(binaryString);
    this.location.logo.image = base64textString;

  }

  open(content) {

    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {

      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {

      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    debugger;
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  openmodal() {
    // Get the modal
    var modal = document.getElementById('myModal');
    modal.style.display = 'block';
    this.modal = document.getElementById('myModal');
    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName('close')[0];

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
      if (event.target == modal) {
        modal.style.display = 'none';

      }
    };

  }
  closemodal(event: string) {
    this.modal.style.display = 'none';
    if (event === 'save') {
      this.UOM = this.tempMeasurement;
      this.location.uoMId = [];
      this.location.uoM = [];
      let uom = this.applicationConfiguration.unitOfMeassurement;
      if (uom && uom.length > 0) {
        for (let i = 0; i < uom.length; i++) {
          if (this.uomModels[uom[i].uomTypeName]) {
            this.location.uoM.push(this.uomModels[uom[i].uomTypeName]);
            this.location.uoMId.push(this.uomModels[uom[i].uomTypeName]);
          }
        }

      }
    } else {
      this.fillUoM();
    }
  }

  onUnitChange(value) {
    this.tempMeasurement = value.target.value;
  }
  onUoMDropdownChange(event, uomName: string) {
    let isFound: boolean = false;
    for (let i = 0; i < this.uomArray.length; i++) {
      if (this.uomArray[i].uoMTypeId === uomName) {
        this.uomArray[i].uoMId = event.target.value;
        isFound = true;
      }
    }

    if (!isFound) {
      this.uomArray.push({ uoMTypeId: uomName, uoMId: event.target.value });
    }
  }

  onUoMValueSelect(uomType, uomMeasureId) {
  }

  // onSuccess(message: string, header: string) {
  //   this.toastr.success(message, header);
  // }

  // onFailure(message: string, header: string) {
  //   this.toastr.error(message, header);
  // }

  onGeoUnitChange() {
    this.location.geoRadius = null;
    this.location.geoWidth = null;
    this.location.geoHeight = null;
    this.location.geoFenceValue = null;
  }

  onLocationSubmit() {
    // this.location.geoRadius = this.location.geoRadius.toString();
    if (this.location.geoFenceType === 'bf0bc7b5-1bf8-4a59-a3b5-35904937e89e') {
      // this.location.geoFenceValue = `${this.radiusValue}${this.radiusUnit}`;
    }
    if (this.location.geoFenceType === 'd5764af5-114b-48e6-9980-544634167826') {
      // this.location.geoFenceValue = `${this.rectangleValue1}*${this.rectangleValue2}${this.rectangleUnit}`;
    }
    if (this.selectedItems && this.selectedItems.length > 0) {
      this.selectedItems.forEach((item) => {
        this.location.gateways.push(item.id);
      });
    }

    if (this.locationForm && this.locationForm.invalid) {
      this.toaster.onFailure('Please fill the form correctly.', 'Form is invalid!');
      Object.keys(this.locationForm.form.controls).forEach(element => {
        this.locationForm.form.controls[element].markAsDirty();
      });
    } else {
      if (this.locId) {
        this.locationService.updateLocation(this.location)
          .subscribe(response => {
            this.toaster.onSuccess('Successfully saved', 'Saved');
            // this.onSuccess('Successfully saved', 'Saved');
            this.routerLocation.back();
          }, error => {
            this.toaster.onFailure('Something went wrong. Please fill the form correctly', 'Fail');
          });
      } else {
        this.locationService.createLocation(this.location)
          .subscribe(response => {
            // console.log('response ', response);
            this.toaster.onSuccess('Successfully saved', 'Saved');
            // if (this.parentLocId && this.parentLocName) {
            //   this.route.navigate([`loc/home/${this.parentLocId}/${this.parentLocName}`]);
            // } else {
            //   this.route.navigate([`org/home/${this.curOrgId}/${this.curOrgName}`]);
            // }
            this.routerLocation.back();
          }, error => {
            this.toaster.onFailure('Something went wrong. Please fill the form correctly', 'Fail');
          });
      }
    }
  }

  onCancelClick(event) {
    this.routerLocation.back();
  }
  openConfirmDialog() {
    this.confirmBox.open();
  }



  deleteOrganizationById(event) {
    if (event) {
      this.locationService.deleteLocation(this.location.locationId)
        .subscribe(response => {
          this.toaster.onSuccess(`You have deleted ${this.location.locationName} successfully.`, 'Delete Success!');
          // this.route.navigate([`loc/home/${this.parentLocId}/${this.parentLocName}`])
          this.routerLocation.back();
        }, error => {
          this.toaster.onFailure('Something went wrong on server. Please try after sometiime.', 'Delete Fail!');
        });
    }
  }


  // onFenceTypeChange(type: string) {
  //   console.log('onFenceTypeChange ', this.location.geoFenceType)
  //   // if (type = 'radius') {
  //   //   this.rectangleUnit = null;
  //   //   this.rectangleValue1 = null;
  //   //   this.rectangleValue2 = null;
  //   // }
  //   // if (type = 'ractangle') {
  //   //   this.radiusUnit = null;
  //   //   this.radiusValue = null;
  //   // }
  // }
  // test() {
  //   console.log('this.radiusUnit ', this.radiusUnit)
  // }

  fillUoM() {
    let uom = this.applicationConfiguration.unitOfMeassurement;

    for (let i = 0; i < uom.length; i++) {
      this.uomModels[uom[i].uomTypeName] = '';
    }

    if (uom && uom.length > 0 && this.location && this.location.uoMId) {
      for (let i = 0; i < uom.length; i++) {
        for (let j = 0; j < this.location.uoMId.length; j++) {
          for (let k = 0; k < uom[i].uoMView.length; k++) {
            if (this.location.uoMId[j] === uom[i].uoMView[k].uoMId) {
              this.uomModels[uom[i].uomTypeName] = uom[i].uoMView[k].uoMId;
            }
          }
        }
      }
    }
  }

  onLockClick() {
    let event = 'view';
    if (this.pageType.toLowerCase() === 'view') {
      event = 'edit';
    }

    if (this.location.parentLocationId) {
      this.route.navigate([`loc/${event}/${this.location.parentLocationId}/${this.location.parentLocationName}/${this.curOrgId}/${this.curOrgName}/${this.location.locationId}`]);
    } else {
      this.route.navigate([`loc/${event}/${this.curOrgId}/${this.curOrgName}/${this.location.locationId}`]);
    }
  }


  // getGeoLocation(address: string): Observable<any> {
  //   console.log('Getting address: ', address);
  //   let geocoder = new google.maps.Geocoder();
  //   return Observable.create(observer => {
  //     geocoder.geocode({
  //       'address': address
  //     }, (results, status) => {
  //       if (status == google.maps.GeocoderStatus.OK) {
  //         console.log('ACCEPTED')
  //         observer.next(results[0].geometry.location);
  //         observer.complete();
  //       } else {
  //         console.log('Error: ', results, ' & Status: ', status);
  //         observer.error();
  //       }
  //     });
  //   });
  // }

  onClickOfNavTab(type) {
    this.isSignalAssociationClicked = false;
    this.isGatewayAssociationClicked = false;
    if (type === 'signal_association') {
      this.isSignalAssociationClicked = true;
    } else if (type === 'gateway_association') {
      this.isGatewayAssociationClicked = true;
    }
  }
  getDashboards() {
    // service to get all dashboards by userid
    this.userdashboardData = [
      // {
      //   id: '1',
      //   templateName: 'Standard Organization Dashboard',
      //   dashboardName: 'Organization Dashboard',
      //   dashboardHTML: ''
      // },
      {
        id: '2',
        templateName: 'Standard Location Dashboard',
        dashboardName: 'Location Dashboard',
        dashboardHTML: ''
      },
      {
        id: '3',
        templateName: 'Standard Asset Dashboard',
        dashboardName: 'Asset Dashboard',
        dashboardHTML: ''
      }
    ];
    return this.userdashboardData;
  }
  getDashboardsTemplates() {
    this.dashboardTemplates = [
      // {
      //   id: '1',
      //   templateName: 'Standard Organization Dashboard'
      // },
      {
        id: '2',
        templateName: 'Standard Location Dashboard'
      },
      {
        id: '3',
        templateName: 'Standard Asset Dashboard'
      }
    ];
  }
  async getDashboardHTML(formName: string, index) {
    console.log(formName, '--getDashboardHTML functiona called');

    // await this.organizationService.getDashboardHTML(formName)
    //   .subscribe(response => {
    //     console.log('return response---', response);
    //     this.userdashboardData[index].dashboardHTML = this.sanitizer.bypassSecurityTrustHtml(response);
    //     setTimeout(() => {
    //       // setData('Hello');
    //     }, 300);
    //   });
  }

  openAddDashboardModal(dashboardAct: string, dashboardId: any, dashboardNames: string) {
    // this.dashBoardDataByID = getDashboardById(dashboardId)
    console.log(dashboardNames);
    if (dashboardAct === 'editDashboard') {
      this.dashboardDataById = {
        act: 'edit',
        title: 'Edit Dashboard',
        dashboardName: dashboardNames,
        dashboardHTML: ''
      };
    } else if (dashboardAct === 'addDashboard') {
      this.dashboardDataById = {
        act: 'create',
        title: 'Create Dashboard',
        dashboardName: '',
        dashboardHTML: ''
      };
    }
    console.log('dashboardDataById---', this.dashboardDataById);
    // Get the modal
    let addDashboardmodal = document.getElementById('addDashboardModalWrapper');
    addDashboardmodal.style.display = 'block';
    this.addDashboardmodal = document.getElementById('addDashboardModalWrapper');
    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName('close')[0];

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
      if (event.target === addDashboardmodal) {
        addDashboardmodal.style.display = 'none';
      }
    };

  }

  onDashboardFormSubmit() {
    console.log('onDashboardFormSubmit', this.dashboardDataById);
    this.addDashboardArray = {
      id: '4',
      templateName: 'Standard Asset Dashboard',
      dashboardName: this.dashboardDataById.dashboardName
    };
    this.dashboardData.push(this.addDashboardArray);
    console.log('this.dashboardData---added', this.dashboardData);
    this.closeAddDashboardModal(true);
  }

  closeAddDashboardModal(event: any) {
    console.log('==', event);
    this.addDashboardmodal.style.display = 'none';
    // if (event === 'save') {
    //
    // } else if (event === 'create') {
    //
    // }
  }

  openDashboardConfirmDialog(delDashboardId, dashboardName) {
    this.delDashboardId = delDashboardId;
    this.message = `Do you want to delete the "${dashboardName}" Dashboard?`;
    this.confirmBoxDash.open();
  }

  deleteOrganizationDashboardById(event) {
    console.log('deleteOrganizationDashboardById===', event);
    if (event) {
      // delete dashboard service goes here
    }
  }

  getDashboardById(dashboardId: any) {
    this.dashboardData = this.getDashboards();
    // return this.dashboardById = this.dashboardData.id;
  }
}
