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



@Component({
  selector: 'app-votm-cloud-locations-create',
  templateUrl: './votm-cloud-locations-create.component.html',
  styleUrls: ['./votm-cloud-locations-create.component.scss']
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
  states: Array<any>;
  countries: Array<any>;
  tempUoM: UnitOfMeassurement;
  tempMeasurement: string;
  parentOrganizationInfo: any;

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
  gatewayList: Array<Select2OptionData>; //{ item_id: string; item_text: string; }[];
  selectedItems: Array<Select2OptionData>; // { item_id: string; item_text: string; }[];
  previousURLToNavigate: string;
  previousUrl: any;
  subscriptions: any;
  options: Select2Options;
  selectedGateways: string[] = [];

  @ViewChild('locationForm', null) locationForm: NgForm;
  @ViewChild('confirmBox', null) confirmBox: VotmCloudConfimDialogComponent;
  @ViewChild('file', null) locationImage: any;
  parentLocName: string;
  fileName: any;
  fileExtension: string;
  toaster: Toaster = new Toaster(this.toastr);
  constructor(private modalService: NgbModal, private locationService: LocationService,
    private configSettingsService: ConfigSettingsService, private domSanitizer: DomSanitizer,
    private activatedRoute: ActivatedRoute, private route: Router, private datePipe: DatePipe,
    private routerLocation: RouterLocation, private toastr: ToastrService) {
    this.UOM = "SI";
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
    this.curOrgId = this.activatedRoute.snapshot.paramMap.get("curOrgId");
    this.curOrgName = this.activatedRoute.snapshot.paramMap.get("curOrgName");
    this.parentLocId = this.activatedRoute.snapshot.paramMap.get("parentLocId");
    this.parentLocName = this.activatedRoute.snapshot.paramMap.get("parentLocName");

    this.options = {
      multiple: true
    }
    // this.getGeoLocation('London').subscribe(response => {
    //   console.log('response ', response);
    // });

    this.pageType = this.activatedRoute.snapshot.data['type'];
    this.pageTitle = `${this.pageType} Location`;
    this.locId = this.activatedRoute.snapshot.params['locId'];

    this.parentOrganizationInfo = {
      parentOrganizationId: this.curOrgId,
      parentOrganizationName: this.curOrgName
    }
    this.getScreenLabels();
    this.getAllAppInfo();
    this.location.organizationId = this.parentOrganizationInfo.parentOrganizationId;
    this.location.parentLocationId = this.parentLocId;
    this.tempMeasurement = 'SI';
    this.location.active = true;
    this.UOM = 'SI';
    this.locationTypes = [{ value: 'locationType1', text: 'locationType1' }, { value: 'locationType2', text: 'locationType2' }]
    this.states = [{ value: 'state1', text: 'MN' },
    { value: 'state2', text: 'OH' }];
    this.countries = [{ value: 'country1', text: 'USA' },
    { value: 'country2', text: 'Brazil' }];
    this.locationService.getLocationInfoFromAzureMap(null)
      .subscribe(response => {
        console.log('AHAMED from azure map ', response);
      })

    this.gateGateways();
    this.location.address = [new Address()];
    this.location.address[0].addressType = 'Billing';
    this.multiDropdownConfigSetting();
    if (!this.locId) {

      this.locationObject();
      // this.selectedItems = [];
    } else {
      this.locationService.getLocationById(this.locId)
        .subscribe(response => {
          this.location = response;
          this.parentLocId = this.location.parentLocationId ? this.location.parentLocationId : this.parentLocId;
          this.parentLocName = this.location.parentLocationName ? this.location.parentLocationName : this.parentLocName;
          // this.selectedItems = [this.location.gatewayId]
          if (!this.location.address || this.location.address.length === 0) {
            this.location.address = [new Address()];
            this.location.address[0].addressType = 'Billing';
          }

          this.selectedGateways = [];
          if (this.location.gatewayId) {
            this.selectedGateways.push(this.location.gatewayId);
          }
          // this.gatewayList.forEach(gateway => {
          //   if (gateway.id === this.location.gatewayId) {
          //     this.selectedItems = [gateway];
          //   }
          // });
          if (this.location.logo && this.location.logo.imageName) {
            this.fileExtension = this.location.logo.imageName.slice((Math.max(0, this.location.logo.imageName.lastIndexOf(".")) || Infinity) + 1);
            this.imgURL = this.domSanitizer.bypassSecurityTrustUrl(`data:image/${this.fileExtension};base64,${this.location.logo.image}`);
            this.location.logo.imageType = this.fileExtension;
          }
          if (this.location.geoFenceType === 'bf0bc7b5-1bf8-4a59-a3b5-35904937e89e' && this.location.geoFenceValue.indexOf('undefined') < 0) {
            var str = this.location.geoFenceValue;
            var matches = str.match(/(\d+)/);
            // console.log(matches[0], str.slice(matches[0].length, str.length - (matches[0].length - 1)));
            if (matches && matches.length > 0) {
              this.radiusValue = matches[0];
              this.radiusUnit = str.slice(matches[0].length, str.length - (matches[0].length - 1));
            }
          }
          if (this.location.geoFenceType === 'd5764af5-114b-48e6-9980-544634167826' && this.location.geoFenceValue.indexOf('undefined') < 0) {
            let str = this.location.geoFenceValue;
            var matches = str.split('*')[1].match(/(\d+)/);
            var matches2 = str.split('*')[1].match(/[a-zA-Z]/gi);
            console.log('matches2 ', matches2.join(''))
            console.log(str.split('*')[1], str.split('*')[1].slice(matches[0].length, str.split('*')[1].length - (matches[0].length - 1)));
            this.rectangleValue1 = str.split('*')[0];
            this.rectangleValue2 = matches[0];
            this.rectangleUnit = matches2.join('');
          }
          this.location.localeId = this.location.locale;
          this.location.timeZoneId = this.location.timeZone;
          this.location.uoMId = this.location.uoM;
        })
    }
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
    this.checkAddress();
  }

  checkAddress() {
    if (this.location.address && this.location.address.length > 0
      && this.location.address[0].address1
      && this.location.address[0].city
      && this.location.address[0].country && this.location.address[0].postalCode
      && this.location.address[0].state) {
      let address = `${this.location.address[0].address1} ${this.location.address[0].address2} ${this.location.address[0].city} ${this.location.address[0].postalCode} ${this.location.address[0].state} ${this.location.address[0].country}`;
      console.log('AHAMED ADDRESS ', address);
      this.locationService.getLocationInfoFromAzureMap(address)
        .subscribe((response: any) => {
          console.log('response ', response);
          if(response && response.results && response.results.length>0){
            this.location.latitude = response.results[0].position.lat;
            this.location.longitude = response.results[0].position.lon;
          }
        });
    }
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
    this.location.gatewayId = (data && data.value) ? data.value[0] : null;
    console.log('location.gatewayId ', data.value);
  }
  onSelectAll(items: any) {
  }
  createNestedLocation(event) {
    this.route.navigate([`loc/create/${this.location.locationId}/${this.location.locationName}/${this.location.organizationId}/${this.parentOrganizationInfo.parentOrganizationName}`])
  }

  creteAsset(event) {
    this.route.navigate([`asset/create`])
  }
  locationObject() {
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
    this.message = "";
    if (files.length === 0)
      return;

    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }
    this.handleFileSelect(files);
    var readerToPreview = new FileReader();
    this.imagePath = files;
    readerToPreview.readAsDataURL(files[0]);
    readerToPreview.onload = (_event) => {
      this.imgURL = this.domSanitizer.bypassSecurityTrustUrl(readerToPreview.result.toString());; //readerToPreview.result;
    }
  }

  handleFileSelect(files) {
    var file = files[0];
    if (files && file) {
      var reader = new FileReader();
      reader.onload = this._handleReaderLoaded.bind(this);

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
    debugger
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
    var modal = document.getElementById("myModal");
    modal.style.display = "block";
    this.modal = document.getElementById("myModal");
    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
      if (event.target == modal) {
        modal.style.display = "none";

      }
    }

  }
  closemodal(event: string) {
    this.modal.style.display = "none";
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

  onLocationSubmit() {
    console.log('location.gatewayId ', this.location.gatewayId, this.selectedGateways);
    if (this.location.geoFenceType === 'bf0bc7b5-1bf8-4a59-a3b5-35904937e89e') {
      this.location.geoFenceValue = `${this.radiusValue}${this.radiusUnit}`;
    }
    if (this.location.geoFenceType === 'd5764af5-114b-48e6-9980-544634167826') {
      this.location.geoFenceValue = `${this.rectangleValue1}*${this.rectangleValue2}${this.rectangleUnit}`;
    }
    // if (this.selectedItems && this.selectedItems.length > 0) {
    //   this.location.gatewayId = this.selectedItems[0].id;
    //   // this.selectedItems.forEach((item) => {
    //   //   this.location.gatewayId.push(item.item_id);
    //   // })
    // }

    console.log('locationForm ', this.locationForm);
    if (this.locationForm && this.locationForm.invalid) {
      this.toaster.onFailure('Please fill the form correctly.', 'Form is invalid!')
      console.log('If block ');
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
            console.log('AHAMED ERROR ', error)
            this.toaster.onFailure('Something went wrong. Please fill the form correctly', 'Fail');
          });
      } else {
        this.locationService.createLocation(this.location)
          .subscribe(response => {
            // console.log('response ', response);
            this.toaster.onSuccess('Successfully saved', 'Saved');
            if (this.parentLocId && this.parentLocName) {
              this.route.navigate([`loc/home/${this.parentLocId}/${this.parentLocName}`]);
            } else {
              this.route.navigate([`org/home/${this.curOrgId}/${this.curOrgName}`]);
            }
          }, error => {
            console.log('AHAMED ERROR ', error)
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
    console.log('event on close ', event);
    if (event) {
      this.locationService.deleteLocation(this.location.locationId)
        .subscribe(response => {
          this.toaster.onSuccess(`You have deleted ${this.location.locationName} successfully.`, 'Delete Success!');
          this.route.navigate([`loc/home/${this.parentLocId}/${this.parentLocName}`])
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

    if (uom && uom.length > 0 && this.location && this.location.uoM) {
      for (let i = 0; i < uom.length; i++) {
        for (let j = 0; j < this.location.uoM.length; j++) {
          for (let k = 0; k < uom[i].uoMView.length; k++) {
            if (this.location.uoM[j] === uom[i].uoMView[k].uoMId) {
              this.uomModels[uom[i].uomTypeName] = uom[i].uoMView[k].uoMId;
            }
          }
        }
      }
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
}
