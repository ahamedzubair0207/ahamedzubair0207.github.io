import { Component, Input, OnInit } from '@angular/core';
import { DbItem } from 'src/assets/dashboards/db-item';

@Component({
  selector: 'widget-image-overlay',
  templateUrl: './widget-image-overlay.component.html',
  styleUrls: ['./widget-image-overlay.component.scss']
})
export class WidgetImageOverlayComponent implements OnInit {
  @Input() data: DbItem;
  @Input() id: string;

  private wId: string = '';

  constructor() { }

  ngOnInit() {
    this.wId = this.data.id + "-" + this.id;
  }

}
