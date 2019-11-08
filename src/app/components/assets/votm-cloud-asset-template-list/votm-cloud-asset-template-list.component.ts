import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { AssetsService } from 'src/app/services/assets/assets.service';
import { BreadcrumbsService } from './../../../services/breadcrumbs/breadcrumbs.service';
import { ActivatedRoute, ParamMap, Params } from "@angular/router";
import { ToastrService } from 'ngx-toastr';
import { Toaster } from '../../shared/votm-cloud-toaster/votm-cloud-toaster';
import { VotmCloudConfimDialogComponent } from '../../shared/votm-cloud-confim-dialog/votm-cloud-confim-dialog.component';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-votm-cloud-asset-template-list',
  templateUrl: './votm-cloud-asset-template-list.component.html',
  styleUrls: ['./votm-cloud-asset-template-list.component.scss']
})
export class VotmCloudAssetTemplateListComponent implements OnInit {

  assetsList = [];
  curOrgId: string;
  curOrgName: string;
  assetToDelete: string;
  toaster: Toaster = new Toaster(this.toastr);

  @Input() templateList: any[];
  @ViewChild('confirmBox', null) confirmBox: VotmCloudConfimDialogComponent;
  parentOrgId: any;
  parentOrgName: string;
  assetId: string;
  assetName: string;
  templateName: string;
  assetNameToDelete: any;
  message: any;
  supscriptions: any;
  subscriptions: Subscription[] = [];

  constructor(
    private router: Router,
    private assetService: AssetsService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private breadcrumbs: BreadcrumbsService) { }

  ngOnInit() {
  }

  onEditViewClick(template, action) {
    this.router.navigate([`template/${action}/${template.templateId}`]);
  }

  openConfirmDialog(template) {
    this.assetToDelete = template.templateId;
    this.message = `Deleting this template will break all asset bindings. Are you sure you want to delete ${template.templateName} Template?`;
    this.confirmBox.open();
    this.assetNameToDelete = name;
  }

  deleteAssetById(event) {
    if (event) {
      this.assetService.deleteAsset(this.assetToDelete)
        .subscribe(response => {
          this.toaster.onSuccess(`You have deleted ${this.assetNameToDelete} successfully.`, 'Delete Success!');
          this.assetNameToDelete = '';
          this.getAllTemplate();
        }, error => {
          this.toaster.onFailure('Something went wrong on server. Please try after sometiime.', 'Delete Fail!');
          this.assetNameToDelete = '';
        });
    }
    this.assetToDelete = '';

  }

  getAllTemplate() {
    this.assetService.getAllTemplates()
      .subscribe(response => {
        this.templateList = response;
      });
  }

}
