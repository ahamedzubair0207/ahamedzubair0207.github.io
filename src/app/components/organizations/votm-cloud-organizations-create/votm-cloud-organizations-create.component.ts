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
import { ActivatedRoute } from '@angular/router';

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


  uomModels: {};


  uomArray: any[];
  orgId: string;

  organization: Organization = new Organization();
  applicationConfiguration: ApplicationConfiguration = new ApplicationConfiguration();

  constructor(private modalService: NgbModal, private organizationService: OrganizationService,
    private configSettingsService: ConfigSettingsService, private domSanitizer: DomSanitizer,
    private activeroute: ActivatedRoute) {
    this.UOM = "SI";
  }




  ngOnInit() {
    console.log('Org Id', this.activeroute.snapshot.params['orgId']);

    this.orgId = this.activeroute.snapshot.params['orgId'];
    this.getScreenLabels();
    this.getAllAppInfo();
    this.organizationTypes = [{ value: 'organizationType1', text: 'organizationType1' }, { value: 'organizationType2', text: 'organizationType2' }]
    this.states = [{ value: 'state1', text: 'MN' },
    { value: 'state2', text: 'OH' }];
    this.countries = [{ value: 'country1', text: 'USA' },
    { value: 'country2', text: 'Brazil' }];

    if (this.orgId) {
      this.organizationService.getOrganizationById(this.orgId)
        .subscribe(response => {
          console.log('response ', response);
          this.organization = response;
          this.fillUoM();
        })
    }
    else {
      this.parentOrganizationInfo = {
        parentOrganizationId: '7A59BDD8-6E1D-48F9-A961-AA60B2918DDE',
        parentOrganizationName: 'Parker1'
      }
      this.organization.parentOrganizationId = this.parentOrganizationInfo.parentOrganizationId;
      this.organization.active = true;

      this.UOM = 'SI';
      this.organization.address = [new Address()];
      this.organization.address[0].addressType = 'Billing';

    }
    this.getAllAppInfo();
    // this.organization = { "parentOrganizationId": "3fa85f64-5717-4562-b3fc-2c963f66afa6", 
    // "active": true, 
    // "address": [{ "addressType": "Billing", "address1": "8640 Lewis Road", "address2": "21", "city": "Golden Valley", "postalCode": "55114", "state": "state1", "country": "country1" }],
    //  "name": "abfg", 
    //  "customerNumber": "966922",
    //   "organizationType": "asb", "primaryContactEmailAddress": "p@pp.com", 
    //   "primaryDistributorName": "Parker", "primaryDistributorEmailAddress": "s@sc.com",
    //    "contractStartDate": "2019-12-31", "contractEndDate": "2019-12-31", 
    //    "svclevel": "Admin", "localeId": "01653a73-ba08-42f3-8182-4169b1385906", 
    //    "timeZoneId": "ba2968ed-27be-4408-a854-0002115770e2", "description": "dgfdgf",
    //     "logo": { "imageName": "AJ_Digital_Camera.svg", "imageType": "image/svg+xml","image":'' },
    //   uoMId:[],organizationId:'' }
  }

  getScreenLabels() {
    this.configSettingsService.getCreateOrgScreenLabels()
      .subscribe(response => {
        console.log('screen labels ', response)
        this.pageLabels = response;
      })
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
        console.log(' this.uomModels ', this.uomModels);
        this.fillUoM();
        // this.uomArray = new Array[this.applicationConfiguration.unitOfMeassurement.length];
        // console.log('Application ', this.applicationConfiguration);
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
      console.log(' this.uomModels ', this.uomModels);
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
    //   console.log(base64Image);
    // }
  }

  handleFileSelect(files) {
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
    let base64textString;
    var binaryString = readerEvt.target.result;


    // SVG Code
    // let parser = new DOMParser();
    // let xmlDoc: XMLDocument = parser.parseFromString(binaryString.toString(), 'image/svg+xml');
    // console.log('XMLDocument ', xmlDoc, xmlDoc.getElementsByTagName('svg'))
    // const xml = (new XMLSerializer()).serializeToString(xmlDoc);
    // const svg64 = btoa(xml);
    // const b64Start = 'data:image/svg+xml;base64,';
    // const image64 = b64Start + svg64;
    // this.organization.logo.image = image64;
    // console.log('this.organization.logo.image ', this.organization.logo.image)

    // Other Images
    base64textString = btoa(binaryString);
    this.organization.logo.image = base64textString;
    console.log('organization ', base64textString);
  }

  open(content) {
    // console.log(' open  ');
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      // console.log(' result  ', result);
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      // console.log(' reason  ', reason);
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
      // console.log('this.uomArray ', JSON.stringify(this.uomArray))
      this.organization.uoMId = [];


      let uom = this.applicationConfiguration.unitOfMeassurement;
      if (uom && uom.length > 0) {
        for (let i = 0; i < uom.length; i++) {
          if (this.uomModels[uom[i].uomTypeName]) {
            this.organization.uoMId.push(this.uomModels[uom[i].uomTypeName]);
          }
        }
        console.log('this.organization.uoMId ', this.organization.uoMId);
      }
    }
  }
  onUnitChange(value) {
    // console.log(value);
    this.tempMeasurement = value.target.value;
  }

  onUoMDropdownChange(event, uomName: string) {
    // // console.log('ahamed ', uomName, event.target.value);
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
    // console.log('Ahamed ', this.organization);
    this.organizationService.createOrganization(this.organization)
      .subscribe(response => {
        // console.log('response ', response);
      });
  }
}
