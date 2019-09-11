import { Component, OnInit, Input } from '@angular/core';
import { AssetsService } from 'src/app/services/assets/assets.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-votm-cloud-asset-template-list',
  templateUrl: './votm-cloud-asset-template-list.component.html',
  styleUrls: ['./votm-cloud-asset-template-list.component.scss']
})
export class VotmCloudAssetTemplateListComponent implements OnInit {

  @Input() templateList: any[];

  constructor(private router: Router) { }

  ngOnInit() {
  }

  onEditViewClick(template, action) {
    this.router.navigate([`template/${action}/${template.templateId}`]);
  }

}
