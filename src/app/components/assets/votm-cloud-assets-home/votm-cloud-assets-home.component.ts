import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap } from "@angular/router";
import { AssetsService } from '../../../services/assets/assets.service';
import { BreadcrumbsService } from './../../../services/breadcrumbs/breadcrumbs.service';
import { __core_private_testing_placeholder__ } from '@angular/core/testing';
import { Router } from '@angular/router';
import { VotmCloudConfimDialogComponent } from '../../shared/votm-cloud-confim-dialog/votm-cloud-confim-dialog.component';
import { Toaster } from '../../shared/votm-cloud-toaster/votm-cloud-toaster';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-votm-cloud-assets-home',
  templateUrl: './votm-cloud-assets-home.component.html',
  styleUrls: ['./votm-cloud-assets-home.component.scss']
})
export class VotmCloudAssetsHomeComponent implements OnInit {

  assetsList = [];
  curOrgId: string;
  curOrgName: string;
  assetToDelete: string;
  toaster: Toaster = new Toaster(this.toastr);

  @ViewChild('confirmBox', null) confirmBox: VotmCloudConfimDialogComponent;
  parentOrgId: any;
  parentOrgName: string;
  assetId: string;
  assetName: string;
  assetNameToDelete : any;
  message: any;


  constructor(private assetService: AssetsService, private route: ActivatedRoute, private toastr: ToastrService, private router: Router, private breadcrumbs : BreadcrumbsService) { }

  ngOnInit() {
    this.parentOrgId = this.curOrgId = this.route.snapshot.paramMap.get("orgId");
    this.parentOrgName = this.curOrgId = this.route.snapshot.paramMap.get("orgName");
    this.assetId = this.curOrgId = this.route.snapshot.paramMap.get("assetId");
    this.assetName = this.curOrgId = this.route.snapshot.paramMap.get("assetName");
    if (!this.assetId) {
      this.fetchAllAssetsTree();
    } else {
      this.fetchAssetsTreeById();
    }
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.curOrgId = params.get("orgId");
      this.curOrgName = params.get("orgName");
      this.fetchAssetList();
    });

  }


  openConfirmDialog(delAssetId, name) {
    this.assetToDelete = delAssetId;
    this.message = `Do you want to delete the "${name}" Asset?`;
    this.confirmBox.open();
    this.assetNameToDelete = name;
  }

  deleteAssetById(event, delAssetId) {
    console.log('event on close ', event);
    if (event) {
      this.assetService.deleteAsset(this.assetToDelete)
        .subscribe(response => {
          this.toaster.onSuccess(`You have deleted ${this.assetNameToDelete} successfully.`, 'Delete Success!');
          this.assetNameToDelete = '';
          this.fetchAssetList();

        }, error => {
          this.toaster.onFailure('Something went wrong on server. Please try after sometiime.', 'Delete Fail!');
          this.assetNameToDelete = '';
        });
    }
    this.assetToDelete = '';

  }

  getIntoContext(newAsset){
    this.breadcrumbs.addCrumb(newAsset);
    // breadcrum into context
    // [routerLink]="['/org/home', item.id, item.name]"
  }

  fetchAssetsTreeById() {
    this.assetService.getAssetTreeById(this.assetId)
      .subscribe(response => {
        this.assetsList = response
        // .map(
        //   x => ({
        //     ...x,
        //     opened: true
        //   })
        // );
      });
  }
  fetchAllAssetsTree() {
    this.assetService.getAssetTree()
      .subscribe(response => {
        this.assetsList = response
        // .map(
        //   x => ({
        //     ...x,
        //     opened: true
        //   })
        // );
      });
  }

  fetchAssetList() {
    this.assetService.getAssetTree().subscribe(
      response => {
        this.assetsList = response
        // .map(
        //   x => ({
        //     ...x,
        //     opened: true
        //   })
        // );
      }
    );
  }

  addNum(a: number, b: number): number {
    console.log(a + b);
    let c = a + b;
    return c;
  }

}
