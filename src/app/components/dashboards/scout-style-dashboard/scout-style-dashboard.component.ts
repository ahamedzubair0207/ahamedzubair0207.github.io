import { Component, OnInit, Input } from '@angular/core';
import { DbTemplate } from 'src/app/models/db-template';

@Component({
  selector: 'app-scout-style-dashboard',
  templateUrl: './scout-style-dashboard.component.html',
  styleUrls: ['./scout-style-dashboard.component.scss']
})
export class ScoutStyleDashboardComponent implements DbTemplate {

  @Input() dbItem: any;
  @Input() locked: boolean;

  constructor() { }

  ngOnInit() {
  }

}
