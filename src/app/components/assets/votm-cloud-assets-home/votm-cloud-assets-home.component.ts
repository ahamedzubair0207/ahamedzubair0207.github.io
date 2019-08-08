import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap } from "@angular/router";
import { AssetsService} from '../../../services/assets/assets.service';
import { VotmCloudConfimDialogComponent } from '../../shared/votm-cloud-confim-dialog/votm-cloud-confim-dialog.component';

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
  
  constructor(private assetService: AssetsService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params : ParamMap)=> {
      this.curOrgId = params.get("assetId");
      this.fetchOrgList();
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
          this.fetchOrgList();
        });
    }
    this.orgToDelete = '';
  }

  fetchOrgList(){
    this.assetService.getAssetTree(this.curOrgId).subscribe(
      response => {
        this.assetsList = response.map(
          x => ({
          ...x,
          opened:true
          })
        );
      }
    );
  }

}
