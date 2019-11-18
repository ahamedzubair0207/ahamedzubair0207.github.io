import { Component, OnInit, Input, ViewChild, ComponentFactoryResolver, SimpleChanges, SimpleChange } from '@angular/core';
import { DbTemplate } from 'src/app/models/db-template';
import { DashboardDirective } from '../dashboards/dashboard.directive';
import { DashBoard } from 'src/app/models/dashboard.model';
import { DashboardService } from 'src/app/services/dasboards/dashboard.service';

@Component({
  selector: 'app-dashboardhost',
  templateUrl: './dashboardhost.component.html',
  styleUrls: ['./dashboardhost.component.scss']
})
export class DashboardhostComponent implements OnInit {

  @Input() dbItem: DashBoard;
  @Input() locked: boolean;
  templates: any;

  @ViewChild(DashboardDirective, { static: true }) dashboardHost: DashboardDirective;
  componentRef;
  constructor(private cFResolver: ComponentFactoryResolver, private dbService: DashboardService) { }

  ngOnInit() {
    this.templates = this.dbService.getDashboardTemplates();
    let dbTPLItem = this.templates.find(({ name }) => name === this.dbItem.templateName);
    if (dbTPLItem) {
      console.log('this.dbItem ', dbTPLItem)
      const componentFactory = this.cFResolver.resolveComponentFactory(dbTPLItem.component);
      const viewContainerRef = this.dashboardHost.viewContainerRef;
      viewContainerRef.clear();

      this.componentRef = viewContainerRef.createComponent(componentFactory);
      (<DbTemplate>this.componentRef.instance).dbItem = this.dbItem;
      (<DbTemplate>this.componentRef.instance).locked = this.locked;
    }
  }


  ngOnChanges(changes: SimpleChanges) {
    const locked: SimpleChange = changes.locked;
    // console.log('prev value: ', locked.previousValue);
    // console.log('got name: ', locked.currentValue);
    if (this.componentRef) {
      (<DbTemplate>this.componentRef.instance).locked = this.locked;
    }
  }

}
