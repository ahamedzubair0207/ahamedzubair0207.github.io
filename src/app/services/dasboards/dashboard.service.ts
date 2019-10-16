import { Injectable } from '@angular/core';

import { DbTplItem } from '../../models/db-tpl-item';
import { BasicDashboardComponent } from '../../components/dashboards/basic-dashboard/basic-dashboard.component';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor() { }

  getDashboardTemplates() {
    return [
      new DbTplItem(BasicDashboardComponent, 'Basic Style Dashboard')
    ];
  }

}
