import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { OrganizationService } from 'src/app/services/organizations/organization.service';
import { Organization } from 'src/app/models/organization.model';
import { ConfigSettingsService } from 'src/app/services/configSettings/configSettings.service';
import { ApplicationConfiguration } from 'src/app/models/applicationconfig.model';
import { Address } from 'src/app/models/address.model';
import { UnitOfMeassurement } from 'src/app/models/unitOfMeassurement.model';
import { Logo } from 'src/app/models/logo.model';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Route, Routes, Router, NavigationEnd } from '@angular/router';
import { DatePipe, Location as RouterLocation } from '@angular/common';
import { NgForm, FormGroup } from '@angular/forms';
import { VotmCloudConfimDialogComponent } from '../../shared/votm-cloud-confim-dialog/votm-cloud-confim-dialog.component';
import { Toaster } from '../../shared/votm-cloud-toaster/votm-cloud-toaster';
import { ToastrService } from 'ngx-toastr';
import { AlertsService } from '../../../services/alerts/alerts.service';
import { countyList } from 'src/app/services/countryList/countryStateList';

@Component({
  selector: 'app-votm-cloud-organizations-create',
  templateUrl: './votm-cloud-organizations-create.component.html',
  styleUrls: ['./votm-cloud-organizations-create.component.scss']
})
export class VotmCloudOrganizationsCreateComponent implements OnInit {
  public imagePath;
  imgURL: any;
  public message: string;
  closeResult: string;
  modal: any;
  UOM: any;
  pageLabels: any;
  organizationTypes: Array<any>;
  states: Array<any> = [];
  countries: Array<any> = [];
  tempUoM: UnitOfMeassurement;
  tempMeasurement: string;
  parentOrganizationInfo: any;

  pageTitle: string;
  pageType: string;

  uomModels: {};
  uomArray: any[];

  alertRuleList: any[] = [];

  orgId: string;
  previousURLToNavigate: string;
  subscription: any;
  organization: Organization = new Organization();
  applicationConfiguration: ApplicationConfiguration = new ApplicationConfiguration();
  curOrgId: any;
  curOrgName: any;
  previousUrl: any;


  @ViewChild('startDate', null) startDate: NgForm;
  @ViewChild('organizationForm', null) organizationForm: NgForm;
  @ViewChild('confirmBox', null) confirmBox: VotmCloudConfimDialogComponent;
  @ViewChild('file', null) logoImage: any;
  fileName: any;
  fileExtension: string;
  previousUOM: any;
  toaster: Toaster = new Toaster(this.toastr);
  svcLevels: any[] = [];
  sensorBlocks: any[] = [];
  cellularBlocks: any[] = [];
  organizationList: any[] = [];
  countryObject: any[] = [];

  constructor(private modalService: NgbModal, private alertRuleservice: AlertsService, private organizationService: OrganizationService,
    private configSettingsService: ConfigSettingsService, private domSanitizer: DomSanitizer,
    private activeroute: ActivatedRoute, private route: Router, private datePipe: DatePipe,
    private routerLocation: RouterLocation, private toastr: ToastrService) {
    this.UOM = "SI";
    this.subscription = route.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if (this.previousUrl) {
          this.previousURLToNavigate = JSON.parse(JSON.stringify(this.previousUrl));
        }
        this.previousUrl = event.url;
      }
    });
    // this.route.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit() {
    this.activeroute.paramMap.subscribe(params => {
      this.curOrgId = params.get("curOrgId");
      this.curOrgName = params.get("curOrgName");
      this.orgId = params.get('orgId');

      // this.organizationService.getCountries()
      // .subscribe(response => {
      //   if (response) {
      //     this.countryObject = response;
      //     this.countries = [];
      //     response.forEach(country => {
      //       this.countries.push({ value: country.countryName, text: country.countryName })
      //     });
      //   }
      // });
      this.countries = countyList;
      console.log(' this.countries ',  this.countries)

      this.getOptionsListData('Sensor Blocks');
      this.getOptionsListData('Cellular Blocks');
      this.getOptionsListData('Service Levels');
      this.getAllOrganizations();

      if (this.orgId) {
        this.getOrganizationInfo();
      }
      else {
        this.parentOrganizationInfo = {
          // parentOrganizationId: this.curOrgId, // '7A59BDD8-6E1D-48F9-A961-AA60B2918DDE',
          // parentOrganizationName: this.curOrgName // 'Parker1'
          parentOrganizationId: this.activeroute.snapshot.paramMap.get("curOrgId"), // '7A59BDD8-6E1D-48F9-A961-AA60B2918DDE',
          parentOrganizationName: this.activeroute.snapshot.paramMap.get("curOrgName") // 'Parker1'
        }
        this.organization.parentOrganizationId = this.parentOrganizationInfo.parentOrganizationId;
        this.organization.active = true;

        this.UOM = 'SI';
        this.organization.address = [new Address()];
        this.organization.address[0].addressType = 'Billing';

      }
    });

    this.pageType = this.activeroute.snapshot.data['type'];
    this.pageTitle = `${this.pageType} Organization`;
    this.tempMeasurement = 'SI';


    this.getScreenLabels();
    this.getAllAppInfo();

    this.organizationTypes = [{ value: 'organizationType1', text: 'organizationType1' }, { value: 'organizationType2', text: 'organizationType2' }]
  }

  onCountryChange(event) {
    console.log('Country change ', this.organization.address[0].country);
    if (this.organization.address && this.organization.address.length > 0) {
      this.organization.address[0].state = null;     
    } else {
      this.organization.address = [new Address()];
      this.organization.address[0].state = null;
    }
    this.countries.forEach(country => {
      if (country.countryName === this.organization.address[0].country) {
        this.states = [];
        country.states.forEach((state: any) => {
          this.states.push({ value: state, text: state });
        });
      }
    });
  }



  showImageLogo() {
    if (this.logoImage) {
    } else {
      setTimeout(() => {
        this.showImageLogo();
      }, 10);
    }
  }

  ngAfterViewInit() {
    this.showImageLogo();

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onStartDateChange() {
    this.organizationForm.form.controls['startDate'].markAsDirty();
    this.compareDate();
  }

  compareDate() {
    if (this.organization.contractStartDate && this.organization.contractEndDate) {
      if (this.organization.contractStartDate >= this.organization.contractEndDate) {
        this.organizationForm.form.controls['startDate'].setErrors({ 'invalidDate': true })
      } else {
        this.organizationForm.form.controls['startDate'].setErrors(null);
      }
    }
  }

  onEndDateChange() {
    this.organizationForm.form.controls['endDate'].markAsDirty();
    this.compareDate();
  }

  onDescriptionChange() {
    if (this.organization.description && this.organization.description.length > 4000) {
      this.organizationForm.form.controls['orgDescription'].setErrors({ 'invalidDescription': true })
    }
  }


  getOrganizationInfo() {
    this.organizationService.getOrganizationById(this.orgId)
      .subscribe(response => {
        this.organization = response;
        this.fillUoM();
        this.organization.timeZoneId = this.organization.timeZone;
        this.organization.localeId = this.organization.locale;
        this.organization.uoMId = this.organization.uoM;

        this.organization.contractStartDate = this.datePipe.transform(this.organization.contractStartDate, 'yyyy-MM-dd')
        this.organization.contractEndDate = this.datePipe.transform(this.organization.contractEndDate, 'yyyy-MM-dd')

        if (this.organization.logo && this.organization.logo.imageName) {
          this.fileExtension = this.organization.logo.imageName.slice((Math.max(0, this.organization.logo.imageName.lastIndexOf(".")) || Infinity) + 1);
          this.imgURL = this.domSanitizer.bypassSecurityTrustUrl(`data:image/${this.fileExtension};base64,${this.organization.logo.image}`);
          this.organization.logo.imageType = this.fileExtension;
        }

      });
  }

  getScreenLabels() {
    this.configSettingsService.getCreateOrgScreenLabels()
      .subscribe(response => {
        this.pageLabels = response;
      })
  }

  getOptionsListData(listData: string) {
    this.organizationService.getOptionsListData(listData)
      .subscribe(response => {
        if (listData === 'Service Levels') {
          this.svcLevels = [];
          this.svcLevels = response;
        }
        if (listData === 'Sensor Blocks') {
          this.sensorBlocks = [];
          this.sensorBlocks = response;
        }
        if (listData === 'Cellular Blocks') {
          this.cellularBlocks = [];
          this.cellularBlocks = response;
        }
      });
  }

  deleteOrganizationById(event) {
    if (event) {
      this.organizationService.deleteOrganization(this.organization.organizationId)
        .subscribe(response => {
          this.toaster.onSuccess(`You have deleted ${this.organization.name} successfully`, 'Delete Success!');
          this.route.navigate([`org/home/${this.curOrgId}/${this.curOrgName}`]);

        }, error => {
          this.toaster.onFailure('Something went wrong on server. Please try after sometiime.', 'Delete Fail!');
        });
    }
  }

  createNestedOrganization(event) {
    this.route.navigate([`org/create/${this.organization.organizationId}/${this.organization.name}`])
  }

  createNestedLocation(event) {
    // let parentLocId = '19d7e5e5-fda7-4778-b943-62e36078087a';
    // let parentLocName = 'Mineapolis';
    this.route.navigate([`loc/create/${this.organization.organizationId}/${this.organization.name}`])
  }

  openConfirmDialog() {

    this.confirmBox.open();

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
        // this.uomArray = new Array[this.applicationConfiguration.unitOfMeassurement.length];
      });
  }

  fillUoM() {
    let uom = this.applicationConfiguration.unitOfMeassurement;

    if (uom) {
      for (let i = 0; i < uom.length; i++) {
        this.uomModels[uom[i].uomTypeName] = '';
      }
    }

    if (uom && uom.length > 0 && this.organization && this.organization.uoM) {
      for (let i = 0; i < uom.length; i++) {
        for (let j = 0; j < this.organization.uoM.length; j++) {
          for (let k = 0; k < uom[i].uoMView.length; k++) {
            if (this.organization.uoM[j] === uom[i].uoMView[k].uoMId) {
              this.uomModels[uom[i].uomTypeName] = uom[i].uoMView[k].uoMId;
            }
          }
        }
      }
    }
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
    // readerToPreview.onloadend = (e) => {
    //   let base64Image = this.domSanitizer.bypassSecurityTrustUrl(readerToPreview.result.toString());
    // }
  }

  handleFileSelect(files) {
    var file = files[0];
    if (files && file) {
      var reader: any = new FileReader();

      reader.onload = (e) => {
        // ADDED CODE
        let data;
        if (!e) {
          data = reader.content;
        }
        else {
          data = e.target.result;
        }
        let base64textString = btoa(data);
        this.organization.logo.image = base64textString;

        // business code
      };
      // reader.onload = this._handleReaderLoaded.bind(this);

      // //extend FileReader
      // if (!FileReader.prototype.readAsBinaryString) {
      //   FileReader.prototype.readAsBinaryString = function (fileData) {
      //     var binary = "";
      //     var pt = this;
      //     var reader = new FileReader();
      //     reader.onload = function (e) {
      //       var bytes = new Uint8Array(<ArrayBuffer>reader.result);
      //       var length = bytes.byteLength;
      //       for (var i = 0; i < length; i++) {
      //         binary += String.fromCharCode(bytes[i]);
      //       }
      //       //pt.result  - readonly so assign binary
      //       pt.content = binary;
      //       $(pt).trigger('onload');
      //     }
      //     reader.readAsArrayBuffer(fileData);
      //   }
      // }

      this.organization.logo = new Logo();
      this.organization.logo.imageName = file.name;
      this.organization.logo.imageType = file.type;
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
    // this.organization.logo.image = image64;
    // // console.log('this.organization.logo.image ', this.organization.logo.image)

    // Other Images
    base64textString = btoa(binaryString);
    this.organization.logo.image = base64textString;
    // console.log('organization ', base64textString);
  }

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  openmodal() {
    if (!this.organization.uoMId) {
      this.organization.uoMId = [];
    }
    this.previousUOM = JSON.parse(JSON.stringify(this.organization.uoMId))
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
      this.organization.uoMId = [];
      this.organization.uoM = [];
      let uom = this.applicationConfiguration.unitOfMeassurement;
      if (uom && uom.length > 0) {
        for (let i = 0; i < uom.length; i++) {
          if (this.uomModels[uom[i].uomTypeName]) {
            this.organization.uoM.push(this.uomModels[uom[i].uomTypeName]);
            this.organization.uoMId.push(this.uomModels[uom[i].uomTypeName]);
          }
        }
      }
    } else {
      this.fillUoM();
    }
  }
  onUnitChange(value) {
    // // console.log(value);
    this.tempMeasurement = value.target.value;
  }

  validateName(event, prop: string) {
    let abc = new RegExp(/^([A-Za-z])+$/);
    if (!abc.test(this.organization[prop])) {
      this.organization[prop] = this.organization[prop] ? this.organization[prop].slice(0, this.organization[prop].length - 1) : null;
    }
  }

  onUoMDropdownChange(event, uomName: string) {
    // console.log('ahamed ', uomName, event.target.value);
    // let isFound: boolean = false;
    // for (let i = 0; i < this.uomArray.length; i++) {
    //   if (this.uomArray[i].uoMTypeId === uomName) {
    //     this.uomArray[i].uoMId = event.target.value;
    //     isFound = true;
    //   }
    // }

    // if (!isFound) {
    //   this.uomArray.push({ uoMTypeId: uomName, uoMId: event.target.value });
    // }
  }

  onUoMValueSelect(uomType, uomMeasureId) {
    // console.log('UOM  ID ', uomType, uomMeasureId)
  }

  onOrganizationSubmit() {
    if (this.organizationForm && this.organizationForm.invalid) {
      this.toaster.onFailure('Please fill the form correctly.', 'Form is invalid!')
      Object.keys(this.organizationForm.form.controls).forEach(element => {
        this.organizationForm.form.controls[element].markAsDirty();
      });
    } else {
      if (this.orgId) {
        this.organizationService.updateOrganization(this.organization)
          .subscribe(response => {
            this.toaster.onSuccess('Successfully saved', 'Saved');
            this.routerLocation.back();
          }, error => {
            this.toaster.onFailure('Something went wrong. Please fill the form correctly', 'Fail');
          });
      } else {
        this.organizationService.createOrganization(this.organization)
          .subscribe(response => {
            this.toaster.onSuccess('Successfully saved', 'Saved');
            this.route.navigate([`org/home/${this.parentOrganizationInfo.parentOrganizationId}/${this.parentOrganizationInfo.parentOrganizationName}`])
          }, error => {
            this.toaster.onFailure('Something went wrong. Please fill the form correctly', 'Fail');
          });
      }
    }
  }

  onCancelClick(event) {
    this.routerLocation.back();
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
        this.organizationList.sort(this.compareValues('name'));
        // this.organization.parentOrganizationId = JSON.parse(JSON.stringify(this.organization.parentOrganizationId));
      })
  }

  compareValues(key: string, order = 'asc') {
    return function (a, b) {
      if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
        // property doesn't exist on either object
        return 0;
      }

      const varA = (typeof a[key] === 'string') ?
        a[key].toUpperCase() : a[key];
      const varB = (typeof b[key] === 'string') ?
        b[key].toUpperCase() : b[key];

      let comparison = 0;
      if (varA > varB) {
        comparison = 1;
      } else if (varA < varB) {
        comparison = -1;
      }
      return (
        (order == 'desc') ? (comparison * -1) : comparison
      );
    };
  }

  onAlertRuleTabClick() {
    if (!this.alertRuleList || this.alertRuleList.length === 0) {
      this.alertRuleservice.getAllAlerts()
        .subscribe(response => {
          this.alertRuleList = response;
        });
    }
  }

  onLockClick() {
    if (this.pageType.toLowerCase() === 'view') {
      this.route.navigate([`org/edit/${this.curOrgId}/${this.curOrgName}/${this.organization.organizationId}`])
    } else {
      this.route.navigate([`org/view/${this.curOrgId}/${this.curOrgName}/${this.organization.organizationId}`])
    }
  }
}
