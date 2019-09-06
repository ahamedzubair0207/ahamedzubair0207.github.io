import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
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
  isSaveTemplateDisabled: boolean;

  @ViewChild('assetForm', null) assetForm: NgForm;
  @ViewChild('confirmBox', null) confirmBox: VotmCloudConfimDialogComponent;
  @ViewChild('templateConfirmBox', null) templateConfirmBox: VotmCloudConfimDialogComponent;
  @ViewChild('imageChangeConfirmBox', null) imageChangeConfirmBox: VotmCloudConfimDialogComponent;
  @ViewChild('documentChangeConfirmBox', null) documentChangeConfirmBox: VotmCloudConfimDialogComponent;
  @ViewChild('file', null) locationImage: ElementRef;

  @ViewChild('fileInput', null) docFileInput: ElementRef;
  parentLocName: string;
  parentAssetName: string;
  fileName: any;
  fileExtension: string;
  toaster: Toaster = new Toaster(this.toastr);
  resultABCD: Blob;
  templateName: any;
  templates: { value: string; text: string; }[];
  previousAsset: any;
  acceptedTemplateChages: boolean = false;
  previousTemplateName: any;
  isTemplateSelected: boolean;
  assetToDelete: any;
  assetNameToDelete: any;
  templateWarningMessage: string;
  isConfirmToChangeImage: any;
  clickedCheckBox: number = 0;
  count: number = 0;
  abc: any;
  constructor(private modalService: NgbModal, private assetService: AssetsService,
    private configSettingsService: ConfigSettingsService, private domSanitizer: DomSanitizer,
    private activatedRoute: ActivatedRoute, private route: Router, private datePipe: DatePipe,
    private routerLocation: RouterLocation, private toastr: ToastrService,
    private changeDetectorRef: ChangeDetectorRef) {
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
    this.templateWarningMessage = 'This is message';
    // this.asset = {
    //   "organizationId": "ca58be27-9b16-4fff-afcc-0602fbb71f5e",
    //   "organizationName": "Parker Test",
    //   "locationName": "Parent Loc KK",
    //   "locationId": "629c640e-5468-42e3-8f6a-0b97cb63f274",
    //   "parentLocationId": "",
    //   "parentAssetId": "",
    //   "assetNumber": "string",
    //   "parentAssetName": null,
    //   "assetName": "dfdfdfererererer",
    //   "parentLocationName": '',
    //   "assetType": "string",
    //   documentationUrl: '',
    //   "description": "string",
    //   assetId: 'null'
    // };

    this.templates = [];
    for (let i = 0; i < 10; i++) {
      this.templates.push({ text: 'Template' + i, value: 'template' + i })
    }

    if (this.assetId) {
      this.assetService.getAssetById(this.assetId)
        .subscribe(response => {
          console.log('response from get ', response);
          this.asset = response;
          if (this.asset) {
            this.asset.organizationName = this.curOrgName;
            this.asset.locationName = this.parentLocName;
            this.asset.parentAssetName = this.parentAssetName;
          }
        });
    }

    this.getScreenLabels();
    this.getAllAppInfo();
    // this.asset.active = true;
    this.assetTypes = [{ value: 'assetType1', text: 'assetType1' }, { value: 'assetType2', text: 'assetType2' }]
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  createNestedAsset(event) {
    console.log('this.asset ', this.asset)
    this.route.navigate([`asset/create/${this.asset.organizationId}/${this.asset.organizationName}/${this.asset.locationId}/${this.asset.locationName}/${this.asset.assetId}/${this.asset.assetName}`])

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
    if (event) {
      let file = event;
      console.log('file instanceof Blob ', file instanceof Blob);
      this.asset.fileStore = new File();
      this.asset.fileStore.fileName = file.name;
      this.asset.fileStore.fileType = file.type;
      this.asset.fileStore.file =file;
      this.resultABCD = file;
      console.log('AHAMED', this.resultABCD)
    }
  }

  onFileOpen() {
    const fileURL = URL.createObjectURL(this.asset.fileStore.file);
    window.open(fileURL, '_blank');
  }

  onImageChangeClick() {
    if (this.acceptedTemplateChages) {
      this.templateWarningMessage = 'Image is inherited from the asset template, changing the value for this field breaks the binding to the asset template.  Do you want to continue?'
      this.imageChangeConfirmBox.open();
    } else {
      console.log('locationImage ', this.docFileInput.nativeElement.files[0]);
      this.preview(this.locationImage.nativeElement.files[0]);
    }
  }

  onDocChangeClick() {
    if (this.acceptedTemplateChages) {
      this.templateWarningMessage = 'Documentation is inherited from the asset template, changing the value for this field breaks the binding to the asset template.  Do you want to continue?'
      this.documentChangeConfirmBox.open();
    } else {
      console.log('docFileInput ', this.docFileInput.nativeElement.files[0]);
      this.onFileChange(this.docFileInput.nativeElement.files[0]);
    }
  }

  changeImage(event) {
    if (event) {
      this.preview(this.locationImage.nativeElement.files[0]);
    }
    this.removeTemplate(event);
  }

  changeDocumentation(event) {
    if (event) {
      this.onFileChange(this.docFileInput.nativeElement.files[0]);
    }
    this.removeTemplate(event);
  }

  shouldLoadImage(files) {
    if (this.isConfirmToChangeImage) {

      if (this.isConfirmToChangeImage === 'change') {
        this.preview(files);
      }
      this.isConfirmToChangeImage = null;
    } else {
      setTimeout(() => {
        this.shouldLoadImage(files);
      });
    }
  }

  shouldLoadDocument(event) {
    // console.log('shouldLoadDocument', this.isConfirmToChangeImage);
    // if (this.asset.templateId) {
    //   if (this.isConfirmToChangeImage) {
    //     console.log('shouldLoadDocument AHAmed', this.isConfirmToChangeImage);
    //     if (this.isConfirmToChangeImage === 'change') {
    //       console.log('Should Load ', this.isConfirmToChangeImage)
    //       this.onFileChange(event);
    //     }
    //     this.isConfirmToChangeImage = null;
    //   } else {
    //     setTimeout(() => {
    //       this.shouldLoadDocument(event);
    //     });
    //   }
    // }
  }

  preview(file) {
    console.log('Loaded Preview')
    this.message = "";
    if (!file)
      return;

    var mimeType = file.type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }
    this.handleFileSelect(file);
    var readerToPreview = new FileReader();
    this.imagePath = file;
    readerToPreview.readAsDataURL(file);
    readerToPreview.onload = (_event) => {
      this.imgURL = this.domSanitizer.bypassSecurityTrustUrl(readerToPreview.result.toString()); //readerToPreview.result;
    }
  }

  handleFileSelect(file) {
    if (file) {
      var reader: any = new FileReader();
      // reader.onload = this._handleReaderLoaded.bind(this);
      reader.onload = (e) => {
        // ADDED CODE
        let data;
        if (!e) {
          data = reader.content;
        }
        else {
          data = e.target.result;
        }
        let base64textString = btoa(data);
        // console.log('this.organization ', this.location, data)
        this.asset.logo.image = base64textString;
      };

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

  openTemplateModal() {
    // Get the modal
    var modal = document.getElementById("templateSave");
    modal.style.display = "block";
    this.modal = document.getElementById("templateSave");
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

  ngAfterViewInit() {
    this.changeDetectorRef.detectChanges();
  }

  onTemplateChangeAccept(event) {
    console.log(event, this.acceptedTemplateChages);
    if (this.acceptedTemplateChages) {
      if (window.confirm('This will break the binding to the asset template. Do you want to continue?')) {
        this.acceptedTemplateChages = !this.acceptedTemplateChages;
        this.removeTemplate(true);
      } else {
        event.preventDefault();
        this.removeTemplate(false);
      }
    } else {
      this.removeTemplate(false);
    }
    // console.log(event, this.acceptedTemplateChages)
    // if (!event) {
    //   setTimeout(() => {
    //     this.templateWarningMessage = 'This change will remove the template binding';
    //     this.templateConfirmBox.open();
    //   }, 100);
    //   this.changeDetectorRef.detectChanges();

    // }    
  }

  fillDataFromTemplate(name: string) {
    console.log(' this.templateName ', this.templateName);
    this.isTemplateSelected = true;
    this.assetForm.resetForm();
    setTimeout(() => {
      this.imgURL = null;
      this.imagePath = null;
      if (this.locationImage && this.locationImage.nativeElement) {
        this.locationImage.nativeElement.value = '';
      }
      if (this.docFileInput && this.docFileInput.nativeElement) {
        this.docFileInput.nativeElement.value = '';
      }
      this.asset = {
        assetId: null,
        assetName: 'Template',
        assetNumber: '1234',
        assetType: 'AssetType',
        description: 'description',
        documentationUrl: null,
        fileStore: {file: '', fileName:'', fileType:''},
        locationId: this.parentLocId,
        locationName: this.parentLocName,
        organizationId: this.curOrgId,
        logo: null,
        organizationName: this.curOrgName,
        parentAssetId: this.parentAssetId,
        parentAssetName: this.parentAssetName,
        parentLocationId: this.parentLocId,
        parentLocationName: this.parentLocName,
        templateId: 'id',
        templateName: 'template name'
      };
      this.previousAsset = JSON.parse(JSON.stringify(this.asset));
      this.acceptedTemplateChages = true;
    });

    console.log('this.assetForm ', this.assetForm);
  }

  onAssetSubmit() {
    this.asset.documentationUrl = 'ABDFE';
    console.log('ASSET INFO ', this.asset);

    if (this.assetForm && this.assetForm.invalid) {
      this.toaster.onFailure('Please fill the form correctly.', 'Form is invalid!')
      console.log('If block ');
      Object.keys(this.assetForm.form.controls).forEach(element => {
        this.assetForm.form.controls[element].markAsDirty();
      });
    } else {
      if (!this.acceptedTemplateChages) {
        this.asset.templateId = null;
        this.asset.templateName = null;
      }
      if (this.assetId) {
        this.assetService.updateAsset(this.asset)
          .subscribe(response => {
            this.toaster.onSuccess('Successfully updated', 'Updated');
            this.routerLocation.back();
          }, error => {
            let msg = 'Something went wrong. Please fill the form correctly';
            if (error && error.error && error.error.message) {
              msg = error.error.message
            }
            this.toaster.onFailure(msg, 'Fail');
          });
      } else {
        this.assetService.createAsset(this.asset)
          .subscribe(response => {
            this.toaster.onSuccess('Successfully saved', 'Saved');
            this.routerLocation.back();
          }, error => {
            let msg = 'Something went wrong. Please fill the form correctly';
            if (error && error.error && error.error.message) {
              msg = error.error.message
            }
            this.toaster.onFailure(msg, 'Fail');
          });
      }
    }



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
    this.message = `Do you want to delete the "${this.asset.assetName}" Asset?`;
    this.confirmBox.open();
  }

  deleteAssetById(event) {
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

  onAssetTypeChange() {
    console.log('onAssetTypeChange');
    if (this.acceptedTemplateChages && this.asset.assetType !== this.previousAsset.assetType) {
      this.templateWarningMessage = 'Asset Type is inherited from the asset template, changing the value for this field breaks the binding to the asset template.  Do you want to continue?'
      this.templateConfirmBox.open();
    }
  }

  removeTemplate(event) {
    console.log(event);
    if (!event) {
      // this.assetForm.resetForm();
      console.log('this.previousAsset ', this.previousAsset, this.asset);
      this.asset.assetType = this.previousAsset.assetType;
      this.asset.logo = this.previousAsset.logo;
      this.asset.documentationUrl = this.previousAsset.documentationUrl;
      this.acceptedTemplateChages = true;
      this.imgURL = null;
      if (this.locationImage && this.locationImage.nativeElement) {
        this.locationImage.nativeElement.value = ''
      }
      if (this.docFileInput && this.docFileInput.nativeElement) {
        this.docFileInput.nativeElement.value = '';
      }
      console.log('this.assetForm ', this.docFileInput)
    } else {
      // this.asset.templateId = null;
      // this.asset.templateName = null;
      // this.previousAsset = JSON.parse(JSON.stringify(this.asset));
      this.acceptedTemplateChages = false;
    }
  }

  onSaveAsTemplateClick(){
    console.log('onSaveAsTemplateClick ', this.asset);
    this.assetService.createAssetTemplate(this.asset)
    .subscribe(response=>{

      console.log('response ', response);
    })
  }
}
