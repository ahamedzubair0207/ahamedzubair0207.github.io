import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VotmCloudViewsHomeComponent } from './components/views/votm-cloud-views-home/votm-cloud-views-home.component';
import { VotmCloudAlertsHomeComponent } from './components/alerts/votm-cloud-alerts-home/votm-cloud-alerts-home.component';
import { VotmCloudPreferencesComponent } from './components/shared/votm-cloud-preferences/votm-cloud-preferences.component';
import { VotmCloudOrganizationsHomeComponent } from './components/organizations/votm-cloud-organizations-home/votm-cloud-organizations-home.component';
import { VotmCloudOrganizationsCreateComponent } from './components/organizations/votm-cloud-organizations-create/votm-cloud-organizations-create.component';
import { VotmCloudLocationsHomeComponent } from './components/locations/votm-cloud-locations-home/votm-cloud-locations-home.component';
import { VotmCloudLocationsCreateComponent } from './components/locations/votm-cloud-locations-create/votm-cloud-locations-create.component';
import { VotmCloudAssetsHomeComponent } from './components/assets/votm-cloud-assets-home/votm-cloud-assets-home.component';
import { VotmCloudSensorsHomeComponent } from './components/sensors/votm-cloud-sensors-home/votm-cloud-sensors-home.component';
import { VotmCloudGatewaysHomeComponent } from './components/gateways/votm-cloud-gateways-home/votm-cloud-gateways-home.component';
import { VotmCloudAdminPanelComponent } from './components/admin/votm-cloud-admin-panel/votm-cloud-admin-panel.component';
import { VotmCloudSuperAdminComponent } from './components/super/votm-cloud-super-admin/votm-cloud-super-admin.component';
import { VotmCloudLoginComponent } from './components/shared/votm-cloud-login/votm-cloud-login.component';

const routes: Routes = [
  { path: 'fav', component: VotmCloudViewsHomeComponent },
  { path: 'view/home', component: VotmCloudViewsHomeComponent },
  { path: 'alerts/home', component: VotmCloudAlertsHomeComponent },
  { path: 'preferences', component: VotmCloudPreferencesComponent },
  { path: 'org/home/:orgId/:orgName', component: VotmCloudOrganizationsHomeComponent },
  { path: 'org/create/:curOrgId/:curOrgName', component: VotmCloudOrganizationsCreateComponent, data:{type:'Create'}  },
  { path: 'org/view/:curOrgId/:curOrgName/:orgId', component: VotmCloudOrganizationsCreateComponent, data:{type:'View'}  },
  { path: 'org/edit/:curOrgId/:curOrgName/:orgId', component: VotmCloudOrganizationsCreateComponent, data:{type:'Edit'} },
  { path: 'loc/home/:orgId/:orgName', component: VotmCloudLocationsHomeComponent },
  { path: 'loc/create/:curOrgId/:curOrgName', component: VotmCloudLocationsCreateComponent },
  { path: 'asset/home', component: VotmCloudAssetsHomeComponent },
  { path: 'sensor/home', component: VotmCloudSensorsHomeComponent },
  { path: 'gateway/home', component: VotmCloudGatewaysHomeComponent },
  { path: 'admin', component: VotmCloudAdminPanelComponent },
  { path: 'super', component: VotmCloudSuperAdminComponent },
  { path: 'login', component: VotmCloudLoginComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
