import { Injectable } from '@angular/core';

import { DbTplItem } from '../../models/db-tpl-item';
import { BasicDashboardComponent } from '../../components/dashboards/basic-dashboard/basic-dashboard.component';
import { ScoutStyleDashboardComponent } from '../../components/dashboards/scout-style-dashboard/scout-style-dashboard.component';
import { ParkerQcdDashboardComponent } from '../../components/dashboards/parker-qcd-dashboard/parker-qcd-dashboard.component';
import { CustomHttp } from '../custom_http/custom_http.service';
import { AppConstants } from 'src/app/helpers/app.constants';
import { map } from 'rxjs/operators';
import { DashBoard } from 'src/app/models/dashboard.model';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: CustomHttp) { }

  getDashboardTemplates() {
    return [
      new DbTplItem(ScoutStyleDashboardComponent, 'Scout Style Dashboard'),
      new DbTplItem(ParkerQcdDashboardComponent, 'Parker QCD Dashboard'),
      new DbTplItem(BasicDashboardComponent, 'Basic Style Dashboard')
    ];
  }

  saveDashboard(body: DashBoard) {
    return this.http.post(AppConstants.CREATE_DASHBOARD, body)
      .pipe(
        map(response => response)
      );
  }

  saveDashboardWidget(body: any) {
    return this.http.post(AppConstants.CREATE_DASHBOARD_WIDGET, body)
      .pipe(
        map(response => response)
      );
  }

  updateDashboardWidget(body: any) {
    return this.http.patch(`${AppConstants.UPDATE_DASHBOARD_WIDGET}/${body.dashboardWidgetId}`, body)
      .pipe(
        map(response => response)
      );
  }


  editDashboard(body: DashBoard) {
    return this.http.patch(`${AppConstants.EDIT_DASHBOARD}/${body.dashboardId}`, body)
      .pipe(
        map(response => response)
      );
  }

  getAllDashboards(parentId: string, parentType) {
    return this.http.get(`${AppConstants.GET_ALL_DASHBOARD}/${parentType}/type/${parentId}`)
      .pipe(
        map(response => response)
      );
  }
  getDashboardWidgets(dashboardId: string) {
    return this.http.get(`${AppConstants.GET_DASHBOARD_WIDGETS}/${dashboardId}`)
      .pipe(
        map(response => response)
      );
  }




  deleteDashboard(dashboardId: string) {
    return this.http.delete(AppConstants.DEL_DASHBOARD + '/' + dashboardId, dashboardId)
      .pipe(
        map(response => response)
      );
  }

  getCustomImageAssetEntity(assetId) {
    return this.http.get('Signals/' + assetId + AppConstants.GET_CUSTOM_IMAGE_ASSET_ENTITY)
      .pipe(
        map(response => response)
      );
  }


}
