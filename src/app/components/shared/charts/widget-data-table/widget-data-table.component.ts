import { Component, Input, OnInit } from '@angular/core';
import { DbItem } from 'src/assets/dashboards/db-item';

@Component({
  selector: 'widget-data-table',
  templateUrl: './widget-data-table.component.html',
  styleUrls: ['./widget-data-table.component.scss']
})
export class WidgetDataTableComponent implements OnInit {
  @Input() data: DbItem;
  @Input() id: string;

  private wId: string = '';

  constructor() { }

  ngOnInit() {
    this.wId = this.data.id + "-" + this.id;
  }

}
