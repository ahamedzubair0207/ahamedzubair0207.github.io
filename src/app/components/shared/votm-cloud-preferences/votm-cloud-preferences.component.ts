import { Component, OnInit, Input, AfterViewInit, ViewChild } from '@angular/core';
import { UnitOfMeassurement } from 'src/app/models/unitOfMeassurement.model';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ConfigSettingsService } from 'src/app/services/configSettings/configSettings.service';
import { ApplicationConfiguration } from 'src/app/models/applicationconfig.model';
import { UserProfile } from 'src/app/models/userprofile.model';
import { Logo } from 'src/app/models/logo.model';
import { Toaster } from '../../shared/votm-cloud-toaster/votm-cloud-toaster';
import { ToastrService } from 'ngx-toastr';
import { VotmCloudConfimDialogComponent } from '../../shared/votm-cloud-confim-dialog/votm-cloud-confim-dialog.component';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe, Location as RouterLocation } from '@angular/common';
import { UserService } from 'src/app/services/users/userService';
import { DomSanitizer } from '@angular/platform-browser';
import { AlertsService } from 'src/app/services/alerts/alerts.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { SharedService } from 'src/app/services/shared.service';
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
  uomMeasurement: string;
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
  userImgURL: any = '../../../../assets/images/userPlaceholder.svg';
  public imagePath;
  public message: string;
  @ViewChild('file', null) userImage: any;
  @Input() alertList: any[];
  @ViewChild('confirmBox', null) confirmBox: VotmCloudConfimDialogComponent;
  @ViewChild('confirmDelFavorite', null) confirmDelFavorite: VotmCloudConfimDialogComponent;
  userPreferenceForm: FormGroup;
  userFavEdit: any;
  userCriticalAlaram: string[];
  userWarningAlaram: string[];
  userInfoMessage: string[];
  userNotificationForm: FormGroup;
  selectedUserFavoriteForDelete: any;
  confirmDelUserFavoriteMessage: string;
  userUOMData: any[] = [];
  selectedUserUOMData: any[] = [];

  constructor(
    private modalService: NgbModal,
    private configSettingsService: ConfigSettingsService,
    private activeroute: ActivatedRoute,
    private alertsService: AlertsService,
    private route: Router,
    private router: Router,
    private datePipe: DatePipe,
    private routerLocation: RouterLocation,
    private toastr: ToastrService,
    private userService: UserService,
    private domSanitizer: DomSanitizer,
    private formBuilder: FormBuilder,
    private sharedService: SharedService
  ) { }

  ngOnInit() {

    // this.userPreferenceForm = new FormGroup({
    //   firstName: new FormControl(null, [Validators.required]),
    // });

    // this.userPreferenceForm = this.formBuilder.group({
    //   firstName: ['', Validators.required]
    // });

    this.userNotificationForm = new FormGroup({
      noti_crit_sms: new FormControl(null, [Validators.required]),
      noti_crit_email: new FormControl(null, [Validators.required]),
      noti_crit_web: new FormControl(null, [Validators.required]),
      noti_war_sms: new FormControl(null, [Validators.required]),
      noti_war_email: new FormControl(null, [Validators.required]),
      noti_war_web: new FormControl(null, [Validators.required]),
      noti_info_sms: new FormControl(null, [Validators.required]),
      noti_info_email: new FormControl(null, [Validators.required]),
      noti_info_web: new FormControl(null, [Validators.required])
    });

    this.userId = '03c7fb47-58ee-4c41-a9d6-2ad0bd43392a';
    this.getAllAppInfo();
    this.uomMeasurement = 'Imperial';
    this.getAllAlertsByUserId();
    // get loggedIn User Detail


  }

  onEditViewClick(alert, action) {
    this.router.navigate([`../org/view/${alert.organizationScopeId}/${alert.organizationScopeName}/${alert.organizationScopeId}/alertRule/edit/${alert.alertRuleId}`]);
  }

  getAllAlertsByUserId() {
    this.alertsService.getAllAlertsByUserId(this.userId)
      .subscribe(response => {
        this.alertList = [];
        if (response && response.length > 0) {
          this.alertList = response;
        }
      });
  }


  ngAfterViewInit() {

  }

  getUserDetailInfo() {
    this.userService.getUserDetail(this.userId)
      .subscribe(response => {
        this.userprofile = response;
        if (this.userprofile.logo && this.userprofile.logo.imageName) {
          this.fileExtension = this.userprofile.logo.imageName.slice
            ((Math.max(0, this.userprofile.logo.imageName.lastIndexOf('.')) || Infinity) + 1);
          this.userImgURL = this.domSanitizer.bypassSecurityTrustUrl
            (`data:image/${this.fileExtension};base64,${this.userprofile.logo.image}`);
          // this.userprofile.logo.imageType = this.fileExtension;
        }
        // if (this.userprofile.userUnitofMeasurement) {
        //   this.userUOMData = this.userprofile.userUnitofMeasurement;
        //   for (const userUOM of this.userUOMData) {
        //     console.log(userUOM);
        //     this.uomModels[userUOM.uomtypeId] = userUOM;
        //   }
        // }
        const uom = this.applicationConfiguration.unitOfMeassurement;
        if (!this.userprofile.userConfigSettings) {
          this.userprofile.userConfigSettings = [];
          this.uomMeasurement = 'Imperial';
          this.fillUoM(uom, 'imperialDefault');
        } else {
          this.uomModels = {};
          this.uomMeasurement = this.userprofile.userConfigSettings[0].measurementType;
          if (this.userprofile.userUnitofMeasurement) {
            for (let i = 0; i < uom.length; i++) {
              this.uomModels[uom[i].uomTypeId] = {};
              for (const uomOption of uom[i].uoMView) {
                for (const userUOM of this.userprofile.userUnitofMeasurement) {
                  if (uomOption.uoMId === userUOM.uomid) {
                    this.uomModels[uom[i].uomTypeId] = uomOption;
                    this.uomModels[uom[i].uomTypeId].userUomId = userUOM.userUomId;
                   // this.uomModels[userUOM.uomtypeId] = userUOM;
                   // userUOM.type = this.uomMeasurement;
                  }
                }
              }
            }
            const keys = Object.keys(this.uomModels);
            keys.forEach(key => {
              if (Object.keys(this.uomModels[key]).length === 0) {
                delete this.uomModels[key];
              }
            });
          }
        }
        this.getFavoriteDraggbleRow(this.userprofile);
      });
  }


  getAllAppInfo() {
    this.configSettingsService.getApplicationInfo()
      .subscribe((response: any) => {
        this.applicationConfiguration = response;
        this.applicationConfiguration.unitOfMeassurement = this.applicationConfiguration.unitOfMeassurement.filter(
          uomObj => uomObj.isDisplay
        );
        this.getUserDetailInfo();
        // this.uomArray = new Array[this.applicationConfiguration.unitOfMeassurement.length];
      });
  }

  onUnitChange(value) {
    // // console.log(value);
    const uom = this.applicationConfiguration.unitOfMeassurement;
    this.uomMeasurement = value.target.value;
    if (this.uomMeasurement === 'Imperial') {
      this.fillUoM(uom, 'imperialDefault');
    } else if (this.uomMeasurement === 'Metric') {
      this.fillUoM(uom, 'metricDefault');
    }
  }

  fillUoM(uom, type) {
    this.userUOMData = [];
    this.uomModels = {};
    for (let i = 0; i < uom.length; i++) {
      this.uomModels[uom[i].uomTypeId] = {};
      for (const uomOption of uom[i].uoMView) {
        if (uomOption[type]) {
          this.uomModels[uom[i].uomTypeId] = uomOption;
        }
      }
    }
    const keys = Object.keys(this.uomModels);
    keys.forEach(key => {
      if (Object.keys(this.uomModels[key]).length === 0) {
        delete this.uomModels[key];
      }
    });
    console.log(JSON.stringify(this.uomModels));
  }

  onUoMDropdownChange(uomTypeId, uom) {
    this.uomModels[uomTypeId] = uom;
    this.setUOMMeasurement();
  }

  setUOMMeasurement() {
    let imperialCount = 0;
    let metricCount = 0;
    let customCount = 0;
    const keys = Object.keys(this.uomModels);
    keys.forEach(key => {
      let flag = true;
      if (this.uomModels[key].imperialDefault) {
        flag = false;
        imperialCount += 1;
      }
      if (this.uomModels[key].metricDefault) {
        flag = false;
        metricCount += 1;
      }
      if (flag) {
        customCount += 1;
      }
    });
    console.log(imperialCount, '====', metricCount, '=======', customCount, '===', keys.length);
    if (imperialCount === keys.length) {
      this.uomMeasurement = 'Imperial';
    } else if (metricCount === keys.length) {
      this.uomMeasurement = 'Metric';
    } else {
      this.uomMeasurement = 'Custom';
    }
  }

  getUOMSelected(uomTypeId) {
    this.userUOMData.forEach(uom => {
      if (uom.uomtypeId === uomTypeId) {
        return uom.uomid;
      }
    });
  }

  onSaveUOMDetails() {

    this.closemodal('save');
    if (!this.userprofile.userConfigSettings) {
      this.userprofile.userConfigSettings = [];
    }
    const keys = Object.keys(this.uomModels);
    this.userprofile.userUnitofMeasurement = [];
    keys.forEach(key => {
      this.userprofile.userUnitofMeasurement.push( {
        uomid: this.uomModels[key].uoMId,
        uomtypeId: key,
        userUomId: this.uomModels[key].userUomId ? this.uomModels[key].userUomId : undefined,
        userId: this.userId,
        active: true
      });
    });
    this.userprofile.userConfigSettings[0].measurementType = this.uomMeasurement;

  }

  getFavoriteDraggbleRow(userprofile) {
    setTimeout(() => {
      const fixHelperModified = function (e, tr) {
        const $originals = tr.children();
        const $helper = tr.clone();
        $helper.children().each(function (index) {
          $(this).width($originals.eq(index).width());
        });
        return $helper;
      };
      const updateIndex = function (e, ui) {
        $('td.index', ui.item.parent()).each(function (i) {
          $(this).html(i + 1 + '');
        });
        // $('input.favoriteOrder', ui.item.parent()).each(function (i) {
        //   $(this).val(i + 1);
        // });
        $('input.favoriteOrderId', ui.item.parent()).each(function (i) {

          for (let j = 0; j < userprofile.userFavorites.length; j++) {
            if ($(this).val() === userprofile.userFavorites[j].userFavoriteId) {
              // console.log(userprofile.userFavorites[j].userFavoriteId + '===' + (j + 1) + '---' + $(this).val() + '===' + i);
              userprofile.userFavorites[j].favoriteOrder = i + 1;
              // console.log('for loop-', JSON.stringify(userprofile.userFavorites[j]));
            }

          }

          // for (let fav of userprofile.userFavorites) {
          //   console.log('fav---', fav);
          // }

        });
        //console.log('userprofilefav-', JSON.stringify(userprofile.userFavorites));
        //console.log('this.userprofile=', JSON.stringify(this.userprofile.userFavorites));
      };

      $('#myFavTable tbody').sortable({
        helper: fixHelperModified,
        stop: updateIndex
      }).disableSelection();

      $('#myFavTable tbody').sortable({
        distance: 5,
        delay: 100,
        opacity: 0.6,
        cursor: 'move',
        update: function () { }
      });

    }, 1000);
  }

  getAllUserRoles() {
    this.userService.getUserAllRoles()
      .subscribe(response => {
        this.userRoles = response;
        // console.log('getUserAllRoles ---' + this.userId + JSON.stringify(this.userRoles));
      });
  }

  onuserPreferenceSubmit(userPreferenceForm: any) {
    this.userService.updateUser(this.userprofile)
      .subscribe(response => {
        this.toaster.onSuccess('User Successfully updated', 'Updated');
        this.sharedService.getFavorites(); // get latest favorites for side bar menu if edited
        this.getUserDetailInfo();
        // Disabled All edit favorites input on preference save
        for (const userfavorites of this.userprofile.userFavorites) {
          userfavorites.disabled = false;
        }

      }, error => {
        this.toaster.onFailure('Something went wrong. Please fill the form correctly', 'Fail');
      });

  }



  onEditFavorite(favId: any) {
    // for toggle disabled
    /*
    if (this.userprofile.userFavorites[favId].disabled) {
      this.userprofile.userFavorites[favId].disabled = false;
    } else {
      this.userprofile.userFavorites[favId].disabled = true;
    }*/
    /*
      Uncomment if don't want input edit toggle(enable disabled on "edit" btn click),
      below code will enable favorite name input once clicked
    */
    this.userprofile.userFavorites[favId].disabled = true;
  }

  onClickOfConfirmDeleteUserFavorite(userFav) {
    this.selectedUserFavoriteForDelete = userFav;
    this.confirmDelUserFavoriteMessage = 'Are you sure, you want to delete this Favorite "' + userFav.favoriteName + '" ?';
    this.confirmDelFavorite.open();
  }

  onClickOfDeleteUserFavorite(event) {
    if (event) {
      this.userService.deleteUserFavorite(this.selectedUserFavoriteForDelete.userFavoriteId).subscribe(
        response => {
          this.toaster.onSuccess('Favorite Successfully deleted.', 'Deleted');
          this.getUserDetailInfo();
          this.sharedService.getFavorites(); // get favorites for side bar menu
          this.selectedUserFavoriteForDelete = undefined;
        }, error => {
          this.toaster.onFailure('Error while deleting favorites.', 'Deleted');
          this.selectedUserFavoriteForDelete = undefined;
        }
      );
    }
  }

  onClickOfNotificationTab() {
    if (this.userprofile && this.userprofile.userNotification[0]) {
      this.userNotificationForm = new FormGroup({
        noti_crit_sms: new FormControl(this.userprofile.userNotification[0].criticalAlarm.includes('SMS+Web')),
        noti_crit_email: new FormControl(this.userprofile.userNotification[0].criticalAlarm.includes('Email+Web')),
        noti_crit_web: new FormControl(this.userprofile.userNotification[0].criticalAlarm.includes('Web Only')),
        noti_war_sms: new FormControl(this.userprofile.userNotification[0].warningAlarm.includes('SMS+Web')),
        noti_war_email: new FormControl(this.userprofile.userNotification[0].warningAlarm.includes('Email+Web')),
        noti_war_web: new FormControl(this.userprofile.userNotification[0].warningAlarm.includes('Web Only')),
        noti_info_sms: new FormControl(this.userprofile.userNotification[0].infoMessage.includes('SMS+Web')),
        noti_info_email: new FormControl(this.userprofile.userNotification[0].infoMessage.includes('Email+Web')),
        noti_info_web: new FormControl(this.userprofile.userNotification[0].infoMessage.includes('Web Only'))
      });
      // this.getUserDetailInfo();
    }
  }

  onUserNotificationSave() {
    const userNotificationObj = { ...this.userNotificationForm.value };
    // const userNotificationObj = {};
    userNotificationObj.userId = this.userId;
    userNotificationObj.criticalAlarm = $('.criticalNotificationClass:checked').map(function() { return this.value; }).get().join(',');
    userNotificationObj.warningAlarm = $('.warningNotificationClass:checked').map(function() { return this.value; }).get().join(',');
    userNotificationObj.infoMessage = $('.infoNotificationClass:checked').map(function() { return this.value; }).get().join(',');
    userNotificationObj.active = true;

    this.userService.updateUserNotification(userNotificationObj).subscribe(
      response => {
        this.toaster.onSuccess('Notification Delivery Methods Successfully updated.', 'Updated');
        this.getUserDetailInfo();
      }, error => {
        this.toaster.onFailure('Error while updating Notification Delivery Methods.', 'Error');
      }
    );

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
    this.previousUOM = JSON.parse(JSON.stringify(this.userprofile.uoMId));
    // Get the modal
    var modal = document.getElementById('uomModal');
    modal.style.display = 'block';
    this.modal = document.getElementById('uomModal');
    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName('close')[0];

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    }

  }

  closemodal(event: string) {
    document.getElementById('uomModal').style.display = 'none';
    // this.modal.style.display = "none";
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
      this.userImgURL = this.domSanitizer.bypassSecurityTrustUrl(readerToPreview.result.toString());; //readerToPreview.result;
    };
  }

  handleFileSelect(files) {
    var file = files[0];
    if (files && file) {
      var reader: any = new FileReader();
      // reader.onload = this._handleReaderLoaded.bind(this);
      reader.onload = (e) => {
        // ADDED CODE
        let data;
        if (!e) {
          data = reader.content;
        } else {
          data = e.target.result;
        }
        let base64textString = btoa(data);
        this.userprofile.logo.image = base64textString;
      };

      this.userprofile.logo = new Logo();
      this.userprofile.logo.imageName = file.name;
      this.userprofile.logo.imageType = file.type;
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
    this.userprofile.logo.image = base64textString;

  }


}
