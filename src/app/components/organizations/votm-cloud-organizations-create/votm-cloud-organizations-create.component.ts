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

  uomArray: Array<any> = [];

  organization: Organization = new Organization();
  applicationConfiguration: ApplicationConfiguration = new ApplicationConfiguration();

  constructor(private modalService: NgbModal, private organizationService: OrganizationService,
    private configSettingsService: ConfigSettingsService, private domSanitizer: DomSanitizer) {
    this.UOM = "SI";
    // this.pageLabels = {
    //   "CustomerNumber": {
    //     "screenLabelId": "00da91e2-b3c7-4e8a-9ecf-05ffb620e713",
    //     "screenLabelAliasName": "CustomerNumber",
    //     "screenId": "a2e85d4b-b6c1-4767-a7d7-ee0df88a6b92",
    //     "localeId": "01653a73-ba08-42f3-8182-4169b1385906",
    //     "localeName": "en-us",
    //     "labelName": "Customer Number"
    //   },
    //   "EndDate": {
    //     "screenLabelId": "f8346210-75cf-4b58-abc9-1de13a1468b7",
    //     "screenLabelAliasName": "EndDate",
    //     "screenId": "a2e85d4b-b6c1-4767-a7d7-ee0df88a6b92",
    //     "localeId": "01653a73-ba08-42f3-8182-4169b1385906",
    //     "localeName": "en-us",
    //     "labelName": "End Date"
    //   },
    //   "BillingAddress": {
    //     "screenLabelId": "50660bba-c542-42b0-8fb0-1ea31ecb4736",
    //     "screenLabelAliasName": "BillingAddress",
    //     "screenId": "a2e85d4b-b6c1-4767-a7d7-ee0df88a6b92",
    //     "localeId": "01653a73-ba08-42f3-8182-4169b1385906",
    //     "localeName": "en-us",
    //     "labelName": "Billing Address"
    //   },
    //   "PrimaryContact": {
    //     "screenLabelId": "e67a6e8e-a1d9-4624-b9bd-2a20bd5495aa",
    //     "screenLabelAliasName": "PrimaryContact",
    //     "screenId": "a2e85d4b-b6c1-4767-a7d7-ee0df88a6b92",
    //     "localeId": "01653a73-ba08-42f3-8182-4169b1385906",
    //     "localeName": "en-us",
    //     "labelName": "Primary Contact"
    //   },
    //   "PostalCode": {
    //     "screenLabelId": "359ec7ad-873d-4851-9d87-2cd58375eab2",
    //     "screenLabelAliasName": "PostalCode",
    //     "screenId": "a2e85d4b-b6c1-4767-a7d7-ee0df88a6b92",
    //     "localeId": "01653a73-ba08-42f3-8182-4169b1385906",
    //     "localeName": "en-us",
    //     "labelName": "Zip Code"
    //   },
    //   "DescriptionofOrganization": {
    //     "screenLabelId": "98c1f426-8ef2-4deb-bcf2-315e1a7299e0",
    //     "screenLabelAliasName": "DescriptionofOrganization",
    //     "screenId": "a2e85d4b-b6c1-4767-a7d7-ee0df88a6b92",
    //     "localeId": "01653a73-ba08-42f3-8182-4169b1385906",
    //     "localeName": "en-us",
    //     "labelName": "Description of Organization"
    //   },
    //   "LogoFile": {
    //     "screenLabelId": "fb65623c-9d24-41ca-ad7a-406cd5b331f5",
    //     "screenLabelAliasName": "LogoFile",
    //     "screenId": "a2e85d4b-b6c1-4767-a7d7-ee0df88a6b92",
    //     "localeId": "01653a73-ba08-42f3-8182-4169b1385906",
    //     "localeName": "en-us",
    //     "labelName": "Logo File"
    //   },
    //   "PrimaryDistributor": {
    //     "screenLabelId": "8ec696e4-b65b-4988-bcbc-5b498670a258",
    //     "screenLabelAliasName": "PrimaryDistributor",
    //     "screenId": "a2e85d4b-b6c1-4767-a7d7-ee0df88a6b92",
    //     "localeId": "01653a73-ba08-42f3-8182-4169b1385906",
    //     "localeName": "en-us",
    //     "labelName": "Primary Distributor"
    //   },
    //   "SVCLevel": {
    //     "screenLabelId": "5d419194-889a-4afd-9051-62a0439dbd12",
    //     "screenLabelAliasName": "SVCLevel",
    //     "screenId": "a2e85d4b-b6c1-4767-a7d7-ee0df88a6b92",
    //     "localeId": "01653a73-ba08-42f3-8182-4169b1385906",
    //     "localeName": "en-us",
    //     "labelName": "SVC Level"
    //   },
    //   "Country": {
    //     "screenLabelId": "636fe2fe-6f19-4c31-99ae-82bc8c3a5056",
    //     "screenLabelAliasName": "Country",
    //     "screenId": "a2e85d4b-b6c1-4767-a7d7-ee0df88a6b92",
    //     "localeId": "01653a73-ba08-42f3-8182-4169b1385906",
    //     "localeName": "en-us",
    //     "labelName": "Country"
    //   },
    //   "ParentOrganization": {
    //     "screenLabelId": "38a94999-d867-4d42-a982-856509a1524c",
    //     "screenLabelAliasName": "ParentOrganization",
    //     "screenId": "a2e85d4b-b6c1-4767-a7d7-ee0df88a6b92",
    //     "localeId": "01653a73-ba08-42f3-8182-4169b1385906",
    //     "localeName": "en-us",
    //     "labelName": "Parent Organization"
    //   },
    //   "State": {
    //     "screenLabelId": "cd0e3d98-5871-4e6a-b836-9f7ac5cd1bfa",
    //     "screenLabelAliasName": "State",
    //     "screenId": "a2e85d4b-b6c1-4767-a7d7-ee0df88a6b92",
    //     "localeId": "01653a73-ba08-42f3-8182-4169b1385906",
    //     "localeName": "en-us",
    //     "labelName": "State"
    //   },
    //   "Name": {
    //     "screenLabelId": "d378dbcf-0b06-4365-8df9-a0f59cde74e6",
    //     "screenLabelAliasName": "Name",
    //     "screenId": "a2e85d4b-b6c1-4767-a7d7-ee0df88a6b92",
    //     "localeId": "01653a73-ba08-42f3-8182-4169b1385906",
    //     "localeName": "en-us",
    //     "labelName": "Name"
    //   },
    //   "Language": {
    //     "screenLabelId": "cc2d2b18-1fda-4ad7-b536-a18d7fe9c8e2",
    //     "screenLabelAliasName": "Language",
    //     "screenId": "a2e85d4b-b6c1-4767-a7d7-ee0df88a6b92",
    //     "localeId": "01653a73-ba08-42f3-8182-4169b1385906",
    //     "localeName": "en-us",
    //     "labelName": "Default Language"
    //   },
    //   "StartDate": {
    //     "screenLabelId": "e9669b71-8456-49ae-942a-d3eec018fcc6",
    //     "screenLabelAliasName": "StartDate",
    //     "screenId": "a2e85d4b-b6c1-4767-a7d7-ee0df88a6b92",
    //     "localeId": "01653a73-ba08-42f3-8182-4169b1385906",
    //     "localeName": "en-us",
    //     "labelName": "Start Date"
    //   },
    //   "Address2": {
    //     "screenLabelId": "9ff8b4e6-bc09-4cd2-918a-d4ed8480c34c",
    //     "screenLabelAliasName": "Address2",
    //     "screenId": "a2e85d4b-b6c1-4767-a7d7-ee0df88a6b92",
    //     "localeId": "01653a73-ba08-42f3-8182-4169b1385906",
    //     "localeName": "en-us",
    //     "labelName": "Address 2"
    //   },
    //   "Address1": {
    //     "screenLabelId": "8eaf07dc-7452-4a18-a029-d878262d6fa5",
    //     "screenLabelAliasName": "Address1",
    //     "screenId": "a2e85d4b-b6c1-4767-a7d7-ee0df88a6b92",
    //     "localeId": "01653a73-ba08-42f3-8182-4169b1385906",
    //     "localeName": "en-us",
    //     "labelName": "Address 1"
    //   },
    //   "Contract": {
    //     "screenLabelId": "6210fd7d-c0c3-46ff-ace1-df4dce25d89e",
    //     "screenLabelAliasName": "Contract",
    //     "screenId": "a2e85d4b-b6c1-4767-a7d7-ee0df88a6b92",
    //     "localeId": "01653a73-ba08-42f3-8182-4169b1385906",
    //     "localeName": "en-us",
    //     "labelName": "Contract"
    //   },
    //   "City": {
    //     "screenLabelId": "c03e3442-80a0-4d60-8b21-e47ae80748e3",
    //     "screenLabelAliasName": "City",
    //     "screenId": "a2e85d4b-b6c1-4767-a7d7-ee0df88a6b92",
    //     "localeId": "01653a73-ba08-42f3-8182-4169b1385906",
    //     "localeName": "en-us",
    //     "labelName": "City"
    //   },
    //   "DefaultUnitOfMeasure": {
    //     "screenLabelId": "b95a86f7-9645-478c-9008-e5c20ac1d4a4",
    //     "screenLabelAliasName": "DefaultUnitOfMeasure",
    //     "screenId": "a2e85d4b-b6c1-4767-a7d7-ee0df88a6b92",
    //     "localeId": "01653a73-ba08-42f3-8182-4169b1385906",
    //     "localeName": "en-us",
    //     "labelName": "Default Unit Of Measure"
    //   },
    //   "OrganizationType": {
    //     "screenLabelId": "4f2f0185-2e07-4f0c-b0a8-eed52cfa2b37",
    //     "screenLabelAliasName": "OrganizationType",
    //     "screenId": "a2e85d4b-b6c1-4767-a7d7-ee0df88a6b92",
    //     "localeId": "01653a73-ba08-42f3-8182-4169b1385906",
    //     "localeName": "en-us",
    //     "labelName": "Organization Type"
    //   }
    // };
  }




  ngOnInit() {
    this.parentOrganizationInfo = {
      parentOrganizationId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      parentOrganizationName: 'Parker'
    }
    this.getScreenLabels();
    this.organization.parentOrganizationId = this.parentOrganizationInfo.parentOrganizationId;
    this.organization.active = true;

    this.UOM = 'SI';
    this.organization.address = [new Address()];
    this.organization.address[0].addressType = 'Billing';
    this.organizationTypes = [{ value: 'organizationType1', text: 'organizationType1' }, { value: 'organizationType2', text: 'organizationType2' }]
    this.states = [{ value: 'state1', text: 'MN' },
    { value: 'state2', text: 'OH' }];
    this.countries = [{ value: 'country1', text: 'USA' },
    { value: 'country2', text: 'Brazil' }];
    this.getAllAppInfo();
  }

  getScreenLabels() {
    this.configSettingsService.getCreateOrgScreenLabels()
      .subscribe(response => {
        console.log('screen labels ', response)
        this.pageLabels = response;
      })
  }

  getAllAppInfo() {
    this.configSettingsService.getApplicationInfo()
      .subscribe((response: any) => {

        this.applicationConfiguration = response;
        // console.log('Application ', this.applicationConfiguration);
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
      this.imgURL = readerToPreview.result;
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

      // reader.onloadend = (e) => {
      //   let base64Image = this.domSanitizer.bypassSecurityTrustUrl(reader.result.toString());
      //   console.log(base64Image);
      // }
    }
  }

  _handleReaderLoaded(readerEvt) {
    let base64textString;
    var binaryString = readerEvt.target.result;
    base64textString = btoa(binaryString);
    this.organization.logo.image = base64textString;
    // console.log('organization ', this.organization);
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

    // // When the user clicks on <span> (x), close the modal
    // span.click = function() {
    //   modal.style.display = "none";
    // }

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
      this.organization.uoMId = []
      this.uomArray.forEach(uom => {
        this.organization.uoMId.push(uom.uoMId);
      })
      // this.organization.uoM = [this.tempUoM];
      // this.organization.uoM = this.tempUoM
    }
  }
  onUnitChange(value) {
    // console.log(value);
    this.tempMeasurement = value.target.value;
  }

  onUoMDropdownChange(event, uomName: string) {
    // console.log('ahamed ', uomName, event.target.value);
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
