import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VotmCloudViewsHomeComponent } from './votm-cloud-views-home/votm-cloud-views-home.component';
import { VotmCloudAlertsHomeComponent } from './votm-cloud-alerts-home/votm-cloud-alerts-home.component';
import { VotmCloudPreferencesComponent } from './votm-cloud-preferences/votm-cloud-preferences.component';
import { VotmCloudOrganizationsHomeComponent } from './votm-cloud-organizations-home/votm-cloud-organizations-home.component';
import { VotmCloudSitesHomeComponent } from './votm-cloud-sites-home/votm-cloud-sites-home.component';
import { VotmCloudAssetsHomeComponent } from './votm-cloud-assets-home/votm-cloud-assets-home.component';
import { VotmCloudSensorsHomeComponent } from './votm-cloud-sensors-home/votm-cloud-sensors-home.component';
import { VotmCloudGatewaysHomeComponent } from './votm-cloud-gateways-home/votm-cloud-gateways-home.component';
import { VotmCloudAdminPanelComponent } from './votm-cloud-admin-panel/votm-cloud-admin-panel.component';
import { VotmCloudSuperAdminComponent } from './votm-cloud-super-admin/votm-cloud-super-admin.component';

const routes: Routes = [
  { path: 'view/home', component: VotmCloudViewsHomeComponent },
  { path: 'alerts/home', component: VotmCloudAlertsHomeComponent },
  { path: 'preferences', component: VotmCloudPreferencesComponent },
  { path: 'organization/home', component: VotmCloudOrganizationsHomeComponent },
  { path: 'site/home', component: VotmCloudSitesHomeComponent },
  { path: 'asset/home', component: VotmCloudAssetsHomeComponent },
  { path: 'sensor/home', component: VotmCloudSensorsHomeComponent },
  { path: 'gateway/home', component: VotmCloudGatewaysHomeComponent },
  { path: 'admin', component: VotmCloudAdminPanelComponent },
  { path: 'super', component: VotmCloudSuperAdminComponent },
  { path: '', redirectTo: '/view/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
