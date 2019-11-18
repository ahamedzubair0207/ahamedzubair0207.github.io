import { Component, OnInit, Input } from '@angular/core';
import { ColumnMode } from '../../../../../assets/projects/swimlane/ngx-datatable/src/public-api';
import { ToastrService } from 'ngx-toastr';
import { Toaster } from '../../votm-cloud-toaster/votm-cloud-toaster';
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
  isDataTableConfigured: boolean;
  customizeDataTable: any;
  toaster: Toaster = new Toaster(this.toastr);
  @Input() locked: boolean;
  @Input() data: DbItem;

  columns = [
    { prop: 'signalName', summaryFunc: () => null },
    { name: 'Data', summaryFunc: () => null  },
    { prop: 'sensorId', summaryFunc: () => null },
    { name: 'Signal', summaryFunc: () => null }
  ];

  ColumnMode = ColumnMode;

  constructor(private toastr: ToastrService) { 
    this.fetch(data => {
      this.rows = data;
      setTimeout(() => {
        this.loadingIndicator = false;
      }, 1500);
    });
  }

  ngOnInit() {
    this.isDataTableConfigured = false;

  }

  fetch(cb) {
    const req = new XMLHttpRequest();
    req.open('GET', `assets/data/company_tree.json`);

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

  onClickOfCustomizeDataTableModalClose(){
    this.customizeDataTable.style.display = 'none';
  }

  saveDataTableConfiguration(){
    this.customizeDataTable.style.display = 'none';
    this.toaster.onSuccess('Data Table Configured Successfully', 'Success');
  }

  onClickOfCustomizeDataTable(){
    // Open Chart configuration modal popup
    const modal = document.getElementById('configure-data-table-modal');
    modal.style.display = 'block';
    this.customizeDataTable = document.getElementById('configure-data-table-modal');
    window.onclick = (event) => {
      if (event.target === modal) {
        modal.style.display = 'none';
      }
    };
  }

  getDataTableConfiguration() {

    // Call service to get configured chart data & to verify chart is configured or not
    // this.widgetService.getColumnChartConfiguration().subscribe(
    //   response => {
    //     this.isColumnChartConfigured = true;
    //   }, error => {
    //     this.isColumnChartConfigured = false;
    //   }
    // );
    this.isDataTableConfigured = true;

  }


}
