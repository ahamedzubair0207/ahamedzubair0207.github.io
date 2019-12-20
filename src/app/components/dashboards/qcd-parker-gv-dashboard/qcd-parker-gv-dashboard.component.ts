import { Component, OnInit, Input } from '@angular/core';
import { DbTemplate } from './../../../models/db-template';
@Component({
  selector: 'app-qcd-parker-gv-dashboard',
  templateUrl: './qcd-parker-gv-dashboard.component.html',
  styleUrls: ['./qcd-parker-gv-dashboard.component.scss']
})
export class QcdParkerGvDashboardComponent implements OnInit {

  @Input() dbItem: any;
  @Input() locked: boolean;

  constructor() { }

  ngOnInit() {
  }

}
