import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { AssetsService } from 'src/app/services/assets/assets.service';
import { Asset } from 'src/app/models/asset.model';
import { ConfigSettingsService } from 'src/app/services/configSettings/configSettings.service';
import { ApplicationConfiguration } from 'src/app/models/applicationconfig.model';
import { Logo } from 'src/app/models/logo.model';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { DatePipe, Location as RouterLocation } from '@angular/common';
import { NgForm, FormGroup } from '@angular/forms';
import { VotmCloudConfimDialogComponent } from '../../shared/votm-cloud-confim-dialog/votm-cloud-confim-dialog.component';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Toaster } from '../../shared/votm-cloud-toaster/votm-cloud-toaster';
@Component({
  selector: 'app-votm-cloud-assets-create',
  templateUrl: './votm-cloud-assets-create.component.html',
  styleUrls: ['./votm-cloud-assets-create.component.scss']
})
export class VotmCloudAssetsCreateComponent implements OnInit {
  public imagePath;
  imgURL: any;
  public message: string;
  closeResult: string;
  modal: any;
  pageLabels: any;
  assetTypes: Array<any>;
  parentOrganizationInfo: any;
  parentLocationInfo: any;
  parentAssetInfo: any;

  pageTitle: string;
  pageType: any;

  assetId: string;
  parentAssetId: string;
  locId: string;
  parentLocId: string;
  asset: Asset = new Asset();
  applicationConfiguration: ApplicationConfiguration = new ApplicationConfiguration();
  curOrgId: string;
  curOrgName: string;
  previousURLToNavigate: string;
  previousUrl: any;
  subscriptions: any;

  @ViewChild('assetForm', null) assetForm: NgForm;
  @ViewChild('confirmBox', null) confirmBox: VotmCloudConfimDialogComponent;
  @ViewChild('file', null) locationImage: any;
  parentLocName: string;
  parentAssetName: string;
  fileName: any;
  fileExtension: string;
  toaster: Toaster = new Toaster(this.toastr);
  constructor(private modalService: NgbModal, private assetService: AssetsService,
    private configSettingsService: ConfigSettingsService, private domSanitizer: DomSanitizer,
    private activatedRoute: ActivatedRoute, private route: Router, private datePipe: DatePipe,
    private routerLocation: RouterLocation, private toastr: ToastrService) { 
      this.subscriptions = route.events.subscribe(event => {
        if (event instanceof NavigationEnd) {
          if (this.previousUrl) {
            this.previousURLToNavigate = JSON.parse(JSON.stringify(this.previousUrl));
          }
          this.previousUrl = event.url;
        }
      });
    }

  ngOnInit() {
    this.curOrgId = this.activatedRoute.snapshot.paramMap.get("curOrgId");
    this.curOrgName = this.activatedRoute.snapshot.paramMap.get("curOrgName");
    this.parentLocId = this.activatedRoute.snapshot.paramMap.get("parentLocId");
    this.parentLocName = this.activatedRoute.snapshot.paramMap.get("parentLocName");
    this.pageType = this.activatedRoute.snapshot.data['type'];
    this.pageTitle = `${this.pageType} Asset`;
    this.assetId = this.activatedRoute.snapshot.params['assetId'];

    this.parentOrganizationInfo = {
      parentOrganizationId: this.curOrgId,
      parentOrganizationName: this.curOrgName
    }
    this.getScreenLabels();
    this.getAllAppInfo();
    this.asset.organizationId = this.parentOrganizationInfo.parentOrganizationId;
    this.asset.parentLocationId = this.parentLocId;
    this.asset.active = true;
    this.assetTypes = [{ value: 'assetType1', text: 'assetType1' }, { value: 'assetType2', text: 'assetType2' }]

  
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  createNestedAsset(event) {
    this.route.navigate([`asset/create/${this.asset.assetId}/${this.asset.assetName}/${this.asset.organizationId}/${this.parentOrganizationInfo.parentOrganizationName}`])
  }

  assetObject(){

  }

  getScreenLabels() {
    this.configSettingsService.getCreateLocScreenLabels()
      .subscribe(response => {
        this.pageLabels = response;
      });
  }

  getAllAppInfo() {
    this.configSettingsService.getApplicationInfo()
      .subscribe((response: any) => {
        this.applicationConfiguration = response;
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
      this.imgURL = this.domSanitizer.bypassSecurityTrustUrl(readerToPreview.result.toString());; //readerToPreview.result;
    }
  }
  handleFileSelect(files) {
    var file = files[0];
    if (files && file) {
      var reader = new FileReader();
      reader.onload = this._handleReaderLoaded.bind(this);

      this.asset.logo = new Logo();
      this.asset.logo.imageName = file.name;
      this.asset.logo.imageType = file.type;
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
    this.asset.logo.image = base64textString;

  }
//Delete Modal
  open(content) {

    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {

      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {

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
  }

  onAssetSubmit() {

    if (this.assetForm && this.assetForm.invalid) {
      this.toaster.onFailure('Please fill the form correctly.', 'Form is invalid!')
      console.log('If block ');
      Object.keys(this.assetForm.form.controls).forEach(element => {
        this.assetForm.form.controls[element].markAsDirty();
      });
    } else {
      if (this.assetId) {
        this.assetService.updateAsset(this.asset)
          .subscribe(response => {
            this.toaster.onSuccess('Successfully saved', 'Saved');
            // this.onSuccess('Successfully saved', 'Saved');
            this.routerLocation.back();
          }, error => {
            console.log('AHAMED ERROR ', error)
            this.toaster.onFailure('Something went wrong. Please fill the form correctly', 'Fail');
          });
      } else {
        this.assetService.createAsset(this.asset)
          .subscribe(response => {
            // console.log('response ', response);
            this.toaster.onSuccess('Successfully saved', 'Saved');
            this.route.navigate([`asset/home/${this.parentAssetId}/${this.parentAssetName}`])
          }, error => {
            console.log('AHAMED ERROR ', error)
            this.toaster.onFailure('Something went wrong. Please fill the form correctly', 'Fail');
          });
      }
    }
  }

  onCancelClick(event) {
    this.routerLocation.back();
  }
  openConfirmDialog() {
    this.confirmBox.open();
  }



  deleteOrganizationById(event) {
    console.log('event on close ', event);
    if (event) {
      this.assetService.deleteAsset(this.asset.assetId)
        .subscribe(response => {
          this.toaster.onSuccess(`You have deleted ${this.asset.assetName} successfully.`, 'Delete Success!');
          this.route.navigate([`asset/home/${this.parentAssetId}/${this.parentAssetName}`])
        }, error => {
          this.toaster.onFailure('Something went wrong on server. Please try after sometiime.', 'Delete Fail!');
        });
    }
  }


}
