import { Component, OnInit } from '@angular/core';

import { Select2OptionData } from 'ng2-select2';

@Component({
  selector: 'app-votm-cloud-alerts-create',
  templateUrl: './votm-cloud-alerts-create.component.html',
  styleUrls: ['./votm-cloud-alerts-create.component.scss']
})
export class VotmCloudAlertsCreateComponent implements OnInit {
  gatewayList: any;
  gatewayId: any;
  items: any;
  options: Select2Options;
  selectedGateways: string[] = [];
  constructor() { 
    this.gatewayList = [
      { id: 'e9004bb5-67cd-466a-9014-034808a4da4b', text: 'User 1' },
      { id: 'e9004bb5-67cd-466a-9014-034808a4da4b', text: 'User 2' },
      { id: 'e9004bb5-67cd-466a-9014-034808a4da4b', text: 'User 3' },
      { id: 'e9004bb5-67cd-466a-9014-034808a4da4b', text: 'User 4' },
      { id: 'e9004bb5-67cd-466a-9014-034808a4da4b', text: 'User 5' }
    ];
    this.items=[
      {
        name: "Asset 1",
        opened: true,
        node: [
          {
            name: "signal 1"
          },
          {
            name: "signal 2"
          },
          {
            name: "signal 3"
          }
        ]
      },
      {
        name: "Asset 2",
        opened: true,
        node: [
          {
            name: "signal 1"
          },
          {
            name: "signal 2"
          },
          {
            name: "signal 3"
          }
        ]
      },
      {
        name: "Asset 3",
        opened: true,
        node: [
          {
            name: "signal 1"
          },
          {
            name: "signal 2"
          },
          {
            name: "signal 3"
          }
        ]
      }
    ];
  }

  ngOnInit() {
  }

  onItemSelect(data: { value: string[] }) {
    this.gatewayId = (data && data.value) ? data.value[0] : null;
    console.log('location.gatewayId ', data.value);
  }

}
