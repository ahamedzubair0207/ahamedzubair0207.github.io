import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap, Params } from '@angular/router';
import { AssetsService } from '../../../services/assets/assets.service';
import { BreadcrumbsService } from './../../../services/breadcrumbs/breadcrumbs.service';
import { __core_private_testing_placeholder__ } from '@angular/core/testing';
import { Router } from '@angular/router';
import { VotmCloudConfimDialogComponent } from '../../shared/votm-cloud-confim-dialog/votm-cloud-confim-dialog.component';
import { Toaster } from '../../shared/votm-cloud-toaster/votm-cloud-toaster';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Asset } from 'src/app/models/asset.model';
import { TreeNode } from 'primeng/api';

@Component({
  selector: 'app-votm-cloud-assets-home',
  templateUrl: './votm-cloud-assets-home.component.html',
  styleUrls: ['./votm-cloud-assets-home.component.scss']
})
export class VotmCloudAssetsHomeComponent implements OnInit {

  assetsList: Array<TreeNode> = [];
  curOrgId: string;
  curOrgName: string;
  assetToDelete: string;
  toaster: Toaster = new Toaster(this.toastr);

  @ViewChild('confirmBox', null) confirmBox: VotmCloudConfimDialogComponent;
  parentOrgId: any;
  parentOrgName: string;
  assetId: string;
  assetName: string;
  assetNameToDelete: any;
  message: any;
  supscriptions: any;
  subscriptions: Subscription[] = [];
  templateList: any[] = [];
  locationId: any;


  constructor(
    private assetService: AssetsService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router,
    private breadcrumbs: BreadcrumbsService) { }

  ngOnInit() {
    this.subscriptions.push(this.route.params.subscribe(
      (params: Params) => {
        this.parentOrgId = params.orgId;
        this.parentOrgName = params.orgName;
        this.locationId = params.locId;
        if (!this.locationId) {
          this.fetchAllAssetsTree();
        } else {
          this.fetchAssetsTreeById();
        }
      }));
  }

  onCreateAsset() {
    console.log('AHAMED CLICKED ', this.parentOrgName, this.parentOrgId);
    this.router.navigate([`asset/create/${this.parentOrgId}/${this.parentOrgName}`]);
  }


  openConfirmDialog(delAssetId, name) {
    this.assetToDelete = delAssetId;
    this.message = `Do you want to delete the "${name}" Asset?`;
    this.confirmBox.open();
    this.assetNameToDelete = name;
  }

  deleteAssetById(event) {
    console.log('event on close ', event);
    if (event) {
      this.assetService.deleteAsset(this.assetToDelete)
        .subscribe(response => {
          this.toaster.onSuccess(`You have deleted ${this.assetNameToDelete} successfully.`, 'Delete Success!');
          this.assetNameToDelete = '';
          this.fetchAllAssetsTree();

        }, error => {
          this.toaster.onFailure('Something went wrong on server. Please try after sometiime.', 'Delete Fail!');
          this.assetNameToDelete = '';
        });
    }
    this.assetToDelete = '';

  }

  getIntoContext(newAsset) {
    this.breadcrumbs.addCrumb(newAsset);
    // breadcrum into context
    // [routerLink]="['/org/home', item.id, item.name]"
  }

  fetchAssetsTreeById() {
    this.subscriptions.push(this.assetService.getAssetTreeByLocId(this.locationId)
      .subscribe(response => {
        this.assetsList =[];
        if (response && response.length > 0) {
          this.assetsList = this.fillAssetData(response);
        }
      }));
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  fetchAllAssetsTree() {
    this.subscriptions.push(this.assetService.getAssetTreeByOrgId(this.parentOrgId)
      .subscribe(response => {
        this.assetsList =[];
        if (response && response.length > 0) {
          this.assetsList = this.fillAssetData(response);
        }
        // this.assetsList = response;
      }));
  }

  fillAssetData(assets: any[]) {
    let assetList: TreeNode[] = [];
    assets.forEach(asset => {
      let tempAsset: TreeNode = { data: asset };
      tempAsset.children = [];
      if (asset.node && asset.node.length > 0) {
        tempAsset.children = this.fillAssetData(asset.node);
      } else {
        tempAsset.children = [];
      }
      assetList.push(tempAsset);
    });
    return assetList;
  }

  addNum(a: number, b: number): number {
    console.log(a + b);
    let c = a + b;
    return c;
  }

  onListClick(asset: any) {
    console.log('onListClick ', asset);
    this.router.navigate([`asset/home/${asset.parentOrganizationId}/${asset.parentOrganizationName}/${asset.id}`]);
  }

  onEditViewClick(asset, action) {
    console.log('asset ', asset);
    if (asset.parentId) {
      this.router.navigate([`asset/${action}/${asset.parentOrganizationId}/${asset.parentOrganizationName}/${asset.parentLocationId}/${asset.parentLocationName}/${asset.parentId}/${asset.parentName}/${asset.id}`]);
    } else {
      if (asset.parentLocationId) {
        this.router.navigate([`asset/${action}/${asset.parentOrganizationId}/${asset.parentOrganizationName}/${asset.parentLocationId}/${asset.parentLocationName}/${asset.id}`]);
      } else {
        this.router.navigate([`asset/${action}/${asset.parentOrganizationId}/${asset.parentOrganizationName}/${asset.id}`]);
      }
    }

  }

  onTemplateTabClick() {
    if (!this.templateList || this.templateList.length === 0) {
      this.assetService.getAllTemplates()
        .subscribe(response => {
          console.log('response of templates ', response);
          this.templateList = response;
        });
    }
  }
}
