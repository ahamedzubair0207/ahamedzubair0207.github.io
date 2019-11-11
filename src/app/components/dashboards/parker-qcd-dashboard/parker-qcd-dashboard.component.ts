import { Component, OnInit, Input } from '@angular/core';
import { DbTemplate } from './../../../models/db-template';

@Component({
  selector: 'app-parker-qcd-dashboard',
  templateUrl: './parker-qcd-dashboard.component.html',
  styleUrls: ['./parker-qcd-dashboard.component.scss']
})
export class ParkerQcdDashboardComponent implements DbTemplate {

  @Input() dbItem: any;

  constructor() { }

  ngOnInit() {
  }

}
