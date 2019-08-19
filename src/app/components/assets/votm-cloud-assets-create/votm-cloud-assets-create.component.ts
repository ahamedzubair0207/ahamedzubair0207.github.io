import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { AssetsService } from 'src/app/services/assets/assets.service';
import { Asset } from 'src/app/models/asset.model';
import { ConfigSettingsService } from 'src/app/services/configSettings/configSettings.service';
import { ApplicationConfiguration } from 'src/app/models/applicationconfig.model';
import { Logo, File } from 'src/app/models/logo.model';
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
  resultABCD: Blob;
  templateName: any;
  templates: { value: string; text: string; }[];
  previousAsset: any;
  acceptedTemplateChages: boolean;
  previousTemplateName: any;
  isTemplateSelected: boolean;
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
    this.asset.organizationId = this.curOrgId = this.activatedRoute.snapshot.paramMap.get("parentOrgId");
    this.asset.organizationName = this.curOrgName = this.activatedRoute.snapshot.paramMap.get("parentOrgName");
    this.asset.locationId = this.parentLocId = this.activatedRoute.snapshot.paramMap.get("parentLocId");
    this.asset.locationName = this.parentLocName = this.activatedRoute.snapshot.paramMap.get("parentLocName");
    this.asset.parentAssetId = this.parentAssetId = this.activatedRoute.snapshot.paramMap.get("parentAssetId");
    this.asset.parentAssetName = this.parentAssetName = this.activatedRoute.snapshot.paramMap.get("parentAssetName");
    this.pageType = this.activatedRoute.snapshot.data['type'];
    this.pageTitle = `${this.pageType} Asset`;
    this.assetId = this.activatedRoute.snapshot.params['assetId'];

    this.templates = [];
    for (let i = 0; i < 10; i++) {
      this.templates.push({ text: 'Template' + i, value: 'template' + i })
    }

    if (this.assetId) {
      this.assetService.getAssetById(this.assetId)
        .subscribe(response => {
          console.log('response from get ', response);
          this.asset = response;
        });
    }

    this.getScreenLabels();
    this.getAllAppInfo();
    this.asset.active = true;
    this.assetTypes = [{ value: 'assetType1', text: 'assetType1' }, { value: 'assetType2', text: 'assetType2' }]
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  createNestedAsset(event) {
    this.route.navigate([`asset/create/${this.asset.assetId}/${this.asset.assetName}/${this.asset.organizationId}/${this.parentOrganizationInfo.parentOrganizationName}`])
  }

  assetObject() {

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

  onFileChange(event) {
    let reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      console.log('file instanceof Blob ', file instanceof Blob);
      this.asset.documentation = new File();
      this.asset.documentation.fileName = file.name;
      this.asset.documentation.fileType = file.type;
      this.asset.documentation.file = file;
      // this.resultABCD = file;
      // console.log(' this.resultABCD ',  this.resultABCD)
      // reader.readAsDataURL(file);
      // reader.onload = (abcd) => {
      //   this.asset.documentation = new File();
      //   this.asset.documentation.fileName = file.name;
      //   this.asset.documentation.fileType = file.type;
      //   this.asset.documentation.file = reader.result.toString().split(',')[1];
      //   // this.resultABCD =  reader.result;
      //   // this.
      // };
    }
  }

  onFileOpen() {
    const fileURL = URL.createObjectURL(this.asset.documentation.file);
    window.open(fileURL, '_blank');
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
      this.imgURL = this.domSanitizer.bypassSecurityTrustUrl(readerToPreview.result.toString()); //readerToPreview.result;
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
    this.fillDataFromTemplate(event);
  }

  onTemplateChangeAccept() {
    console.log('acceptedTemplateChagesv ', this.acceptedTemplateChages);
    if (this.acceptedTemplateChages) {
      this.previousTemplateName = JSON.parse(JSON.stringify(this.templateName));
      this.templateName = '';
    } else {
      this.assetForm.resetForm();
      setTimeout(() => {
        this.asset = JSON.parse(JSON.stringify(this.previousAsset));
        this.templateName = JSON.parse(JSON.stringify(this.previousTemplateName));
      });

    }
  }

  fillDataFromTemplate(name: string) {
    console.log(' this.templateName ', this.templateName);
    this.isTemplateSelected = true;
    this.assetForm.resetForm();
    setTimeout(() => {
      this.asset = {
        documentationUrl: '', "organizationId": "7a59bdd8-6e1d-48f9-a961-aa60b2918dde", logo: null, assetId: null, documentation: null,
        "organizationName": "Parker 1", "locationId": "d8350103-1bf6-47ce-ac3b-134b071c2a1a", "locationName": "Parent Loc KK", "parentAssetId": null, "parentAssetName": null, "active": true, "assetName": "Name_tqwwo", "assetNumber": "Asset Number123", "assetType": "Type1", "description": "Description1"
      };
      this.previousAsset = JSON.parse(JSON.stringify(this.asset));
    });

    console.log('this.assetForm ', this.assetForm);
  }

  onAssetSubmit() {
    this.asset.documentationUrl = 'ABDFE';
    console.log('ASSET INFO ', JSON.stringify(this.asset));

    this.assetService.createAsset(this.asset)
      .subscribe(response => {
        this.toaster.onSuccess('Successfully saved', 'Saved');
      }, error => {
        let msg = 'Something went wrong. Please fill the form correctly';
        if (error && error.error && error.error.message) {
          msg = error.error.message
        }
        this.toaster.onFailure(msg, 'Fail');
      });



    // if (this.assetForm && this.assetForm.invalid) {
    //   this.toaster.onFailure('Please fill the form correctly.', 'Form is invalid!')
    //   console.log('If block ');
    //   Object.keys(this.assetForm.form.controls).forEach(element => {
    //     this.assetForm.form.controls[element].markAsDirty();
    //   });
    // } else {
    //   if (this.assetId) {
    //     this.assetService.updateAsset(this.asset)
    //       .subscribe(response => {
    //         this.toaster.onSuccess('Successfully saved', 'Saved');
    //         // this.onSuccess('Successfully saved', 'Saved');
    //         this.routerLocation.back();
    //       }, error => {
    //         console.log('AHAMED ERROR ', error)
    //         this.toaster.onFailure('Something went wrong. Please fill the form correctly', 'Fail');
    //       });
    //   } else {
    //     this.assetService.createAsset(this.asset)
    //       .subscribe(response => {
    //         // console.log('response ', response);
    //         this.toaster.onSuccess('Successfully saved', 'Saved');
    //         this.route.navigate([`asset/home/${this.parentAssetId}/${this.parentAssetName}`])
    //       }, error => {
    //         console.log('AHAMED ERROR ', error)
    //         this.toaster.onFailure('Something went wrong. Please fill the form correctly', 'Fail');
    //       });
    //   }
    // }
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
          let msg = 'Something went wrong on server. Please try after sometiime.';
          if (error && error.error && error.error.message) {
            msg = error.error.message;
          }
          this.toaster.onFailure(msg, 'Delete Fail!');
        });
    }
  }


}
