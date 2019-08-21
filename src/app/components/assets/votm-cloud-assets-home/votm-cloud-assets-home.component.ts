import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap } from "@angular/router";
import { AssetsService } from '../../../services/assets/assets.service';
import { VotmCloudConfimDialogComponent } from '../../shared/votm-cloud-confim-dialog/votm-cloud-confim-dialog.component';
import { __core_private_testing_placeholder__ } from '@angular/core/testing';

@Component({
  selector: 'app-votm-cloud-assets-home',
  templateUrl: './votm-cloud-assets-home.component.html',
  styleUrls: ['./votm-cloud-assets-home.component.scss']
})
export class VotmCloudAssetsHomeComponent implements OnInit {

  assetsList = [];
  curOrgId: string;
  curOrgName: string;
  orgToDelete: string;

  @ViewChild('confirmBox', null) confirmBox: VotmCloudConfimDialogComponent;
  parentOrgId: any;
  parentOrgName: string;
  assetId: string;
  assetName: string;
 

  constructor(private assetService: AssetsService, private route: ActivatedRoute) { }

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

  
  }
  fetchAssetsTreeById() {
    this.assetService.getAssetTreeById(this.assetId)
      .subscribe(response => {
        this.assetsList = response;
      });
  }
  fetchAllAssetsTree() {
    this.assetService.getAssetTree()
      .subscribe(response => {
        this.assetsList = response;
      });
  }

  openConfirmDialog(delOrgId) {
    this.orgToDelete = delOrgId;
    this.confirmBox.open();
  }

  deleteAssetById(event, delOrgId) {
    console.log('event on close ', event);
    if (event) {
      this.assetService.deleteAsset(this.orgToDelete)
        .subscribe(response => {
          this.fetchAssetList();
        });
    }
    this.orgToDelete = '';
  }

  fetchAssetList() {
    this.assetService.getAssetTree().subscribe(
      response => {
        this.assetsList = response.map(
          x => ({
            ...x,
            opened: true
          })
        );
      }
    );
  }

  addNum(a:number, b: number): number{
    console.log(a+b);
    let c = a+b;
    return c;
  }

}
