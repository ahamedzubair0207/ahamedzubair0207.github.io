import { Component, OnInit, Input } from '@angular/core';
import { ColumnMode } from '../../../../../assets/projects/swimlane/ngx-datatable/src/public-api';
import { DbItem } from 'src/app/models/db-item';

@Component({
  selector: 'app-votm-data-table',
  templateUrl: './votm-data-table.component.html',
  styleUrls: ['./votm-data-table.component.scss']
})
export class VotmDataTableComponent implements OnInit {
  rows = [];
  loadingIndicator = true;
  reorderable = true;
  @Input() locked: boolean;
  @Input() data: DbItem;

  columns = [
    { prop: 'signalName', summaryFunc: () => null },
    { name: 'Data', summaryFunc: () => null  },
    { prop: 'sensorId', summaryFunc: () => null },
    { name: 'Signal', summaryFunc: () => null }
  ];

  ColumnMode = ColumnMode;

  constructor() {
    this.fetch(data => {
      this.rows = data;
      setTimeout(() => {
        this.loadingIndicator = false;
      }, 1500);
    });
  }

  ngOnInit() {
  }

  fetch(cb) {
    const req = new XMLHttpRequest();
    req.open('GET', `assets/data/company.json`);

    req.onload = () => {
      cb(JSON.parse(req.response));
    };

    req.send();
  }

  private summaryForGender(cells: string[]) {
    // const males = cells.filter(cell => cell === 'male').length;
    // const females = cells.filter(cell => cell === 'female').length;

    // return `males: ${males}, females: ${females}`;
  }


}
