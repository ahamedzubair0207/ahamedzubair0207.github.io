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


  constructor(private modalService: NgbModal, private locationService: LocationService,
    private configSettingsService: ConfigSettingsService, private domSanitizer: DomSanitizer) { 
      this.UOM =  "SI";
    }




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
    this.location = {
      "locationId": "19d7e5e5-fda7-4778-b943-62e36078087a",
      "organizationId": "7899F7C8-156C-4D4C-A60B-FE5C21DE4415",
      "locationName": "",
      "parentLocationId": "4943DF6B-C614-44D2-B0B6-5377DFF961FE",
      "locationType": "",
      "address": [
        {
        "address1": "",
        "address2": "",
        "city": "",
        "state": "",
        "country": "",
        "postalCode": "",
        "addressType": ""
        }
      ],
      "primaryContact": "",
      "primaryDistributor": "",
      "gatewayId": "E9004BB5-67CD-466A-9014-034808A4DA4B",
      "geoFenceType": "BF0BC7B5-1BF8-4A59-A3B5-35904937E89E",
      "geoFenceValue": "55",
  
      "logo":{
      "imageType":"JPEG",
      "imageName": "Organization1",
      "image": "AAABAAIAEBAAAAAAIABoBAAAJgAAACAgAAAAACAAqBAAAI4EAAAoAAAAEAAAACAAAAABACAAAAAAAEAEAAAAAAAAAAAAAAAAAAAAAAAA////Af///wH///8B////Af///wH///8BNzHhVTYx398wLbrHMi7DO////wH///8B////Af///wH///8B////Af///wH///8B////Af///wE3MeE5NzHhxzcx4f83MeD/MC21/zAttf8xLbutMy/HI////wH///8B////Af///wH///8B////ATcx4SE3MeGrNzHh/zcx4f83MeH/NzHg/zAttf8wLbX/MC21/zAttvsxLbyPMy/KD////wH///8B////ATcx4VU3MeH7T0nk/1ZR5f84MuH/NzHh/zcx4P8wLbX/MC21/zAttf9VUsL/S0i+/zAtuPEyLsI9////Af///wE3MeGHNzHh/5OP7v//////bWjp/zcx4f83MeD/MC21/zAttf9bWMT//////4eF1P8wLbX/MS68e////wH///8BNzHhszcx4f9DPeL/9fT9/7279f83MeH/NzHg/zAttf8wLbX/tLPk/+7u+f84Nbf/MC21/zAtt43///8B////ATcx4dk3MeH/NzHh/6il8v/7+/7/2dj5/9nY+f/Y2PH/2Njx//v7/f+Wldn/MC21/zAttf8xLbu/////Af///wE3MeHzNzHh/zcx4f9RTOX//Pz+/+Xk+/+0svP/sbDj/+Pi9f/29vz/Pzy6/zAttf8wLbX/MC275f///wH///8BNzHh/Tcx4f83MeH/NzHh/7679f/t7fz/OzXg/zo3uP/w7/n/paTf/zAttf8wLbX/MC21/zAtuPn///8BNzHhIzcx4f83MeH/NzHh/zcx4f9kX+f//////3156v+OjNb/+/v9/0lHvv8wLbX/MC21/zAttf8wLbX/NC/LDzcx4U03MeH/NzHh/zcx4f83MeH/NzHh/9PR+P/U0vj/6+v3/7W05f8wLbX/MC21/zAttf8wLbX/MC21/zMvx0E3MeFrNzHh/zcx4f83MeH/NzHh/zcx4f96dur///////7+//9WU8L/MC21/zAttf8wLbX/MC21/zAttf8yLsNlNzHhfTcx4f83MeH/NzHh/zcx4f83MeH/OTPh/+bl+//FxOr/MC21/zAttf8wLbX/MC21/zAttf8wLbX/MS68ezcx4UE3MeHVNzHh/zcx4f83MeH/NzHh/zcx4f+PjO7/ZGLI/zAttf8wLbX/MC21/zAttf8wLbX/MS263TAtuUX///8B////ATcx4Sk3MeGFNzHh5zcx4f83MeH/PTfh/zAttf8wLbX/MC21/zAtuuUxLbuFMy/HL////wH///8B////Af///wH///8B////Af///wE3MeFBNzHhlzYx3/MwLbnrMC26izMuxjn///8B////Af///wH///8B////AQAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8oAAAAIAAAAEAAAAABACAAAAAAAIAQAAAAAAAAAAAAAAAAAAAAAAAA////Af///wH///8B////Af///wH///8B////Af///wH///8B////Af///wH///8B////Af///wE3MeGLNjHd9zIuwOMzL8o/////Af///wH///8B////Af///wH///8B////Af///wH///8B////Af///wH///8B////Af///wH///8B////Af///wH///8B////Af///wH///8B////Af///wH///8B////Af///wE3MeFfNzHh8Tcx4f83Md//MC21/zAttv8yLsPLMy/KH////wH///8B////Af///wH///8B////Af///wH///8B////Af///wH///8B////Af///wH///8B////Af///wH///8B////Af///wH///8B////Af///wE3MeE7NzHh4Tcx4f83MeH/NzHh/zcx3/8wLbX/MC21/zAttf8wLbj/My7FrTQvzQv///8B////Af///wH///8B////Af///wH///8B////Af///wH///8B////Af///wH///8B////Af///wH///8B////Af///wE3MeEdNzHhxzcx4f83MeH/NzHh/zcx4f83MeH/NzHf/zAttf8wLbX/MC21/zAttf8wLbX/MS67+zMvx4n///8B////Af///wH///8B////Af///wH///8B////Af///wH///8B////Af///wH///8B////Af///wE3MeEJNzHhqTcx4f03MeH/NzHh/zcx4f83MeH/NzHh/zcx4f83Md//MC21/zAttf8wLbX/MC21/zAttf8wLbX/MC21/zEuvfEzL8lf////Af///wH///8B////Af///wH///8B////Af///wH///8B////Af///wH///8BNzHhgzcx4fk3MeH/NzHh/zcx4f83MeH/NzHh/zcx4f83MeH/NzHh/zcx3/8wLbX/MC21/zAttf8wLbX/MC21/zAttf8wLbX/MC21/zAttf8yLsHfMy/KO////wH///8B////Af///wH///8B////Af///wH///8BNzHhWTcx4e83MeH/NzHh/zcx4f83MeH/NzHh/zcx4f83MeH/NzHh/zcx4f83MeH/NzHf/zAttf8wLbX/MC21/zAttf8wLbX/MC21/zAttf8wLbX/MC21/zAttf8wLbb/Mi7DxzMvyx3///8B////Af///wH///8B////Af///wE3MeH5NzHh/zcx4f9YU+b/d3Lr/3Zy6v92cur/PDfi/zcx4f83MeH/NzHh/zcx4f83Md//MC21/zAttf8wLbX/MC21/zAttf8wLbX/d3XO/3580f9+fNH/TkvA/zAttf8wLbX/Mi7B2f///wH///8B////Af///wH///8B////ATcx4f83MeH/NzHh/1VQ5f/+/v////////////97d+v/NzHh/zcx4f83MeH/NzHh/zcx3/8wLbX/MC21/zAttf8wLbX/MC21/1lXxP////////////r6/f9EQrz/MC21/zAttf8xLr7t////Af///wH///8B////Af///wE3MeEbNzHh/zcx4f83MeH/NzHh/8LA9v///////////8vK9/83MeH/NzHh/zcx4f83MeH/NzHf/zAttf8wLbX/MC21/zAttf8wLbX/s7Lk////////////rq3i/zAttf8wLbX/MC21/zEuu/v///8B////Af///wH///8B////ATcx4U83MeH/NzHh/zcx4f83MeH/aGPo/////////////////1NO5f83MeH/NzHh/zcx4f83Md//MC21/zAttf8wLbX/MC21/0I/u//6+v3///////7+//9QTcD/MC21/zAttf8wLbX/MC22/zUw0gP///8B////Af///wH///8BNzHhfTcx4f83MeH/NzHh/zcx4f83MeH/19b5////////////o6Dx/zcx4f83MeH/NzHh/zcx3/8wLbX/MC21/zAttf8wLbX/lZTZ////////////vbzn/zAttf8wLbX/MC21/zAttf8wLbX/My/LM////wH///8B////Af///wE3MeGlNzHh/zcx4f83MeH/NzHh/zcx4f9+e+z////////////y8f3/tLL0/7Sy9P+0svT/tLLz/7Kx4/+yseP/srHj/7Kx4//v7/n///////////9dW8X/MC21/zAttf8wLbX/MC21/zAttf8zL8hp////Af///wH///8B////ATcx4cM3MeH/NzHh/zcx4f83MeH/NzHh/zs14v/p6Pz/////////////////////////////////////////////////////////////////zc3t/zAttf8wLbX/MC21/zAttf8wLbX/MC21/zMvx5f///8B////Af///wH///8BNzHh3Tcx4f83MeH/NzHh/zcx4f83MeH/NzHh/5OQ7/////////////////////////////////////////////////////////////////9ta8v/MC21/zAttf8wLbX/MC21/zAttf8wLbX/Mi7Fvf///wH///8B////Af///wE3MeHvNzHh/zcx4f83MeH/NzHh/zcx4f83MeH/RD7j//b2/v///////////5eU7/9pZen/aWXn/2RiyP9kYsj/kI7X////////////3Nzz/zEutf8wLbX/MC21/zAttf8wLbX/MC21/zAttf8yLsLZ////Af///wH///8B////ATcx4fs3MeH/NzHh/zcx4f83MeH/NzHh/zcx4f83MeH/qqfy////////////vLr1/zcx4f83Md//MC21/zAttf/Dwur///////////98etD/MC21/zAttf8wLbX/MC21/zAttf8wLbX/MC21/zIuvu3///8B////Af///wH///8BNzHh/zcx4f83MeH/NzHh/zcx4f83MeH/NzHh/zcx4f9STOX//f3////////8/P//SkTk/zcx3/8wLbX/WFXD////////////5+f3/zUyt/8wLbX/MC21/zAttf8wLbX/MC21/zAttf8wLbX/MS67+////wH///8B////ATcx4Ss3MeH/NzHh/zcx4f83MeH/NzHh/zcx4f83MeH/NzHh/zcx4f++vPX///////////+al/D/NzHf/zAttf+6ueb///////////+Ni9b/MC21/zAttf8wLbX/MC21/zAttf8wLbX/MC21/zAttf8wLbb/NTDWBf///wH///8BNzHhXTcx4f83MeH/NzHh/zcx4f83MeH/NzHh/zcx4f83MeH/NzHh/2Vh6P///////////+rp/P86NOD/UU/B//7+////////8vL6/zo3uP8wLbX/MC21/zAttf8wLbX/MC21/zAttf8wLbX/MC21/zAttf80L8s1////Af///wE3MeGJNzHh/zcx4f83MeH/NzHh/zcx4f83MeH/NzHh/zcx4f83MeH/NzHh/9XT+f///////////3dy6f+yseP///////////+cm9z/MC21/zAttf8wLbX/MC21/zAttf8wLbX/MC21/zAttf8wLbX/MC21/zMvyWv///8B////ATcx4a03MeH/NzHh/zcx4f83MeH/NzHh/zcx4f83MeH/NzHh/zcx4f83MeH/enbr////////////29r5//39/v//////+fj9/0NAvP8wLbX/MC21/zAttf8wLbX/MC21/zAttf8wLbX/MC21/zAttf8wLbX/My/Hl////wH///8BNzHhyzcx4f83MeH/NzHh/zcx4f83MeH/NzHh/zcx4f83MeH/NzHh/zcx4f86NOH/5+b7//////////////////////+rqeH/MC21/zAttf8wLbX/MC21/zAttf8wLbX/MC21/zAttf8wLbX/MC21/zAttf8yLsW9////Af///wE3MeHjNzHh/zcx4f83MeH/NzHh/zcx4f83MeH/NzHh/zcx4f83MeH/NzHh/zcx4f+Qje7//////////////////v7//01Lv/8wLbX/MC21/zAttf8wLbX/MC21/zAttf8wLbX/MC21/zAttf8wLbX/MC21/zIuwtn///8B////ATcx4fM3MeH/NzHh/zcx4f83MeH/NzHh/zcx4f83MeH/NzHh/zcx4f83MeH/NzHh/0I84//19P3///////////+7uuf/MC21/zAttf8wLbX/MC21/zAttf8wLbX/MC21/zAttf8wLbX/MC21/zAttf8wLbX/Mi6/7////wH///8BNzHh/Tcx4f83MeH/NzHh/zcx4f83MeH/NzHh/zcx4f83MeH/NzHh/zcx4f83MeH/NzHh/6Wi8f///////////1tZxP8wLbX/MC21/zAttf8wLbX/MC21/zAttf8wLbX/MC21/zAttf8wLbX/MC21/zAttf8xLrv7////Af///wE3MeH9NzHh/zcx4f83MeH/NzHh/zcx4f83MeH/NzHh/zcx4f83MeH/NzHh/zcx4f83MeH/T0rl//39///Jyez/MC21/zAttf8wLbX/MC21/zAttf8wLbX/MC21/zAttf8wLbX/MC21/zAttf8wLbX/MC21/zAtuP////8B////ATcx4QU3MeF5NzHh3Tcx4f83MeH/NzHh/zcx4f83MeH/NzHh/zcx4f83MeH/NzHh/zcx4f83MeH/vLr0/2pnyv8wLbX/MC21/zAttf8wLbX/MC21/zAttf8wLbX/MC21/zAttf8wLbX/MC22/zIuwOczL8aTNC/OFf///wH///8B////Af///wH///8BNzHhEzcx4ZM3MeHpNzHh/zcx4f83MeH/NzHh/zcx4f83MeH/NzHh/zcx4f9QS+P/MS61/zAttf8wLbX/MC21/zAttf8wLbX/MC21/zAttf8wLbb/Mi6/6zMvx5szL8od////Af///wH///8B////Af///wH///8B////Af///wH///8B////Af///wE3MeEpNzHhqTcx4fM3MeH/NzHh/zcx4f83MeH/NzHh/zcx3/8wLbX/MC21/zAttf8wLbX/MC21/zAttf8xLr7vMy/GpTQvzCf///8B////Af///wH///8B////Af///wH///8B////Af///wH///8B////Af///wH///8B////Af///wH///8B////ATcx4UM3MeG/NzHh+Tcx4f83MeH/NzHf/zAttf8wLbX/MC21/zEuvfMzLsWvMy/KMf///wH///8B////Af///wH///8B////Af///wH///8B////Af///wH///8B////Af///wH///8B////Af///wH///8B////Af///wH///8B////Af///wH///8BNzHhYTcx4dE2Md77MS689zIuxbczL8s9////Af///wH///8B////Af///wH///8B////Af///wH///8B////Af///wH///8B////AQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"},
      "latitude": "",
      "longitude": "",
      "active": true,
      "description": "",
      "timeZoneId": "BD92A5F7-BB03-40F4-A7D0-5DABD642BC5B",
      "localeId": "01653A73-BA08-42F3-8182-4169B1385906",
      "uoMId": [
        "3bc642e8-e8dc-48bd-b084-33849c302246",
        "ba111ee0-4083-4fd1-9408-f3381c962163"
          ],
      "createdBy": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "createdOn": "2019-07-30T18:17:55.842Z",
      "modifiedBy": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "modifiedOn": "2019-07-30T18:17:55.842Z"
    }
      
    
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

      this.location.logo = new Logo();
      this.location.logo.imageName = file.name;
      this.location.logo.imageType = file.type;
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
    this.location.logo.image = base64textString;
    console.log('organization ', this.location);
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
  closemodal(event: string){
    this.modal.style.display ="none";
    if (event === 'save') {
      this.UOM = this.tempMeasurement;
      // console.log('this.uomArray ', JSON.stringify(this.uomArray))
      this.location.uoMId = []
      this.uomArray.forEach(uom => {
        this.location.uoMId.push(uom.uoMId);
      })
  }
}
  onUnitChange(value){
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

  onLocationSubmit() {
    // console.log('Ahamed ', this.organization);
    this.locationService.createLocation(this.location)
      .subscribe(response => {
        // console.log('response ', response);
      });
  }
}
