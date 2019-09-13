import { Component, OnInit } from '@angular/core';
import { DatePipe, Location as RouterLocation } from '@angular/common';
import { ActivatedRoute, Params } from '@angular/router';
import { AssetsService } from 'src/app/services/assets/assets.service';

@Component({
  selector: 'app-votm-cloud-asset-template-details',
  templateUrl: './votm-cloud-asset-template-details.component.html',
  styleUrls: ['./votm-cloud-asset-template-details.component.scss']
})
export class VotmCloudAssetTemplateDetailsComponent implements OnInit {
  templateId: string;
  template: any = {};
  pageType: string;

  constructor(private routerLocation: RouterLocation, private assetService: AssetsService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.templateId = params.templateId;
        if (this.templateId) {
          this.fetchTemplateById();
        }
      });
    this.pageType = this.route.snapshot.data['type'];
  }

  onCancelClick(event) {
    this.routerLocation.back();
  }

  fetchTemplateById() {
    this.assetService.getTemplateById(this.templateId)
      .subscribe(response => {
        console.log('Response from Template ', response);
        if (response && response.length > 0) {
          this.template = response[0];
        }
      });
  }

}
