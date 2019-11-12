import { Injectable } from '@angular/core';

import { DbTplItem } from '../../models/db-tpl-item';
import { BasicDashboardComponent } from '../../components/dashboards/basic-dashboard/basic-dashboard.component';
import { ScoutStyleDashboardComponent } from '../../components/dashboards/scout-style-dashboard/scout-style-dashboard.component';
import { ParkerQcdDashboardComponent } from '../../components/dashboards/parker-qcd-dashboard/parker-qcd-dashboard.component';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor() { }

  getDashboardTemplates() {
    return [
      new DbTplItem(ScoutStyleDashboardComponent, 'Scout Style Dashboard'),
      new DbTplItem(ParkerQcdDashboardComponent, 'Parker QCD Dashboard'),
      new DbTplItem(BasicDashboardComponent, 'Basic Style Dashboard')
    ];
  }

}
