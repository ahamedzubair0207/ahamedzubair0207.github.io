import { Component, OnInit } from '@angular/core';
import { UnitOfMeassurement } from 'src/app/models/unitOfMeassurement.model';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ConfigSettingsService } from 'src/app/services/configSettings/configSettings.service';
import { ApplicationConfiguration } from 'src/app/models/applicationconfig.model';
import { UserProfile } from 'src/app/models/userprofile.model';
import { Toaster } from '../../shared/votm-cloud-toaster/votm-cloud-toaster';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe, Location as RouterLocation } from '@angular/common';
import { UserService } from 'src/app/services/users/userService';

@Component({
  selector: 'app-votm-cloud-preferences',
  templateUrl: './votm-cloud-preferences.component.html',
  styleUrls: ['./votm-cloud-preferences.component.scss']
})
export class VotmCloudPreferencesComponent implements OnInit {

  modal: any;
  UOM: any;
  tempUoM: UnitOfMeassurement;
  tempMeasurement: string;
  uomModels: {};
  uomArray: any[];
  previousUOM: any;
  pageType: string;
  closeResult: string;
  applicationConfiguration: ApplicationConfiguration = new ApplicationConfiguration();
  userprofile: UserProfile;
  toaster: Toaster = new Toaster(this.toastr);
  userId: string;
  userDetails: any;

  constructor(
    private modalService: NgbModal,
    private configSettingsService: ConfigSettingsService,
    private activeroute: ActivatedRoute,
    private route: Router,
    private datePipe: DatePipe,
    private routerLocation: RouterLocation,
    private toastr: ToastrService,
    private userService: UserService
    ) { }

  ngOnInit() {
    this.getAllAppInfo();
    this.tempMeasurement = 'Imperial';

    // get loggedIn User Detail
    this.userId = '03c7fb47-58ee-4c41-a9d6-2ad0bd43392a';
    this.getUserDetailInfo();
  }

  getUserDetailInfo() {
    this.userService.getUserDetail(this.userId)
      .subscribe(response => {
        this.userprofile = response;
        console.log('getUserDetailInfo user details---' + this.userId + JSON.stringify(this.userprofile));
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

    if (uom && uom.length > 0 && this.userprofile && this.userprofile.uoM) {
      for (let i = 0; i < uom.length; i++) {
        for (let j = 0; j < this.userprofile.uoM.length; j++) {
          for (let k = 0; k < uom[i].uoMView.length; k++) {
            if (this.userprofile.uoM[j] === uom[i].uoMView[k].uoMId) {
              this.uomModels[uom[i].uomTypeName] = uom[i].uoMView[k].uoMId;
            }
          }
        }
      }
    }
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

  openModal() {
    if (!this.userprofile.uoMId) {
      this.userprofile.uoMId = [];
    }
    this.previousUOM = JSON.parse(JSON.stringify(this.userprofile.uoMId))
    // Get the modal
    var modal = document.getElementById("uomModal");
    modal.style.display = "block";
    this.modal = document.getElementById("uomModal");
    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks anywhere outside of the modal, close it
    // window.onclick = function (event) {
    //   if (event.target == modal) {
    //     console.log('AHAMED');
    //     modal.style.display = "none";
    //   }
    // }

  }

  closemodal(event: string) {
    document.getElementById("uomModal").style.display = "none";
    // this.modal.style.display = "none";
    if (event === 'save') {
      this.UOM = this.tempMeasurement;
      this.userprofile.uoMId = [];
      this.userprofile.uoM = [];
      let uom = this.applicationConfiguration.unitOfMeassurement;
      if (uom && uom.length > 0) {
        for (let i = 0; i < uom.length; i++) {
          if (this.uomModels[uom[i].uomTypeName]) {
            this.userprofile.uoM.push(this.uomModels[uom[i].uomTypeName]);
            this.userprofile.uoMId.push(this.uomModels[uom[i].uomTypeName]);
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

  onCancelClick(event) {
    this.routerLocation.back();
  }

  onLockClick() {
    if (this.pageType.toLowerCase() === 'view') {
      this.route.navigate([`preferences/edit`]);
    } else {
      this.route.navigate([`preferences/view`]);
    }
  }

}
