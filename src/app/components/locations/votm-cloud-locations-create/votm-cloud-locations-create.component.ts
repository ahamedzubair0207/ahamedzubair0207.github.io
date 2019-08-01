import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { LocationService } from 'src/app/services/locations/location.service';
import { Location } from 'src/app/models/location.model';
import { ConfigSettingsService } from 'src/app/services/configSettings/configSettings.service';
import { ApplicationConfiguration } from 'src/app/models/applicationconfig.model';
import { Address } from 'src/app/models/address.model';
import { UnitOfMeassurement } from 'src/app/models/unitOfMeassurement.model';
import { Logo } from 'src/app/models/logo.model';
import { DomSanitizer } from '@angular/platform-browser';


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
  UOM:any;
  pageLabels: any;
  locationTypes: Array<any>;
  states: Array<any>;
  countries: Array<any>;
  tempUoM: UnitOfMeassurement;
  tempMeasurement: string;
  parentOrganizationInfo: any;

  uomArray: Array<any> = [];

  location: Location = new Location();
  applicationConfiguration: ApplicationConfiguration = new ApplicationConfiguration();


  constructor(private modalService: NgbModal, private organizationService: LocationService,
    private configSettingsService: ConfigSettingsService, private domSanitizer: DomSanitizer) { this.UOM =  "SI";}

  ngOnInit() {
    this.parentOrganizationInfo = {
      parentOrganizationId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      parentOrganizationName: 'Parker'
    }
    this.getScreenLabels();
    this.location.parentLocationId = this.parentOrganizationInfo.parentLocationId;
    this.location.active = true;

    this.UOM = 'SI';
    this.location.address = [new Address()];
    this.location.address[0].addressType = 'Billing';
    this.locationTypes = [{ value: 'locationType1', text: 'locationType1' }, { value: 'locationType2', text: 'locationType2' }]
    this.states = [{ value: 'state1', text: 'MN' },
    { value: 'state2', text: 'OH' }];
    this.countries = [{ value: 'country1', text: 'USA' },
    { value: 'country2', text: 'Brazil' }];
    this.getAllAppInfo();
  }

  getScreenLabels() {
    this.configSettingsService.getCreateLocScreenLabels()
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
 
    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]); 
    reader.onload = (_event) => { 
      this.imgURL = reader.result; 
    }
  }

  handleFileSelect(files) {
    var file = files[0];
    if (files && file) {
      var reader = new FileReader();
      reader.onload = this._handleReaderLoaded.bind(this);

      // this.location.logo = new Logo();
      // this.location.logo.imageName = file.name;
      // this.location.logo.imageType = file.type;
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
    // this.location.logo.image = base64textString;
    // console.log('organization ', this.organization);
  }

  open(content) {
    console.log(' open  ');
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      console.log(' result  ', result);
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      console.log(' reason  ', reason);
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
      return  `with: ${reason}`;
    }
  }

  openmodal(){
    // Get the modal
var modal = document.getElementById("myModal");
modal.style.display = "block";
this.modal= document.getElementById("myModal");
// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

  }
  closemodal(){
    this.modal.style.display ="none";
  }
  onUnitChange(value){
    debugger
  console.log(value);
  this.UOM = value.target.value;
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

  // onLocationSubmit() {
  //   // console.log('Ahamed ', this.organization);
  //   this.locationService.createLocation(this.location)
  //     .subscribe(response => {
  //       // console.log('response ', response);
  //     });
  // }
}
