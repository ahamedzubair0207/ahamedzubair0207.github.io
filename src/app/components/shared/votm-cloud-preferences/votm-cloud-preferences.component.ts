import { Component, OnInit, AfterViewInit } from '@angular/core';
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
import { DomSanitizer } from '@angular/platform-browser';
declare var $: any;
@Component({
  selector: 'app-votm-cloud-preferences',
  templateUrl: './votm-cloud-preferences.component.html',
  styleUrls: ['./votm-cloud-preferences.component.scss']
})
export class VotmCloudPreferencesComponent implements OnInit, AfterViewInit {

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
  userRoles: any;
  fileExtension: any;
  userImgURL: any;

  constructor(
    private modalService: NgbModal,
    private configSettingsService: ConfigSettingsService,
    private activeroute: ActivatedRoute,
    private route: Router,
    private datePipe: DatePipe,
    private routerLocation: RouterLocation,
    private toastr: ToastrService,
    private userService: UserService,
    private domSanitizer: DomSanitizer,
  ) { }

  ngOnInit() {
    this.getAllAppInfo();
    this.tempMeasurement = 'Imperial';

    // get loggedIn User Detail
    this.userId = '03c7fb47-58ee-4c41-a9d6-2ad0bd43392a';
    this.getUserDetailInfo();
  }

  ngAfterViewInit() {
    // const fixHelperModified = function(e, tr) {
    //   console.log('sdgdfgghj');
    //   const $originals = tr.children();
    //   const $helper = tr.clone();
    //   $helper.children().each(function (index) {
    //     $(this).width($originals.eq(index).width())
    //   });
    //   return $helper;
    // };
    // const updateIndex = function (e, ui) {
    //   console.log('aaaaaaaaaaaaa');
    //   $('td.index', ui.item.parent()).each(function (i) {
    //     $(this).html(i + 1 + '');
    //   });
    //   $('input[type=text]', ui.item.parent()).each(function (i) {
    //     $(this).val(i + 1);
    //   });
    // };
  
    // $('#myTable tbody').sortable({
    //   helper: fixHelperModified,
    //   stop: updateIndex
    // }).disableSelection();
  
    // $('tbody').sortable({
    //   distance: 5,
    //   delay: 100,
    //   opacity: 0.6,
    //   cursor: 'move',
    //   update: function () { }
    // });
  }

  getUserDetailInfo() {
    this.userService.getUserDetail(this.userId)
      .subscribe(response => {
        this.userprofile = response;
        // console.log('getUserDetailInfo user details---' + this.userId + JSON.stringify(this.userprofile));


        // this.userprofile.userConfigSettings.push(
        //   {
        //     userConfigId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        //     organizationId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        //     organizationName: 'VOTM',
        //     locationId: '06ffab5f-3a55-412b-8ac8-86fa872beec4', // fr-fr
        //     userId: '03c7fb47-58ee-4c41-a9d6-2ad0bd43392a', // 03c7fb47-58ee-4c41-a9d6-2ad0bd43392a
        //     languageId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        //     localeId: '06ffab5f-3a55-412b-8ac8-86fa872beec4', // fr-fr
        //     timeZoneId: '4b781256-4ecd-4c3d-8184-0e3f75912f49', // India
        //     active: true,
        //     description: 'static array',
        //     createdBy: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        //     createdOn: '2019-10-21T05:25:04.124Z',
        //     modifiedBy: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        //     modifiedOn: '2019-10-21T05:25:04.124Z',
        //   }
        // );

        // this.userprofile = {
        //   userId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        //   roleId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        //   roleName: 'string',
        //   organizationId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        //   organizationName: 'string',
        //   locationId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        //   firstName: 'string',
        //   lastName: 'string',
        //   emailId: 'string',
        //   phoneNumber: 'string',
        //   active: true,
        //   logo: {
        //     image: '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',
        //     imageType: 'string',
        //     imageName: 'Chirag'
        //   },
        //   description: 'string',
        //   createdBy: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        //   createdOn: '2019-10-21T09:32:54.864Z',
        //   modifiedBy: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        //   modifiedOn: '2019-10-21T09:32:54.864Z',
        //   userConfigSettings: [
        //     {
        //       userConfigId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        //       organizationId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        //       organizationName: 'VOTM',
        //       locationId: '06ffab5f-3a55-412b-8ac8-86fa872beec4', // fr-fr
        //       userId: '03c7fb47-58ee-4c41-a9d6-2ad0bd43392a', // 03c7fb47-58ee-4c41-a9d6-2ad0bd43392a
        //       languageId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        //       localeId: '06ffab5f-3a55-412b-8ac8-86fa872beec4', // fr-fr
        //       timeZoneId: '4b781256-4ecd-4c3d-8184-0e3f75912f49', // India
        //       active: true,
        //       description: 'static array',
        //       createdBy: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        //       createdOn: '2019-10-21T05:25:04.124Z',
        //       modifiedBy: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        //       modifiedOn: '2019-10-21T05:25:04.124Z',
        //     }
        //   ],
        //   userFavorites: [
        //     {
        //       userFavoriteId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        //       userId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        //       url: 'string',
        //       favoriteName: 'string',
        //       favoriteOrder: 0,
        //       active: true,
        //       createdOn: '2019-10-21T09:32:54.865Z',
        //       createdBy: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        //       modifiedBy: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        //       modifiedOn: '2019-10-21T09:32:54.865Z'
        //     },
        //     {
        //       userFavoriteId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        //       userId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        //       url: 'string',
        //       favoriteName: 'string1',
        //       favoriteOrder: 1,
        //       active: true,
        //       createdOn: '2019-10-21T09:32:54.865Z',
        //       createdBy: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        //       modifiedBy: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        //       modifiedOn: '2019-10-21T09:32:54.865Z'
        //     }
        //   ],
        //   userGuestOrganization: [
        //     {
        //       userGuestId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        //       userId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        //       roleId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        //       roleName: 'string',
        //       organizationId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        //       organizationName: 'string',
        //       locationId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        //       active: true,
        //       description: 'string',
        //       createdBy: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        //       createdOn: '2019-10-21T09:32:54.865Z',
        //       modifiedBy: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        //       modifiedOn: '2019-10-21T09:32:54.865Z'
        //     }
        //   ],
        //   userNotification: [
        //     {
        //       userNotificationId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        //       userId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        //       criticalAlarm: 'string',
        //       warningAlarm: 'string',
        //       infoMessage: 'string',
        //       active: true,
        //       createdOn: '2019-10-21T09:32:54.865Z',
        //       createdBy: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        //       modifiedOn: 'string',
        //       modifiedBy: '3fa85f64-5717-4562-b3fc-2c963f66afa6'
        //     }
        //   ],
        //   userUnitofMeasurement: [
        //     {
        //       userUomId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        //       uomtypeId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        //       uomid: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        //       userId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        //       active: true,
        //       description: 'string',
        //       createdBy: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        //       createdOn: '2019-10-21T09:32:54.865Z',
        //       modifiedOn: '2019-10-21T09:32:54.865Z',
        //       modifiedBy: '3fa85f64-5717-4562-b3fc-2c963f66afa6'
        //     }
        //   ]
        // };
        // if (this.userprofile.logo && this.userprofile.logo.imageName) {
        //   this.fileExtension = this.userprofile.logo.imageName.slice((Math.max(0, this.userprofile.logo.imageName.lastIndexOf('.')) || Infinity) + 1);
        //   this.userImgURL = this.domSanitizer.bypassSecurityTrustUrl(`data:image/${this.fileExtension};base64,${this.userprofile.logo.image}`);
        //   // this.userprofile.logo.imageType = this.fileExtension;
        // }
        console.log('getUserDetailInfo user details---' + this.userId + JSON.stringify(this.userprofile));
      });

  }

  getAllUserRoles() {
    this.userService.getUserAllRoles()
      .subscribe(response => {
        this.userRoles = response;
        console.log('getUserAllRoles ---' + this.userId + JSON.stringify(this.userRoles));
      });
  }

  onuserPreferenceSubmit() {

    this.userService.updateUser(this.userprofile)
      .subscribe(response => {
        this.toaster.onSuccess('Successfully updated', 'Updated');
      }, error => {
        this.toaster.onFailure('Something went wrong. Please fill the form correctly', 'Fail');
      });

  }

  getAllAppInfo() {
    this.configSettingsService.getApplicationInfo()
      .subscribe((response: any) => {
        this.applicationConfiguration = response;
        const uom = this.applicationConfiguration.unitOfMeassurement;
        this.uomModels = {};
        for (let i = 0; i < uom.length; i++) {
          this.uomModels[uom[i].uomTypeName] = '';
        }
        this.fillUoM();
        // this.uomArray = new Array[this.applicationConfiguration.unitOfMeassurement.length];
      });
  }

  fillUoM() {
    const uom = this.applicationConfiguration.unitOfMeassurement;

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
    var modal = document.getElementById('uomModal');
    modal.style.display = 'block';
    this.modal = document.getElementById('uomModal');
    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName('close')[0];

    // When the user clicks anywhere outside of the modal, close it
    // window.onclick = function (event) {
    //   if (event.target == modal) {
    //     console.log('AHAMED');
    //     modal.style.display = "none";
    //   }
    // }

  }

  closemodal(event: string) {
    document.getElementById('uomModal').style.display = 'none';
    // this.modal.style.display = "none";
    if (event === 'save') {
      this.UOM = this.tempMeasurement;
      this.userprofile.uoMId = [];
      this.userprofile.uoM = [];
      const uom = this.applicationConfiguration.unitOfMeassurement;
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
