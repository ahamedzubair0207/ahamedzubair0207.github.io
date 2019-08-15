import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VotmCloudViewsHomeComponent } from './components/views/votm-cloud-views-home/votm-cloud-views-home.component';
import { VotmCloudAlertsHomeComponent } from './components/alerts/votm-cloud-alerts-home/votm-cloud-alerts-home.component';
import { VotmCloudAlertsCreateComponent } from './components/alerts/votm-cloud-alerts-create/votm-cloud-alerts-create.component';
import { VotmCloudPreferencesComponent } from './components/shared/votm-cloud-preferences/votm-cloud-preferences.component';
import { VotmCloudOrganizationsHomeComponent } from './components/organizations/votm-cloud-organizations-home/votm-cloud-organizations-home.component';
import { VotmCloudOrganizationsCreateComponent } from './components/organizations/votm-cloud-organizations-create/votm-cloud-organizations-create.component';
import { VotmCloudLocationsHomeComponent } from './components/locations/votm-cloud-locations-home/votm-cloud-locations-home.component';
import { VotmCloudLocationsCreateComponent } from './components/locations/votm-cloud-locations-create/votm-cloud-locations-create.component';
import { VotmCloudAssetsHomeComponent } from './components/assets/votm-cloud-assets-home/votm-cloud-assets-home.component';
import { VotmCloudAssetsCreateComponent } from './components/assets/votm-cloud-assets-create/votm-cloud-assets-create.component';
import { VotmCloudSensorsHomeComponent } from './components/sensors/votm-cloud-sensors-home/votm-cloud-sensors-home.component';
import { VotmCloudGatewaysHomeComponent } from './components/gateways/votm-cloud-gateways-home/votm-cloud-gateways-home.component';
import { VotmCloudAdminPanelComponent } from './components/admin/votm-cloud-admin-panel/votm-cloud-admin-panel.component';
import { VotmCloudSuperAdminComponent } from './components/super/votm-cloud-super-admin/votm-cloud-super-admin.component';
import { VotmCloudLoginComponent } from './components/shared/votm-cloud-login/votm-cloud-login.component';
import { VotmCloudSensorsDetailsComponent } from './components/sensors/votm-cloud-sensors-details/votm-cloud-sensors-details.component';

const routes: Routes = [
  { path: 'fav', component: VotmCloudViewsHomeComponent },
  { path: 'view/home', component: VotmCloudViewsHomeComponent },
  { path: 'alerts/home', component: VotmCloudAlertsHomeComponent },
  { path: 'alerts/create', component: VotmCloudAlertsCreateComponent },
  { path: 'preferences', component: VotmCloudPreferencesComponent },
  { path: 'org/home/:orgId/:orgName', component: VotmCloudOrganizationsHomeComponent },
  { path: 'org/create/:curOrgId/:curOrgName', component: VotmCloudOrganizationsCreateComponent, data:{type:'Create'} },
  { path: 'org/view/:curOrgId/:curOrgName/:orgId', component: VotmCloudOrganizationsCreateComponent, data:{type:'View'} },
  { path: 'org/edit/:curOrgId/:curOrgName/:orgId', component: VotmCloudOrganizationsCreateComponent, data:{type:'Edit'} },
  { path: 'loc/home/:locId/:locName', component: VotmCloudLocationsHomeComponent },
  { path: 'loc/create/:parentLocId/:parentLocName/:curOrgId/:curOrgName', component: VotmCloudLocationsCreateComponent, data:{type:'Create'} },
  { path: 'loc/view/:parentLocId/:parentLocName/:curOrgId/:curOrgName/:locId', component: VotmCloudLocationsCreateComponent, data:{type:'View'} },
  { path: 'loc/edit/:parentLocId/:parentLocName/:curOrgId/:curOrgName/:locId', component: VotmCloudLocationsCreateComponent, data:{type:'Edit'} },
  { path: 'asset/home/:assetId', component: VotmCloudAssetsHomeComponent },
  { path: 'asset/create', component: VotmCloudAssetsCreateComponent },
  { path: 'sensor/home', component: VotmCloudSensorsHomeComponent },
  { path: 'sensor/detail', component: VotmCloudSensorsDetailsComponent},
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
