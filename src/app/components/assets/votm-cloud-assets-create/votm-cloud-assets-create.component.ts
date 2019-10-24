import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef, OnDestroy, ViewEncapsulation } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { AssetsService } from 'src/app/services/assets/assets.service';
import { Asset } from 'src/app/models/asset.model';
import { ConfigSettingsService } from 'src/app/services/configSettings/configSettings.service';
import { ApplicationConfiguration } from 'src/app/models/applicationconfig.model';
import { Logo, VOTMFile } from 'src/app/models/logo.model';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { DatePipe, Location as RouterLocation } from '@angular/common';
import { NgForm, FormGroup } from '@angular/forms';
import { VotmCloudConfimDialogComponent } from '../../shared/votm-cloud-confim-dialog/votm-cloud-confim-dialog.component';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Toaster } from '../../shared/votm-cloud-toaster/votm-cloud-toaster';
import { OrganizationService } from 'src/app/services/organizations/organization.service';
import { SortArrays } from '../../shared/votm-sort';
import { LocationService } from 'src/app/services/locations/location.service';
declare var $: any;
@Component({
  selector: 'app-votm-cloud-assets-create',
  templateUrl: './votm-cloud-assets-create.component.html',
  styleUrls: ['./votm-cloud-assets-create.component.scss'],
  providers: [DatePipe],
  encapsulation: ViewEncapsulation.None
})
export class VotmCloudAssetsCreateComponent implements OnInit, OnDestroy {
  public imagePath;
  imgURL: any;
  locationImageURL: any;
  parentAssetImageURL: any;
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
  isSignalAssociationClicked = false;
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
  fileExtensionDoc: string;
  toaster: Toaster = new Toaster(this.toastr);
  resultABCD: Blob;
  templateId: any;
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
  docFile: Blob;
  allTemplates: any[] = [];
  templateNameToSave: string;
  organizationList: any[] = [];
  parentAssetsList: any[] = [];
  locationList: any[] = [];
  locationListForDropDown: any[] = [];
  parentAssetListForDropDown: any[];
  assetImageCoordinates: any = {
    x: 0,
    y: 0
  };
  constructor(
    private modalService: NgbModal,
    private assetService: AssetsService,
    private configSettingsService: ConfigSettingsService,
    private domSanitizer: DomSanitizer,
    private activatedRoute: ActivatedRoute,
    private route: Router,
    private datePipe: DatePipe,
    private routerLocation: RouterLocation,
    private toastr: ToastrService,
    private changeDetectorRef: ChangeDetectorRef,
    private locService: LocationService,
    private orgService: OrganizationService
  ) {
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
    this.activatedRoute.paramMap.subscribe(params => {
      this.asset.organizationId = this.curOrgId = params.get("parentOrgId");
      this.asset.organizationName = this.curOrgName = params.get("parentOrgName");
      this.asset.locationId = this.parentLocId = params.get("parentLocId");
      this.asset.locationName = this.parentLocName = params.get("parentLocName");
      this.asset.parentAssetId = this.parentAssetId = params.get("parentAssetId");
      this.asset.parentAssetName = this.parentAssetName = params.get("parentAssetName");
      this.assetId = params.get('assetId');
      if (this.assetId) {
        this.getAssetById();
      }
    });

    this.pageType = this.activatedRoute.snapshot.data['type'];
    this.pageTitle = `${this.pageType} Asset`;

    this.templateWarningMessage = 'This is message';
    this.getAllAssets();
    this.getAllOrganization();
    this.getAllLocations();


    this.getScreenLabels();
    this.getAllAppInfo();
    // this.asset.active = true;
    this.assetTypes = [{ value: 'assetType1', text: 'assetType1' }, { value: 'assetType2', text: 'assetType2' }]
  }
  selAssetIcon = "robot";

  getAssetById() {
    this.assetService.getAssetById(this.assetId)
      .subscribe(response => {
        this.asset = response;
        if (this.asset) {
          this.asset.organizationName = this.curOrgName;
          this.asset.locationName = this.parentLocName;
          this.asset.parentAssetName = this.parentAssetName;
          if (this.asset.logo && this.asset.logo.imageName) {
            this.fileExtension = this.asset.logo.imageName.slice((Math.max(0, this.asset.logo.imageName.lastIndexOf(".")) || Infinity) + 1);
            this.imgURL = this.domSanitizer.bypassSecurityTrustUrl(`data:image/${this.fileExtension};base64,${this.asset.logo.image}`);
            this.asset.logo.imageType = this.fileExtension;
          }



          // if (this.asset.fileStore && this.asset.fileStore.fileName) {
          //   let docExtension = this.asset.fileStore.fileName.slice((Math.max(0, this.asset.fileStore.fileName.lastIndexOf(".")) || Infinity) + 1);
          //   console.log('docExtension ', docExtension);
          //   this.asset.fileStore.fileName = this.asset.fileStore.fileName + '.xlsx';
          //   this.fileExtensionDoc = this.asset.fileStore.fileName.slice((Math.max(0, this.asset.fileStore.fileName.lastIndexOf(".")) || Infinity) + 1);
          //   // let abcd = this.domSanitizer.bypassSecurityTrustUrl(`data:image/xlsx;base64,${selectedTemplate.fileStore.file}`);


          //   // Temp
          //   const url = `data:image/xlsx;base64,${this.asset.fileStore.file}`;
          //   fetch(url)
          //     .then(res => res.blob())
          //     .then(blob => {
          //       let abcd = new File([blob], "File name");
          //       var binaryData = [];
          //       binaryData.push(abcd);
          //       this.docFile = new Blob(binaryData, { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
          //       this.asset.fileStore.fileType = this.fileExtensionDoc;
          //     });


          //   // this.docFileInput.nativeElement = abcd;
          // }
          // // this.previousAsset = JSON.parse(JSON.stringify(this.asset));
          // // this.acceptedTemplateChages = true;



        }
      });
  }

  createNestedAsset(event) {
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

  onFileChange(file) {
    if (file) {
      var binaryData = [];
      binaryData.push(file);

      this.docFile = new Blob(binaryData, { type: file.type })

      this.handleDocSelect(file);
      // let readerToPreview = new FileReader();
      // // this.imagePath = file;
      // readerToPreview.readAsDataURL(file);
      // // readerToPreview.onload = (_event) => {
      // //   this.imgURL = this.domSanitizer.bypassSecurityTrustUrl(readerToPreview.result.toString()); //readerToPreview.result;
      // // }
    }
  }

  onFileOpen() {
    const fileURL = URL.createObjectURL(this.docFile);
    window.open(fileURL, '_blank');
  }

  onImageChangeClick() {
    if (this.acceptedTemplateChages) {
      this.templateWarningMessage = 'Image is inherited from the asset template, changing the value for this field breaks the binding to the asset template.  Do you want to continue?'
      this.imageChangeConfirmBox.open();
    } else {
      this.preview(this.locationImage.nativeElement.files[0]);
    }
  }

  onDocChangeClick() {
    if (this.acceptedTemplateChages) {
      this.templateWarningMessage = 'Documentation is inherited from the asset template, changing the value for this field breaks the binding to the asset template.  Do you want to continue?'
      this.documentChangeConfirmBox.open();
    } else {
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
    this.message = '';
    if (!file) {
      return;
    }

    var mimeType = file.type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = 'Only images are supported.';
      return;
    }
    this.handleFileSelect(file);
    var readerToPreview = new FileReader();
    this.imagePath = file;
    readerToPreview.readAsDataURL(file);
    readerToPreview.onload = (_event) => {
      this.imgURL = this.domSanitizer.bypassSecurityTrustUrl(readerToPreview.result.toString()); //readerToPreview.result;
    };
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
        } else {
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

  handleDocSelect(file) {
    if (file) {
      var reader: any = new FileReader();
      // reader.onload = this._handleReaderLoaded.bind(this);
      this.asset.fileStore = new VOTMFile();
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
        this.asset.fileStore.file = base64textString;
      };


      this.asset.fileStore.fileName = file.name;
      this.asset.fileStore.fileType = file.type;
      // debugger;
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
    debugger;
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  openmodal() {
    this.getAllTemplates();
    // Get the modal
    var modal = document.getElementById('myModal');
    modal.style.display = 'block';
    this.modal = document.getElementById('myModal');
    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName('close')[0];

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
      if (event.target == modal) {
        modal.style.display = 'none';

      }
    }

  }

  getAllTemplates() {
    if (!this.templates || this.templates.length === 0) {
      this.templates = [];
      this.assetService.getAllTemplatesIdAndName()
        .subscribe(response => {
          this.allTemplates = response;
          if (response && response.length > 0) {
            response.forEach(template => {
              this.templates.push({ text: template.templateName, value: template.templateId });
            });
          }
        })
    }
  }


  openTemplateModal() {
    if (!this.templateNameToSave) {
      this.templateNameToSave = this.asset.assetType;
    }
    if (!this.organizationList || this.organizationList.length === 0) {
      this.orgService.getOrganizations()
        .subscribe(response => {
          this.organizationList = response;
        });
    }
    // Get the modal
    var modal = document.getElementById('templateSave');
    modal.style.display = 'block';
    this.modal = document.getElementById('templateSave');
    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName('close')[0];

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
      if (event.target == modal) {
        modal.style.display = 'none';

      }
    }

  }

  closemodal(event: string) {
    this.modal.style.display = 'none';
    if (event === 'save') {
      this.fillDataFromTemplate(event);
    }
  }

  ngAfterViewInit() {
    this.changeDetectorRef.detectChanges();
    const self = this;
    $.fn.drags = function (opt) {

      opt = $.extend({
        handle: '',
        cursor: 'move',
        draggableClass: 'draggable',
        activeHandleClass: 'active-handle'
      }, opt);

      let $selected = null;
      const $elements = (opt.handle === '') ? this : this.find(opt.handle);

      $elements.css('cursor', opt.cursor).on('mousedown', function (e) {
        if (e.target !== this) {
          return;
        }
        if (opt.handle === '') {
          $selected = $(this);
          $selected.addClass(opt.draggableClass);
        } else {
          $selected = $(this).parent();
          $selected.addClass(opt.draggableClass).find(opt.handle).addClass(opt.activeHandleClass);
        }
        const drg_h = $selected.outerHeight();
        const drg_w = $selected.outerWidth();
        const pos_y = $selected.offset().top + drg_h - e.pageY;
        const pos_x = $selected.offset().left + drg_w - e.pageX;
        $(document).on('mousemove', (e) => {
          $selected.offset({
            top: e.pageY + pos_y - drg_h,
            left: e.pageX + pos_x - drg_w
          });
        }).on('mouseup', function (e) {
          console.log($(this));
          $(this).off('mousemove'); // Unbind events from document
          if ($selected !== null) {
            $selected.removeClass(opt.draggableClass);
            console.log($selected.css('left'), $selected.css('top'));
            const x = $selected.css('left');
            const y = $selected.css('top');
            const xpercent = parseInt($selected.css('left'), 10) / ($selected.parent().width() / 100);
            const ypercent = parseInt($selected.css('top'), 10) / ($selected.parent().height() / 100);
            if (xpercent < 0 || xpercent > 100 || ypercent < 0 || ypercent > 100) {
              self.assetImageCoordinates.x = 0;
              self.assetImageCoordinates.x = 0;
              $selected.css('left', '1%');
              $selected.css('top', '6%');
            } else {
              self.assetImageCoordinates.x = parseFloat(x.replace('px', ''));
              self.assetImageCoordinates.y = parseFloat(y.replace('px', ''));
            }
            // $selected.css('left', parseInt($selected.css('left'), 10) / ($selected.parent().width() / 100) + '%');
            // $selected.css('top', parseInt($selected.css('top'), 10) / ($selected.parent().height() / 100) + '%');
            // console.log('herer', );
            // if (self.dropSensor) { self.dropSensor($selected.css('left'), $selected.css('top')); }
            $selected = null;
            // $selected.addClass('pad-18');
          }
        });
        e.preventDefault();
        e.stopPropagation();
        e.cancelBubble = true;
        return false;
      }).on('mouseup', function (e) {
        if (e.target !== this) {
          return;
        }
        if (opt.handle === '') {
          $selected.removeClass(opt.draggableClass);
        } else {
          $selected.removeClass(opt.draggableClass)
            .find(opt.handle).removeClass(opt.activeHandleClass);
        }
        console.log($selected.css('left'), $selected.css('top'));
        const x = $selected.css('left');
        const y = $selected.css('top');
        const xpercent = parseInt($selected.css('left'), 10) / ($selected.parent().width() / 100);
        const ypercent = parseInt($selected.css('top'), 10) / ($selected.parent().height() / 100);
        console.log(xpercent, '=============', ypercent);
        if (xpercent < 0 || xpercent > 100 || ypercent < 0 || ypercent > 100) {
          self.assetImageCoordinates.x = 0;
          self.assetImageCoordinates.x = 0;
          $selected.css('left', '1%');
          $selected.css('top', '6%');
        } else {
          self.assetImageCoordinates.x = parseFloat(x.replace('px', ''));
          self.assetImageCoordinates.y = parseFloat(y.replace('px', ''));
        }
        // $selected.css('left', parseInt($selected.css('left'), 10) / ($selected.parent().width() / 100) + '%');
        // $selected.css('top', parseInt($selected.css('top'), 10) / ($selected.parent().height() / 100) + '%');
        // console.log(self.dropSensor);
        // if (self.dropSensor) {
        //   self.dropSensor($selected.css('left'), $selected.css('top'));
        // }
        // $selected.addClass('pad-18');

        $selected = null;
      });

      return this;

    };
  }

  onTemplateChangeAccept(event) {
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

  getAllAssets() {
    this.assetService.getAllAssets()
      .subscribe(response => {
        this.parentAssetsList = response;
        this.parentAssetsList.sort(SortArrays.compareValues('assetName'));
        this.filterAssets();
      })
  }

  getAllOrganization() {
    if (!this.organizationList || this.organizationList.length === 0) {
      this.orgService.getAllOrganizationsList()
        .subscribe(orgList => {
          this.organizationList = orgList;
          this.organizationList.push({ organizationId: this.asset.organizationId, name: this.asset.organizationName });
          this.organizationList.sort(SortArrays.compareValues('name'));
          this.filterLocations();
          this.filterAssets();
        });
    }
  }

  onParentOrgChange(event) {
    this.asset.locationId = null;
    this.asset.locationName = null;
    this.asset.parentAssetId = null;
    this.asset.parentAssetName = null;
    this.locationImage = null;
    this.filterLocations();
    this.filterAssets();
  }

  filterLocations() {
    if (this.locationList && this.locationList.length > 0) {
      this.locationListForDropDown = [];
      this.locationList.forEach(loc => {
        if (this.asset.organizationId === loc.organizationId) {
          this.locationListForDropDown.push(loc);
          if (this.asset.locationId === loc.locationId) {
            this.getParentImage(loc.logo, 'location')
          }
        }
      });
      if (this.locationListForDropDown && this.locationListForDropDown.length > 0) {
        this.locationListForDropDown.sort(SortArrays.compareValues('locationName'));
      }
    }
  }

  onParentAssetChange(parentassetId) {
    this.parentAssetListForDropDown.forEach(asset => {
      if (parentassetId === asset.assetId) {
        this.getParentImage(asset.logo, 'asset');

      }
    });
  }

  onLocationChange(locationId: string) {
    this.locationList.forEach(loc => {
      if (locationId === loc.locationId) {
        this.getParentImage(loc.logo, 'location')
      }
    });
  }

  getExactImage() {
    if (!this.parentAssetImageURL) {
      this.parentAssetImageURL = this.locationImageURL;
    }
    setTimeout(() => {
      if ($('#asset_position_icon').length === 0) {
        console.log($('#location_asset_position'));
        const $sensor = $(
          '<div class=\'sensor-circle icon-asset-robot position-absolute abc\' id="asset_position_icon">'
        ).html('')
        .css({
          left: '1%',
          top: '6%'
        })
        .appendTo('#location_asset_position');
        $sensor.data(
          'dockEl',
          $sensor
            .clone()
            .on('mousedown', function (e) {
              $(this)
                .removeClass('docked')
                .data('dragEl')
                .removeClass('docked')
                .trigger(
                  $.Event('mousedown', { pageX: e.pageX, pageY: e.pageY })
                );
              return false;
            })
        );
        $('#location_asset_position .abc').drags();
      }
    }, 100);

  }



  getParentImage(logo: any, type) {
    if (logo && logo.imageName) {
      let tempFileExtension = logo.imageName.slice((Math.max(0, logo.imageName.lastIndexOf(".")) || Infinity) + 1);
      type === 'location' ? this.locationImageURL = this.domSanitizer.bypassSecurityTrustUrl(`data:image/${tempFileExtension};base64,${logo.image}`)
        : this.parentAssetImageURL = this.domSanitizer.bypassSecurityTrustUrl(`data:image/${tempFileExtension};base64,${logo.image}`);
      // this.asset.logo.imageType = this.fileExtension;
    } else {
      type === 'location' ? this.locationImageURL = null : this.parentAssetImageURL = null;
    }
    this.getExactImage();
  }

  filterAssets() {
    if (this.parentAssetsList && this.parentAssetsList.length > 0) {
      this.parentAssetListForDropDown = [];
      this.parentAssetsList.forEach(asset => {
        if (this.asset.locationId === asset.locationId && this.asset.assetId !== asset.assetId
          && this.asset.assetId !== asset.parentAssetId
          && !this.isChildNode(this.asset, asset)) {
          this.parentAssetListForDropDown.push(asset);
          if (this.asset.parentAssetId === asset.assetId) {
            this.getParentImage(asset.logo, 'asset');
          }
        }
      });
      if (this.parentAssetListForDropDown && this.parentAssetListForDropDown.length > 0) {
        this.parentAssetListForDropDown.sort(SortArrays.compareValues('assetName'));
      }
    }
  }

  isChildNode(tobeCheckedAsset, tempAsset): boolean {
    // console.log('isChildNode ', tobeCheckedAsset, tempAsset);
    let found: boolean = false;
    let isChild: boolean = false;
    this.parentAssetsList.forEach(asset => {
      if (!found) {
        if (tempAsset.parentAssetId) {
          if (tempAsset.parentAssetId === asset.assetId) {
            if (asset.parentAssetId) {
              if (tobeCheckedAsset.assetId === asset.parentAssetId) {
                isChild = true;
                found = true;
              } else {
                isChild = this.isChildNode(tobeCheckedAsset, asset);
                found = true;
              }
            } else {
              isChild = false;
              found = true;
            }
          }
        } else {
          isChild = false;
          found = true;
        }
      }
    });
    return isChild;
  }

  getAllLocations() {
    this.locService.getAllLocations()
      .subscribe(locList => {
        this.locationList = locList;
        this.filterLocations();
        // this.locationList.push({ organizationId: this.asset.organizationId, name: this.asset.organizationName });
        // this.locationList.sort(SortArrays.compareValues('name'));
      });
  }

  // onParentAssetChange(event) {

  // }

  fillDataFromTemplate(name: string) {
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
      this.getAssetFromTemplate();
    });

  }

  getAssetFromTemplate() {
    let selectedTemplate: Asset;


    this.assetService.getTemplateById(this.templateId)
      .subscribe(response => {
        selectedTemplate = response[0];
        this.asset = {
          assetId: null,
          assetName: selectedTemplate.assetName,
          assetNumber: selectedTemplate.assetNumber,
          assetType: selectedTemplate.assetType,
          description: selectedTemplate.description,
          // documentationUrl: selectedTemplate.documentationUrl,
          // fileStore: selectedTemplate.fileStore,
          locationId: this.parentLocId,
          locationName: this.parentLocName,
          organizationId: this.curOrgId,
          logo: selectedTemplate.logo,
          organizationName: this.curOrgName,
          parentAssetId: this.parentAssetId,
          parentAssetName: this.parentAssetName,
          parentLocationId: this.parentLocId,
          parentLocationName: this.parentLocName,
          templateId: selectedTemplate.templateId,
          templateName: selectedTemplate.templateName
        };
        if (selectedTemplate.logo && selectedTemplate.logo.imageName) {
          this.fileExtension = selectedTemplate.logo.imageName.slice((Math.max(0, selectedTemplate.logo.imageName.lastIndexOf(".")) || Infinity) + 1);
          this.imgURL = this.domSanitizer.bypassSecurityTrustUrl(`data:image/${this.fileExtension};base64,${selectedTemplate.logo.image}`);
          selectedTemplate.logo.imageType = this.fileExtension;
        }

        // Please Don't Touch the below code

        // if (selectedTemplate.fileStore && selectedTemplate.fileStore.fileName) {
        //   let docExtension = selectedTemplate.fileStore.fileName.slice((Math.max(0, selectedTemplate.fileStore.fileName.lastIndexOf(".")) || Infinity) + 1);
        //   console.log('docExtension ', docExtension);
        //   selectedTemplate.fileStore.fileName = selectedTemplate.fileStore.fileName + '.xlsx';
        //   this.fileExtensionDoc = selectedTemplate.fileStore.fileName.slice((Math.max(0, selectedTemplate.fileStore.fileName.lastIndexOf(".")) || Infinity) + 1);
        //   // let abcd = this.domSanitizer.bypassSecurityTrustUrl(`data:image/xlsx;base64,${selectedTemplate.fileStore.file}`);


        //   // Temp
        //   const url = `data:image/xlsx;base64,${selectedTemplate.fileStore.file}`;
        //   fetch(url)
        //     .then(res => res.blob())
        //     .then(blob => {
        //       let abcd = new File([blob], "File name");
        //       var binaryData = [];
        //       binaryData.push(abcd);
        //       this.docFile = new Blob(binaryData, { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
        //       this.asset.fileStore.fileType = this.fileExtensionDoc;
        //     });


        //   // this.docFileInput.nativeElement = abcd;
        // }
        // this.previousAsset = JSON.parse(JSON.stringify(this.asset));
        // this.acceptedTemplateChages = true;

      });


    // this.allTemplates.forEach(template => {
    //   if (template.templateId === this.templateId) {
    //     selectedTemplate = template;
    //   }
    // })

  }

  onDocSelcetion(event) {
    this.asset.fileStore = { fileType: event.files[0].type, file: event.files[0], fileName: event.files[0].name };
  }

  onAssetSubmit() {
    // this.asset.documentationUrl = 'ABDFE';

    if (this.asset) {
      if (!this.asset.logo) {
        this.asset.logo = null;
      }
      if (!this.asset.fileStore) {
        this.asset.fileStore = null;
      }
    }

    if (this.assetForm && this.assetForm.invalid) {
      this.toaster.onFailure('Please fill the form correctly.', 'Form is invalid!')
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
              msg = error.error.message;
            }
            this.toaster.onFailure(msg, 'Fail');
          });
      } else {
        this.assetService.createAsset(this.asset)
          .subscribe(response => {
            this.toaster.onSuccess('Successfully Created', 'Created');
            this.routerLocation.back();
          }, error => {
            let msg = 'Something went wrong. Please fill the form correctly';
            if (error && error.error && error.error.message) {
              msg = error.error.message;
            }
            this.toaster.onFailure(msg, 'Fail');
          });
      }
    }



    // if (this.assetForm && this.assetForm.invalid) {
    //   this.toaster.onFailure('Please fill the form correctly.', 'Form is invalid!')
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
    //         this.toaster.onFailure('Something went wrong. Please fill the form correctly', 'Fail');
    //       });
    //   } else {
    //     this.assetService.createAsset(this.asset)
    //       .subscribe(response => {
    //         this.toaster.onSuccess('Successfully saved', 'Saved');
    //         this.route.navigate([`asset/home/${this.parentAssetId}/${this.parentAssetName}`])
    //       }, error => {
    //         this.toaster.onFailure('Something went wrong. Please fill the form correctly', 'Fail');
    //       });
    //   }
    // }
  }

  onCancelClick(event) {
    this.routerLocation.back();
  }

  openConfirmDialog() {
    this.message = `Are you sure you want to delete the "${this.asset.assetName}" Asset?`;
    this.confirmBox.open();
  }

  deleteAssetById(event) {
    if (event) {
      this.assetService.deleteAsset(this.asset.assetId)
        .subscribe(response => {
          this.toaster.onSuccess(`You have deleted ${this.asset.assetName} successfully.`, 'Delete Success!');
          this.route.navigate([`asset/home/${this.parentAssetId}/${this.parentAssetName}`]);
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
    if (this.acceptedTemplateChages && this.asset.assetType !== this.previousAsset.assetType) {
      this.templateWarningMessage = 'Asset Type is inherited from the asset template, changing the value for this field breaks the binding to the asset template.  Are you sure you want to continue?'
      this.templateConfirmBox.open();
    }
  }

  removeTemplate(event) {
    if (!event) {
      // this.assetForm.resetForm();
      this.asset.assetType = this.previousAsset.assetType;
      this.asset.logo = this.previousAsset.logo;
      // this.asset.documentationUrl = this.previousAsset.documentationUrl;
      this.acceptedTemplateChages = true;
      this.imgURL = null;
      if (this.locationImage && this.locationImage.nativeElement) {
        this.locationImage.nativeElement.value = '';
      }
      if (this.docFileInput && this.docFileInput.nativeElement) {
        this.docFileInput.nativeElement.value = '';
      }
    } else {
      // this.asset.templateId = null;
      // this.asset.templateName = null;
      // this.previousAsset = JSON.parse(JSON.stringify(this.asset));
      this.acceptedTemplateChages = false;
    }
  }

  onSaveAsTemplateClick(event) {
    if (event === 'save') {
      this.asset.templateName = this.templateNameToSave;
      this.assetService.createAssetTemplate(this.asset)
        .subscribe(response => {
          this.templates = [];
          this.modal.style.display = 'none';
        });
      // this.modal.style.display = "none";
    }
  }


  onLockClick1() {
    if (this.pageType.toLowerCase() === 'view') {
      this.route.navigate([`asset/edit/${this.parentLocId}/${this.parentLocName}/${this.parentAssetId}/${this.parentAssetName}/${this.asset.assetId}`])
    } else {
      this.route.navigate([`asset/view/${this.parentLocId}/${this.parentLocName}/${this.parentAssetId}/${this.parentAssetName}/${this.asset.assetId}`])
    }
  }

  onLockClick() {
    let event = 'view';
    if (this.pageType.toLowerCase() === 'view') {
      event = 'edit';
    }

    if (this.asset.parentAssetId) {
      this.route.navigate([`asset/${event}/${this.curOrgId}/${this.curOrgName}/${this.parentLocId}/${this.parentLocName}/${this.parentAssetId}/${this.parentAssetName}/${this.asset.assetId}`])
    } else {
      this.route.navigate([`asset/${event}/${this.curOrgId}/${this.curOrgName}/${this.parentLocId}/${this.parentLocName}/${this.parentAssetId}/${this.parentAssetName}/${this.asset.assetId}`])
    }
  }

  onClickOfNavTab(type) {
    this.isSignalAssociationClicked = false;
    if (type === 'signal_association') {
      this.isSignalAssociationClicked = true;
    }
  }

  ngOnDestroy(): void {
    $('#asset_position_icon').remove();
    this.subscriptions.unsubscribe();
  }
}
