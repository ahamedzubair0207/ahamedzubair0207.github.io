import { Component, OnInit, Input, ViewChild, ComponentFactoryResolver, SimpleChanges, SimpleChange } from '@angular/core';
import { DbItem } from 'src/app/models/db-item';
import { DbTemplate } from 'src/app/models/db-template';
import { DashboardDirective } from '../dashboards/dashboard.directive';

@Component({
  selector: 'app-dashboardhost',
  templateUrl: './dashboardhost.component.html',
  styleUrls: ['./dashboardhost.component.scss']
})
export class DashboardhostComponent implements OnInit {

  @Input() dbItem: DbItem;

  @ViewChild(DashboardDirective, { static: true }) dashboardHost: DashboardDirective;
componentRef;
  constructor(private cFResolver: ComponentFactoryResolver) { }

  ngOnInit() {
    const componentFactory = this.cFResolver.resolveComponentFactory(this.dbItem.component);
    const viewContainerRef = this.dashboardHost.viewContainerRef;
    viewContainerRef.clear();

    this.componentRef = viewContainerRef.createComponent(componentFactory);
    (<DbTemplate>this.componentRef.instance).dbItem = this.dbItem;
  }

  
  ngOnChanges(changes: SimpleChanges) {
    const locked: SimpleChange = changes.locked;
    // console.log('prev value: ', locked.previousValue);
    // console.log('got name: ', locked.currentValue);
    if (this.componentRef) {
      // (<DbTemplate>this.componentRef.instance).locked = this.locked;
    }
  }

}
