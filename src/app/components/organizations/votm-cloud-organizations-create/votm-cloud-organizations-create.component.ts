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
  states: Array<any>;
  countries: Array<any>;
  tempUoM: UnitOfMeassurement;
  tempMeasurement: string;
  parentOrganizationInfo: any;

  pageTitle: string;


  uomModels: {};
  uomArray: any[];

  orgId: string;
  previousURLToNavigate: string;
  subscription: any;

  organization: Organization = new Organization();
  applicationConfiguration: ApplicationConfiguration = new ApplicationConfiguration();
  curOrgId: any;
  curOrgName: any;
  previousUrl: any;
  pageType: any;

  @ViewChild('startDate', null) startDate: NgForm;
  @ViewChild('organizationForm', null) organizationForm: NgForm;
  @ViewChild('confirmBox', null) confirmBox: VotmCloudConfimDialogComponent;
  @ViewChild('file', null) logoImage: any;
  fileName: any;
  fileExtension: string;

  constructor(private modalService: NgbModal, private organizationService: OrganizationService,
    private configSettingsService: ConfigSettingsService, private domSanitizer: DomSanitizer,
    private activeroute: ActivatedRoute, private route: Router, private datePipe: DatePipe,
    private routerLocation: RouterLocation) {
    this.UOM = "SI";
    this.subscription = route.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if (this.previousUrl) {
          this.previousURLToNavigate = JSON.parse(JSON.stringify(this.previousUrl));
        }
        this.previousUrl = event.url;
      }
    });
  }

  ngOnInit() {
    this.curOrgId = this.activeroute.snapshot.paramMap.get("curOrgId");
    this.curOrgName = this.activeroute.snapshot.paramMap.get("curOrgName");
    this.pageType = this.activeroute.snapshot.data['type'];
    this.pageTitle = `${this.pageType} Organization`;
    this.tempMeasurement = 'SI';
    console.log('this.curOrgId ', this.curOrgId)

    this.orgId = this.activeroute.snapshot.params['orgId'];
    this.getScreenLabels();
    this.getAllAppInfo();
    this.organizationTypes = [{ value: 'organizationType1', text: 'organizationType1' }, { value: 'organizationType2', text: 'organizationType2' }]
    this.states = [{ value: 'state1', text: 'MN' },
    { value: 'state2', text: 'OH' }];
    this.countries = [{ value: 'country1', text: 'USA' },
    { value: 'country2', text: 'Brazil' }];

    if (this.orgId) {
      this.getOrganizationInfo();
    }
    else {
      this.parentOrganizationInfo = {
        parentOrganizationId: this.activeroute.snapshot.paramMap.get("parentOrgId"), // '7A59BDD8-6E1D-48F9-A961-AA60B2918DDE',
        parentOrganizationName: this.activeroute.snapshot.paramMap.get("parentOrgName") // 'Parker1'
      }
      this.organization.parentOrganizationId = this.parentOrganizationInfo.parentOrganizationId;
      this.organization.active = true;

      this.UOM = 'SI';
      this.organization.address = [new Address()];
      this.organization.address[0].addressType = 'Billing';

    }
    this.getAllAppInfo();
  }

  showImageLogo() {
    if (this.logoImage) {
      console.log('logoImage ', this.logoImage);
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
        console.log('response ', response);
        this.organization = response;
        // this.curOrgId = this.organization.organizationId;
        // this.curOrgName = this.organization.name;
        this.fillUoM();
        this.organization.timeZoneId = this.organization.timeZone;
        this.organization.localeId = this.organization.locale;
        this.organization.uoMId = this.organization.uoM;

        this.organization.contractStartDate = this.datePipe.transform(this.organization.contractStartDate, 'yyyy-MM-dd')
        this.organization.contractEndDate = this.datePipe.transform(this.organization.contractEndDate, 'yyyy-MM-dd')

        // this.imgURL = this.organization.logo.image

        if (this.organization.logo) {
          this.fileExtension = this.organization.logo.imageName.slice((Math.max(0, this.organization.logo.imageName.lastIndexOf(".")) || Infinity) + 1);
          this.imgURL = this.domSanitizer.bypassSecurityTrustUrl(`data:image/${this.fileExtension};base64,${this.organization.logo.image}`);
          this.organization.logo.imageType = this.fileExtension;
        }

      });
  }

  getScreenLabels() {
    this.configSettingsService.getCreateOrgScreenLabels()
      .subscribe(response => {
        // console.log('screen labels ', response)
        this.pageLabels = response;
      })
  }

  deleteOrganizationById(event) {
    console.log('event on close ', event);
    if (event) {
      this.organizationService.deleteOrganization(this.organization.organizationId)
        .subscribe(response => {
          console.log('delete successful ', response);
          this.route.navigate([`org/home/${this.curOrgId}/${this.curOrgName}`])
        });
    }
  }

  createNestedOrganization(event) {
    this.route.navigate([`org/create/${this.organization.organizationId}/${this.organization.name}`])
  }

  createNestedLocation(event) {
    this.route.navigate([`loc/create/${this.organization.organizationId}/${this.organization.name}`])
  }

  openConfirmDialog() {

    this.confirmBox.open();

  }

  getAllAppInfo() {
    console.log('Application Info')
    this.configSettingsService.getApplicationInfo()
      .subscribe((response: any) => {
        console.log('Inside subscribe ', response)
        this.applicationConfiguration = response;
        let uom = this.applicationConfiguration.unitOfMeassurement;
        this.uomModels = {};
        for (let i = 0; i < uom.length; i++) {
          this.uomModels[uom[i].uomTypeName] = '';
        }
        // console.log(' this.uomModels ', this.uomModels);
        this.fillUoM();
        // this.uomArray = new Array[this.applicationConfiguration.unitOfMeassurement.length];
        // // console.log('Application ', this.applicationConfiguration);
      });
  }

  fillUoM() {
    let uom = this.applicationConfiguration.unitOfMeassurement;
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
      // console.log(' this.uomModels ', this.uomModels);
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
    //   // console.log(base64Image);
    // }
  }

  handleFileSelect(files) {
    console.log('handleFileSelect')
    var file = files[0];
    if (files && file) {
      var reader = new FileReader();
      reader.onload = this._handleReaderLoaded.bind(this);

      this.organization.logo = new Logo();
      this.organization.logo.imageName = file.name;
      this.organization.logo.imageType = file.type;
      reader.readAsBinaryString(file);
    }
  }

  _handleReaderLoaded(readerEvt) {
    console.log('_handleReaderLoaded')
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
    // // console.log(' open  ');
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      // // console.log(' result  ', result);
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      // // console.log(' reason  ', reason);
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
      // // console.log('this.uomArray ', JSON.stringify(this.uomArray))
      this.organization.uoMId = [];
      let uom = this.applicationConfiguration.unitOfMeassurement;
      if (uom && uom.length > 0) {
        for (let i = 0; i < uom.length; i++) {
          if (this.uomModels[uom[i].uomTypeName]) {
            this.organization.uoMId.push(this.uomModels[uom[i].uomTypeName]);
          }
        }
        // console.log('this.organization.uoMId ', this.organization.uoMId);
      }
    }
  }
  onUnitChange(value) {
    // // console.log(value);
    this.tempMeasurement = value.target.value;
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
      Object.keys(this.organizationForm.form.controls).forEach(element => {
        this.organizationForm.form.controls[element].markAsDirty();
      });
    } else {
      if (this.orgId) {
        this.organizationService.updateOrganization(this.organization)
          .subscribe(response => {
            this.routerLocation.back();
          });
      } else {
        this.organizationService.createOrganization(this.organization)
          .subscribe(response => {
            this.route.navigate([`org/home/${this.parentOrganizationInfo.parentOrganizationId}/${this.parentOrganizationInfo.parentOrganizationName}`])
          });
      }
    }
  }

  onCancelClick(event) {
    this.routerLocation.back();
    // this.previousURLToNavigate ? this.route.navigate([this.previousURLToNavigate])
    //   : this.route.navigate([`org/home/${this.curOrgId}/${this.curOrgName}`]);
  }
}
