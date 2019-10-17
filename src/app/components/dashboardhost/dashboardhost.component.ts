import { Component, OnInit, Input, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { DashboardDirective } from 'src/app/dashboard.directive';
import { DbItem } from 'src/app/models/db-item';
import { DbTemplate } from 'src/app/models/db-template';

@Component({
  selector: 'app-dashboardhost',
  templateUrl: './dashboardhost.component.html',
  styleUrls: ['./dashboardhost.component.scss']
})
export class DashboardhostComponent implements OnInit {

  @Input() dbItem: DbItem;

  @ViewChild(DashboardDirective, { static: true }) dashboardHost: DashboardDirective;

  constructor(private cFResolver: ComponentFactoryResolver) { }

  ngOnInit() {
    const componentFactory = this.cFResolver.resolveComponentFactory(this.dbItem.component);

    const viewContainerRef = this.dashboardHost.viewContainerRef;
    viewContainerRef.clear();

    const componentRef = viewContainerRef.createComponent(componentFactory);
    (<DbTemplate>componentRef.instance).dbItem = this.dbItem;
  }

}
