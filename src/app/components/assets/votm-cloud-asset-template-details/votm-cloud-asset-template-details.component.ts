import { Component, OnInit, ViewChild } from '@angular/core';
import { DatePipe, Location as RouterLocation } from '@angular/common';
import { ActivatedRoute, Params } from '@angular/router';
import { AssetsService } from 'src/app/services/assets/assets.service';
import { OrganizationService } from 'src/app/services/organizations/organization.service';
import { SortArrays } from '../../shared/votm-sort';
import { NgForm } from '@angular/forms';
import { Toaster } from '../../shared/votm-cloud-toaster/votm-cloud-toaster';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-votm-cloud-asset-template-details',
  templateUrl: './votm-cloud-asset-template-details.component.html',
  styleUrls: ['./votm-cloud-asset-template-details.component.scss']
})
export class VotmCloudAssetTemplateDetailsComponent implements OnInit {
  templateId: string;
  template: any = {};
  pageType: string;
  organizationList: any[] = [];
  parentAssetsList: any[] = [];
  parentAssetListForDropDown: any[] = [];
  asset: any;
  toaster: Toaster = new Toaster(this.toastr);
  @ViewChild('templateForm', null) templateForm: NgForm;

  constructor(private routerLocation: RouterLocation, private assetService: AssetsService,
    private route: ActivatedRoute, private orgService: OrganizationService, private toastr: ToastrService) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.templateId = params.templateId;
        if (this.templateId) {
          this.fetchTemplateById();
        }
      });
    this.pageType = this.route.snapshot.data['type'];
    this.getAllAssets();
    this.getAllOrganization();
  }

  onCancelClick(event) {
    this.routerLocation.back();
  }

  fetchTemplateById() {
    this.assetService.getTemplateById(this.templateId)
      .subscribe(response => {
        // console.log('Response from Template ', response);
        if (response && response.length > 0) {
          this.template = response[0];
        }
      });
  }

  getAllOrganization() {
    if (!this.organizationList || this.organizationList.length === 0) {
      this.orgService.getAllOrganizationsList()
        .subscribe(orgList => {
          this.organizationList = orgList;

          // this.organizationList.push({ organizationId: this.template.organizationId, name: this.template.organizationName });
          this.organizationList.sort(SortArrays.compareValues('name'));
          // this.filterLocations();
          this.filterAssets();
        });
    }


  }


  onParentOrgChange(event) {
    this.template.parentAssetId = null;
    this.template.parentAssetName = null;
    this.filterAssets();
  }


  getAllAssets() {
    this.assetService.getAllAssets()
      .subscribe(response => {
        this.parentAssetsList = response;
        this.parentAssetsList.sort(SortArrays.compareValues('assetName'));
        this.filterAssets();
      })
  }

  filterAssets() {
    if (this.parentAssetsList && this.parentAssetsList.length > 0) {
      this.parentAssetListForDropDown = [];
      this.parentAssetsList.forEach(asset => {
        if (this.template.organizationId === asset.organizationId) {
          this.parentAssetListForDropDown.push(asset);
        }
      });
      if (this.parentAssetListForDropDown && this.parentAssetListForDropDown.length > 0) {
        this.parentAssetListForDropDown.sort(SortArrays.compareValues('assetName'));
      }
    }
    console.log('Filtered assets ', this.parentAssetListForDropDown)
  }

  onTemplateSubmit() {
    // this.asset.documentationUrl = 'ABDFE';
    console.log('templateForm INFO ', this.templateForm);

    if (this.template) {
      if (!this.template.logo) {
        this.template.logo = null;
      }
      if (!this.template.fileStore) {
        this.template.fileStore = null;
      }
    }
this.template.assetName = null;
    if (this.template && this.template.invalid) {
      this.toaster.onFailure('Please fill the form correctly.', 'Form is invalid!')
      console.log('If block ');
      Object.keys(this.templateForm.form.controls).forEach(element => {
        this.templateForm.form.controls[element].markAsDirty();
      });
    } else {
      // if (!this.acceptedTemplateChages) {
      //   this.asset.templateId = null;
      //   this.asset.templateName = null;
      // }
      if (this.templateId) {
        this.assetService.updateTemplate(this.template)
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
        this.assetService.createAssetTemplate(this.template)
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
  }

}
