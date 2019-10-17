import { Component, OnInit, Input } from '@angular/core';
import { DbTemplate } from './../../../models/db-template';

@Component({
  selector: 'app-basic-dashboard',
  templateUrl: './basic-dashboard.component.html',
  styleUrls: ['./basic-dashboard.component.scss']
})
export class BasicDashboardComponent implements DbTemplate {

  @Input() dbItem: any;

  constructor() { }

  ngOnInit() {
  }

}
