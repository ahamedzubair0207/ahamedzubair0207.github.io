import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
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
import { AssetsService } from '../../../services/assets/assets.service';
import { SortArrays } from '../../shared/votm-sort';
import { setDashboardConfiguration } from 'src/assets/js/data';
import { BehaviorSubject } from 'rxjs';
import * as moment from 'moment';
import { VotmCommon } from '../../shared/votm-common';
import { NgbDateMomentParserFormatter } from '../../shared/votm-ngbdatepickerformatter/votm-ngbdatepickerformatter';
// Dashboard-david start
import { DashboardService } from '../../../services/dasboards/dashboard.service';
import { DbTplItem } from 'src/app/models/db-tpl-item';
import { DbItem } from 'src/app/models/db-item';
// Dashboard-david end
declare var jQuery: any;

@Component({
  selector: 'app-votm-cloud-organizations-create',
  templateUrl: './votm-cloud-organizations-create.component.html',
  styleUrls: ['./votm-cloud-organizations-create.component.scss'],
  providers: [DatePipe]
})
export class VotmCloudOrganizationsCreateComponent implements OnInit, AfterViewInit {

  ///


  ///


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
  templateList: any[] = [];
  placeholder: string;

  //Time Concise
  timeFormat: any;

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
  tempContractStartDate: NgbDateStruct;
  tempContractEndDate: NgbDateStruct;

  @ViewChild('startDate', null) startDate: NgForm;
  @ViewChild('organizationForm', null) organizationForm: NgForm;
  @ViewChild('confirmBox', null) confirmBox: VotmCloudConfimDialogComponent;
  @ViewChild('confirmBoxDash', null) confirmBoxDash: VotmCloudConfimDialogComponent;
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
  modifiedDate: string;

  // Dashboard-david start
  dbTemplates: DbTplItem[];
  dbItems: DbItem[] = [];
  selTemplate: string;
  dbLongName: string = '';
  dbShortName: string = '';
  dbLastIdNum: number = 0;
  newTabId: string = '';
  // Dashboard-david end

  constructor(
    private assetService: AssetsService,
    private modalService: NgbModal,
    private alertRuleservice: AlertsService,
    private organizationService: OrganizationService,
    private configSettingsService: ConfigSettingsService,
    private domSanitizer: DomSanitizer,
    private activeroute: ActivatedRoute,
    private route: Router,
    private datePipe: DatePipe,
    private routerLocation: RouterLocation,
    private toastr: ToastrService,
    private sanitizer: DomSanitizer,
    private dbService: DashboardService, // Dashboard-david
  ) {
    this.UOM = 'Imperial';
    this.subscription = route.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if (this.previousUrl) {
          this.previousURLToNavigate = JSON.parse(JSON.stringify(this.previousUrl));
        }
        this.previousUrl = event.url;
      }
    });
    // this.route.routeReuseStrategy.shouldReuseRoute = () => false;

    // Dashboard-david start
    // this.dbService.hello();
    this.dbTemplates = this.dbService.getDashboardTemplates();
    this.selTemplate = this.dbTemplates[0].name;

    // this.newTab.subscribe(() => {
    //   this.dbLastIdNum++;
    //   this.newTabId = "dbtab-" + this.dbLastIdNum;
    //   this.dbItems.push(new DbItem(this.newTabId, this.dbLongName, this.dbShortName, this.selTemplate,
    //     this.dbTemplates.find(({ name }) => name === this.selTemplate).component, ''));
    //   this.dbLongName = '';
    //   this.dbShortName = '';
    //   this.selTemplate = this.dbTemplates[0].name;
    //   setTimeout(() => {
    //     // this.tabSet.select(this.newTabId);
    //   }, 1);
    // });
    // Dashboard-david end

  }

  ngOnInit() {
    this.organization.svclevels = null;
    this.organization.localeId = null;
    this.organization.timeZoneId = null;
    this.organization.cellularBlocks = null;
    this.organization.sensorBlocks = null;
    // this.organization.timeZone = null;
    this.organization.modifiedOn = null; //TimeConcise
    // this.organization.locale = null;
    this.activeroute.paramMap.subscribe(params => {
      this.curOrgId = params.get('curOrgId');
      this.curOrgName = params.get('curOrgName');
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

      this.getOptionsListData('Sensor Blocks');
      this.getOptionsListData('Cellular Blocks');
      this.getOptionsListData('Service Levels');
      this.getAllOrganizations();

      if (this.orgId) {
        this.getOrganizationInfo();
      } else {
        this.placeholder = VotmCommon.dateFormat;
        this.parentOrganizationInfo = {
          // parentOrganizationId: this.curOrgId, // '7A59BDD8-6E1D-48F9-A961-AA60B2918DDE',
          // parentOrganizationName: this.curOrgName // 'Parker1'
          parentOrganizationId: this.activeroute.snapshot.paramMap.get('curOrgId'), // '7A59BDD8-6E1D-48F9-A961-AA60B2918DDE',
          parentOrganizationName: this.activeroute.snapshot.paramMap.get('curOrgName') // 'Parker1'
        };
        this.organization.parentOrganizationId = this.parentOrganizationInfo.parentOrganizationId;
        this.organization.active = true;

        this.UOM = 'SI';
        this.organization.address = [new Address()];
        this.organization.address[0].addressType = 'Billing';
        this.organization.address[0].country = null;
        this.organization.address[0].state = null;


        this.organization.modifiedOn = null; //TimeConcise

      }
    });

    this.pageType = this.activeroute.snapshot.data['type'];
    this.pageTitle = `${this.pageType} Organization`;
    this.tempMeasurement = 'SI';


    this.getScreenLabels();
    this.getAllAppInfo();

    this.organizationTypes = [
      { value: 'organizationType1', text: 'organizationType1' },
      { value: 'organizationType2', text: 'organizationType2' }
    ];

    //   this.dashboardData = {
    //   act: 'add',
    //   title: 'Dashboard',
    //   id: '1',
    //   templateName: 'Standard Organization Dashboard'
    // };
    this.dashboardData = this.getDashboards();
    this.getDashboardsTemplates();
    this.dashboardTemplates = [
      {
        id: '1',
        templateName: 'Standard Organization Dashboard'
      },
      {
        id: '2',
        templateName: 'Standard Location Dashboard'
      },
      {
        id: '3',
        templateName: 'Standard Asset Dashboard'
      }
    ];
    console.log(this.dashboardTemplates);
    console.log(this.dashboardData);

    jQuery('.nav-item').tooltip();
  }

  ngAfterViewInit(): void {
    jQuery('.selectpicker').selectpicker();
    this.showImageLogo();
  }

  getDBDashboards() {
    // service to get all dashboards by userid
    return [
      {
        id: '1',
        lName: '',
        sName: '',
        tplName: '',
        component: '',
        widgetConf: ''
      }
    ];

  }

  onCountryChange(event) {
    // console.log('Country change ', this.organization.address[0].country);
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


  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onStartDateChange() {
    // console.log('Start Date ', this.tempContractStartDate);
    this.organizationForm.form.controls['startDate'].markAsDirty();
    this.compareDate();
  }

  checkForUOM() {
    if (!this.organization.uoMId || this.organization.uoMId.length === 0) {
      this.organizationForm.form.controls['startDate'].setErrors({ 'invalidDate': true });
    }
  }

  compareDate() {
    // console.log('ENTERED');
    if (this.tempContractStartDate && this.tempContractEndDate) {
      let startDate = new Date(this.tempContractStartDate.year, this.tempContractStartDate.month, this.tempContractStartDate.day);
      let endDate = new Date(this.tempContractEndDate.year, this.tempContractEndDate.month, this.tempContractEndDate.day);
      // console.log('Start Date , End Date ', startDate, endDate);
      if (startDate >= endDate) {
        this.organizationForm.form.controls['startDate'].setErrors({ 'invalidDate': true });
      } else {
        this.organizationForm.form.controls['startDate'].setErrors(null);
      }
    }
  }

  onEndDateChange() {
    // console.log('End Date ', this.tempContractEndDate);
    this.organizationForm.form.controls['endDate'].markAsDirty();
    this.compareDate();
  }

  onDescriptionChange() {
    if (this.organization.description && this.organization.description.length > 4000) {
      this.organizationForm.form.controls['orgDescription'].setErrors({ 'invalidDescription': true });
    }
  }


  getOrganizationInfo() {
    this.organizationService.getOrganizationById(this.orgId)
      .subscribe(response => {
        this.organization = response;

        if (this.organization.modifiedOn) {
          this.modifiedDate = moment(this.organization.modifiedOn).format(VotmCommon.dateFormat) + ' ' + moment(this.organization.modifiedOn).format(VotmCommon.timeFormat);
          console.log('temp date ', moment(this.organization.modifiedOn));
        }

        this.fillUoM();
        // this.organization.timeZoneId = this.organization.timeZone;
        // this.organization.localeId = this.organization.locale;
        // this.organization.uoMId = this.organization.uoM;
        if (this.organization.contractStartDate) {
          let startDate = new Date(this.organization.contractStartDate);
          this.tempContractStartDate = { year: startDate.getFullYear(), month: startDate.getMonth(), day: startDate.getDate() };
        }
        if (this.organization.contractEndDate) {
          let endDate = new Date(this.organization.contractEndDate);
          this.tempContractEndDate = { year: endDate.getFullYear(), month: endDate.getMonth(), day: endDate.getDate() };
        }
        this.onLocaleChange();
        if (this.organization.logo && this.organization.logo.imageName) {
          this.fileExtension = this.organization.logo.imageName.slice((Math.max(0, this.organization.logo.imageName.lastIndexOf(".")) || Infinity) + 1);
          this.imgURL = this.domSanitizer.bypassSecurityTrustUrl(`data:image/${this.fileExtension};base64,${this.organization.logo.image}`);
          this.organization.logo.imageType = this.fileExtension;
        }

        this.countries.forEach(country => {
          if (country.countryName === this.organization.address[0].country) {
            this.states = [];
            country.states.forEach((state: any) => {
              this.states.push({ value: state, text: state });
            });
          }
        });

      });
  }

  getScreenLabels() {
    this.configSettingsService.getCreateOrgScreenLabels()
      .subscribe(response => {
        this.pageLabels = response;
      });
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
    this.route.navigate([`org/create/${this.organization.organizationId}/${this.organization.name}`]);
  }

  createNestedLocation(event) {
    // let parentLocId = '19d7e5e5-fda7-4778-b943-62e36078087a';
    // let parentLocName = 'Mineapolis';
    this.route.navigate([`loc/create/${this.organization.organizationId}/${this.organization.name}`]);
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
        this.onLocaleChange();
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

    if (uom && uom.length > 0 && this.organization && this.organization.uoMId) {
      for (let i = 0; i < uom.length; i++) {
        for (let j = 0; j < this.organization.uoMId.length; j++) {
          for (let k = 0; k < uom[i].uoMView.length; k++) {
            if (this.organization.uoMId[j] === uom[i].uoMView[k].uoMId) {
              this.uomModels[uom[i].uomTypeName] = uom[i].uoMView[k].uoMId;
            }
          }
        }
      }
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
    this.imagePath = files;
    readerToPreview.readAsDataURL(files[0]);
    readerToPreview.onload = (_event) => {
      this.imgURL = this.domSanitizer.bypassSecurityTrustUrl(readerToPreview.result.toString());; //readerToPreview.result;
    };
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
        } else {
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
    this.previousUOM = JSON.parse(JSON.stringify(this.organization.uoMId));
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
      this.organization.uoMId = [];
      // this.organization.uoM = [];
      let uom = this.applicationConfiguration.unitOfMeassurement;
      if (uom && uom.length > 0) {
        for (let i = 0; i < uom.length; i++) {
          if (this.uomModels[uom[i].uomTypeName]) {
            // this.organization.uoM.push(this.uomModels[uom[i].uomTypeName]);
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
    // let startDate: any = this.organization.contractStartDate;
    // let endDate: any = this.organization.contractEndDate;
    this.isAddOrganizationAPILoading = true;
    if (this.tempContractStartDate) {
      this.organization.contractStartDate = new Date(this.tempContractStartDate.year, this.tempContractStartDate.month, this.tempContractStartDate.day).toDateString();
    }
    if (this.tempContractEndDate) {
      this.organization.contractEndDate = new Date(this.tempContractEndDate.year, this.tempContractEndDate.month, this.tempContractEndDate.day).toDateString();
    }
    if (this.organizationForm && this.organizationForm.invalid) {
      // console.log('Invalid Form');
      this.toaster.onFailure('Please fill the form correctly.', 'Form is invalid!');
      Object.keys(this.organizationForm.form.controls).forEach(element => {
        this.organizationForm.form.controls[element].markAsDirty();
      });
      this.isAddOrganizationAPILoading = false;
    } else {
      // console.log('Valid Form');
      if (this.orgId) {
        this.organizationService.updateOrganization(this.organization)
          .subscribe(response => {
            this.toaster.onSuccess('Successfully updated', 'Updated');
            this.routerLocation.back();
            this.isAddOrganizationAPILoading = false;
          }, error => {
            this.toaster.onFailure('Something went wrong. Please fill the form correctly', 'Fail');
            this.isAddOrganizationAPILoading = false;
          });
      } else {
        this.organizationService.createOrganization(this.organization)
          .subscribe(response => {
            this.toaster.onSuccess('Successfully created', 'Created');
            this.route.navigate([`org/home/${this.parentOrganizationInfo.parentOrganizationId}/${this.parentOrganizationInfo.parentOrganizationName}`]);
            this.isAddOrganizationAPILoading = false;
          }, error => {
            this.toaster.onFailure('Something went wrong. Please fill the form correctly', 'Fail');
            this.isAddOrganizationAPILoading = false;
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
        this.organizationList.sort(SortArrays.compareValues('name'));
        // this.organization.parentOrganizationId = JSON.parse(JSON.stringify(this.organization.parentOrganizationId));
      });
  }



  onAlertRuleTabClick() {
    // console.log('onAlertRuleTabClick');
    if (!this.alertRuleList || this.alertRuleList.length === 0) {
      this.alertRuleservice.getAllAlertsByOrgId(this.orgId)
        .subscribe(response => {
          // console.log('response ', response);
          this.alertRuleList = response;
        });
    }
  }

  onLockClick() {
    if (this.pageType.toLowerCase() === 'view') {
      this.route.navigate([`org/edit/${this.curOrgId}/${this.curOrgName}/${this.organization.organizationId}`]);
    } else {
      this.route.navigate([`org/view/${this.curOrgId}/${this.curOrgName}/${this.organization.organizationId}`]);
    }
  }

  onTemplateTabClick() {
    if (!this.templateList || this.templateList.length === 0) {
      this.assetService.getAllTemplates()
        .subscribe(response => {
          // console.log('response of templates ', response);
          this.templateList = response;
        });
    }
  }

  getDashboardsTemplates() {
    this.dashboardTemplates = [
      {
        id: '1',
        templateName: 'Standard Organization Dashboard'
      },
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

  getDashboards() {
    // service to get all dashboards by userid
    this.userdashboardData = [
      {
        id: '1',
        templateName: 'Standard Organization Dashboard',
        dashboardName: 'Organization Dashboard',
        dashboardHTML: ''
      },
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

  async getDashboardHTML(formName: string, index) {
    // console.log(formName, '--getDashboardHTML functiona called');

    await this.organizationService.getDashboardHTML(formName)
      .subscribe(response => {
        // console.log('return response---', response);
        this.userdashboardData[index].dashboardHTML = this.sanitizer.bypassSecurityTrustHtml(response);
        setTimeout(() => {
          // setData('Hello');
          let configData = $("#dashboard_config_btncreate").click(setDashboardConfiguration);
          this.afterLoaded();
        }, 300);
      });
  }

  setExternalScript(src) {
    return new Promise((resolve, reject) => {
      const scriptTag = document.createElement('script');
      scriptTag.type = 'text/javascript';
      scriptTag.src = src;
      scriptTag.onload = () => resolve();
      document.getElementById('config_dashboard').appendChild(scriptTag); // document.body
    });
  }

  async afterLoaded() {
    const scripts = ['assets/dashboards/lineChartLive.js'];
    for (let i = 0; i < scripts.length; i++) {
      await this.setExternalScript(scripts[i]);
    }
  }

  openAddDashboardModal(dashboardAct: string, dashboardId: any, dashboardLongName: string, dashboardSortName: string) {
    // this.dashBoardDataByID = getDashboardById(dashboardId)
    console.log(dashboardLongName);
    if (dashboardAct === 'editDashboard') {
      this.dashboardDataById = {
        act: 'edit',
        title: 'Edit Dashboard',
        dashboardName: '',
        dashboardHTML: ''
      };
      this.dbLongName = dashboardLongName;
      this.dbShortName = dashboardSortName;
      this.selTemplate = this.dbTemplates[0].name;
    } else if (dashboardAct === 'addDashboard') {
      this.dashboardDataById = {
        act: 'create',
        title: 'Create Dashboard',
        dashboardName: '',
        dashboardHTML: ''
      };
      this.dbLongName = '';
      this.dbShortName = '';
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
    // this.addDashboardArray = {
    //   id: '4',
    //   templateName: 'Standard Asset Dashboard',
    //   dashboardName: this.dashboardDataById.dashboardName
    // };
    // this.dashboardData.push(this.addDashboardArray);
    this.dbLastIdNum++;
    this.newTabId = "dbtab-" + this.dbLastIdNum;
    this.dbItems.push(new DbItem(this.newTabId, this.dbLongName, this.dbShortName, this.selTemplate,
      this.dbTemplates.find(({ name }) => name === this.selTemplate).component, ''));
    console.log('this.dbItems---added', this.dbItems);
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

  onLocaleChange() {
    let localeName;
    if (this.applicationConfiguration && this.applicationConfiguration.locale && this.applicationConfiguration.locale.length > 0) {
      this.applicationConfiguration.locale.forEach(locale => {
        if (locale.localeId === this.organization.localeId) {
          localeName = locale.localeName;
        }
      });
      if (localeName) {
        this.placeholder = VotmCommon.dateFormat = moment.localeData(localeName).longDateFormat('L');
        VotmCommon.timeFormat = moment.localeData(localeName).longDateFormat('LTS');
        console.log('VotmCommon.timeFormat ', VotmCommon.timeFormat);

        let obj1: NgbDateMomentParserFormatter = new NgbDateMomentParserFormatter();
        let updatedStartDate = obj1.format(this.tempContractStartDate);
        let updatedEndDate = obj1.format(this.tempContractEndDate);
        this.tempContractStartDate = null;
        this.tempContractEndDate = null;
        this.tempContractStartDate = obj1.parse(updatedStartDate);
        this.tempContractEndDate = obj1.parse(updatedEndDate);
        if (this.organization.modifiedOn) {
          this.modifiedDate = moment(this.organization.modifiedOn).format(VotmCommon.dateFormat) + ' ' + moment(this.organization.modifiedOn).format(VotmCommon.timeFormat);
          console.log('temp time ', moment(this.organization.modifiedOn).format(VotmCommon.timeFormat));
        }
      }
    }
  }
}
