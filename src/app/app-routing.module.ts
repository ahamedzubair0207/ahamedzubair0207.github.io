import {
  VotmCloudAdminNetworkManagementComponent
} from './components/admin/votm-cloud-admin-network-management/votm-cloud-admin-network-management.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VotmCloudViewsHomeComponent } from './components/views/votm-cloud-views-home/votm-cloud-views-home.component';
import { VotmCloudAlertsHomeComponent } from './components/alerts/votm-cloud-alerts-home/votm-cloud-alerts-home.component';
import { VotmCloudAlertsCreateComponent } from './components/alerts/votm-cloud-alerts-create/votm-cloud-alerts-create.component';
import { VotmCloudPreferencesComponent } from './components/shared/votm-cloud-preferences/votm-cloud-preferences.component';
import {
  VotmCloudOrganizationsHomeComponent
} from './components/organizations/votm-cloud-organizations-home/votm-cloud-organizations-home.component';
import {
  VotmCloudOrganizationsCreateComponent
} from './components/organizations/votm-cloud-organizations-create/votm-cloud-organizations-create.component';
import {
  VotmCloudLocationsHomeComponent
} from './components/locations/votm-cloud-locations-home/votm-cloud-locations-home.component';
import {
  VotmCloudLocationsCreateComponent
} from './components/locations/votm-cloud-locations-create/votm-cloud-locations-create.component';
import {
  VotmCloudLocationsSignalComponent
} from './components/locations/votm-cloud-locations-signal/votm-cloud-locations-signal.component';
import {
  VotmCloudAssetsHomeComponent
} from './components/assets/votm-cloud-assets-home/votm-cloud-assets-home.component';
import {
  VotmCloudAssetsCreateComponent
} from './components/assets/votm-cloud-assets-create/votm-cloud-assets-create.component';
import {
  VotomCloudAssetsSignalComponent
} from './components/assets/votm-cloud-assets-signal/votom-cloud-assets-signal.component';
import {
  VotmCloudAssetTemplateDetailsComponent
} from './components/assets/votm-cloud-asset-template-details/votm-cloud-asset-template-details.component';
import {
  VotmCloudAssetTemplateListComponent
} from './components/assets/votm-cloud-asset-template-list/votm-cloud-asset-template-list.component';
import {
  VotmCloudSensorsHomeComponent
} from './components/sensors/votm-cloud-sensors-home/votm-cloud-sensors-home.component';
import { VotmCloudGatewaysHomeComponent } from './components/gateways/votm-cloud-gateways-home/votm-cloud-gateways-home.component';
import { VotmCloudAdminPanelComponent } from './components/admin/votm-cloud-admin-panel/votm-cloud-admin-panel.component';
import { VotmCloudSuperAdminComponent } from './components/super/votm-cloud-super-admin/votm-cloud-super-admin.component';
import { VotmCloudLoginComponent } from './components/shared/votm-cloud-login/votm-cloud-login.component';
import { VotmCloudAdminGatewaysDetailsComponent } from './components/admin/admin-gateways/votm-cloud-admin-gateways-details/votm-cloud-admin-gateways-details.component';
import { VotmCloudSensorsDetailsComponent } from './components/sensors/votm-cloud-sensors-details/votm-cloud-sensors-details.component';
import {
  VotmCloudOrganizationDashboardComponent
} from './components/organizations/votm-cloud-organization-dashboard/votm-cloud-organization-dashboard.component';
import {
  VotmCloudAdminUserManagementComponent
} from './components/admin/votm-cloud-admin-user-management/votm-cloud-admin-user-management.component';

import {
  OKTA_CONFIG,
  OktaAuthGuard,
  OktaAuthModule,
  OktaCallbackComponent,
} from '@okta/okta-angular';
import { VotmCloudAdminSensorDetailsComponent } from './components/admin/admin-sensors/votm-cloud-admin-sensor-details/votm-cloud-admin-sensor-details.component';
import { AdminUserHomeComponent } from './components/admin/admin-user-home/admin-user-home.component';


const routes: Routes = [
  // {
  //   path: '',
  //   component: VotmCloudViewsHomeComponent,
  // },
 // {
   // path: '',
   // component: VotmCloudOrganizationsHomeComponent,
  //  canActivate: [ OktaAuthGuard ],
   // data: { type: 'Organization' }
 // },

  // {
  //   path: '',
  //   component: VotmCloudViewsHomeComponent,
  //   // canActivate: [ OktaAuthGuard ],

  // },

  {
    path: 'fav',
    component: VotmCloudViewsHomeComponent,
    // canActivate: [ OktaAuthGuard ],
  },

  // {
  //   // path: 'implicit/callback',
  //   // component: OktaCallbackComponent,
  // },
  {
    path: 'view/home',
    component: VotmCloudViewsHomeComponent,
    // canActivate: [ OktaAuthGuard ],
  },
  {
    path: 'org/dashboard',
    component: VotmCloudOrganizationDashboardComponent,
    // canActivate: [ OktaAuthGuard ],
  },
  // { path: 'alerts/home', component: VotmCloudAlertsHomeComponent },
  // { path: 'alerts/create', component: VotmCloudAlertsCreateComponent },
  // { path: 'alerts/create', component: VotmCloudAlertsCreateComponent },
  {
    path: 'preferences',
    component: VotmCloudPreferencesComponent,
    // canActivate: [ OktaAuthGuard ],
  },
  {
    path: 'org/home',
    component: VotmCloudOrganizationsHomeComponent,
    // canActivate: [ OktaAuthGuard ],
    data: { type: 'Organization' }
  },
  {
    path: 'org/create',
    component: VotmCloudOrganizationsCreateComponent,
    // canActivate: [ OktaAuthGuard ],
    data: { type: 'Create' }
  },
  {
    path: 'org/create-suborg',
    component: VotmCloudOrganizationsCreateComponent,
    // canActivate: [ OktaAuthGuard ],
    data: { type: 'Create', action:'suborganization' }
  },
  {
    path: 'org/view',
    component: VotmCloudOrganizationsCreateComponent,
    // canActivate: [ OktaAuthGuard ],
    data: { type: 'View' }
  },
  {
    path: 'org/edit',
    component: VotmCloudOrganizationsCreateComponent,
    // canActivate: [ OktaAuthGuard ],
    data: { type: 'Edit' }
  },
  // {
  //   path: 'org/view/:curOrgId/:curOrgName/:orgId/alertRule/create',
  //   component: VotmCloudAlertsCreateComponent,
  //   // canActivate: [ OktaAuthGuard ],
  //   data: { type: 'Create' }
  // },
  // {
  //   path: 'org/view/:curOrgId/:curOrgName/:orgId/alertRule/edit/:alertId',
  //   component: VotmCloudAlertsCreateComponent, data: { type: 'Edit' }
  // },
  // {
  //   path: 'org/view/:curOrgId/:curOrgName/:orgId/alertRule/view/:alertId',
  //   component: VotmCloudAlertsCreateComponent, data: { type: 'View' }
  // },
  // {
  //   path: 'org/edit/:curOrgId/:curOrgName/:orgId/alertRule/create',
  //   component: VotmCloudAlertsCreateComponent, data: { type: 'Create' }
  // },
  // {
  //   path: 'org/edit/:curOrgId/:curOrgName/:orgId/alertRule/edit/:alertId',
  //   component: VotmCloudAlertsCreateComponent, data: { type: 'Edit' }
  // },
  // {
  //   path: 'org/edit/:curOrgId/:curOrgName/:orgId/alertRule/view/:alertId',
  //   component: VotmCloudAlertsCreateComponent, data: { type: 'View' }
  // },
  {
    path: 'org/sensorDetails/view',
    component: VotmCloudAdminSensorDetailsComponent,
    data: { type: 'View' }
  },
  {
    path: 'org/sensorDetails/edit',
    component: VotmCloudAdminSensorDetailsComponent,
    data: { type: 'Edit' }
  },
  // { path: 'loc/home', component: VotmCloudLocationsHomeComponent },
  {
    path: 'loc/home',
    component: VotmCloudLocationsHomeComponent,
    data: { type: 'Location' }
  },
  {
    path: 'loc/home',
    component: VotmCloudLocationsHomeComponent
  },
  {
    path: 'loc/create',
    component: VotmCloudLocationsCreateComponent, data: { type: 'Create' }
  },
  {
    path: 'loc/view',
    component: VotmCloudLocationsCreateComponent, data: { type: 'View' }
  },
  {
    path: 'loc/edit',
    component: VotmCloudLocationsCreateComponent, data: { type: 'Edit' }
  },
  {
    path: 'loc/create',
    component: VotmCloudLocationsCreateComponent,
    data: { type: 'Create' }
  },
  {
    path: 'loc/edit',
    component: VotmCloudLocationsCreateComponent,
    data: { type: 'Edit' }
  },
  {
    path: 'loc/view',
    component: VotmCloudLocationsCreateComponent,
    data: { type: 'View' }
  },
  {
    path: 'loc/signal',
    component: VotmCloudLocationsSignalComponent
  },
  {
    path: 'asset/home',
    component: VotmCloudAssetsHomeComponent
  },
  {
    path: 'asset/home',
    component: VotmCloudAssetsHomeComponent
  },
  {
    path: 'asset/create',
    component: VotmCloudAssetsCreateComponent,
    data: { type: 'Create' }
  },
  {
    path: 'asset/edit',
    component: VotmCloudAssetsCreateComponent,
    data: { type: 'Edit' }
  },
  {
    path: 'asset/view',
    component: VotmCloudAssetsCreateComponent,
    data: { type: 'View' }
  },
  {
    path: 'asset/create',
    component: VotmCloudAssetsCreateComponent, data: { type: 'Create' }
  },
  {
    path: 'asset/edit',
    component: VotmCloudAssetsCreateComponent, data: { type: 'Edit' }
  },
  {
    path: 'asset/view',
    component: VotmCloudAssetsCreateComponent,
    data: { type: 'View' }
  },
  {
    path: 'asset/create',
    component: VotmCloudAssetsCreateComponent,
    data: { type: 'Create' }
  },
  {
    path: 'asset/edit',
    component: VotmCloudAssetsCreateComponent,
    data: { type: 'Edit' }
  },
  {
    path: 'asset/view',
    component: VotmCloudAssetsCreateComponent,
    data: { type: 'View' }
  },
  {
    path: 'org/template/edit', component: VotmCloudAssetTemplateDetailsComponent, data: { type: 'Edit' }
  },
  {
    path: 'org/template/view', component: VotmCloudAssetTemplateDetailsComponent, data: { type: 'View' }
  },
  {
    path: 'org/template/create', component: VotmCloudAssetTemplateDetailsComponent, data: { type: 'Create' }
  },
  // { path: 'template/list', component: VotmCloudAssetTemplateListComponent },
  {
    path: 'asset/signal',
    component: VotomCloudAssetsSignalComponent
  },
  {
    path: 'sensor/home',
    component: VotmCloudSensorsHomeComponent
  },
  {
    path: 'sensor/edit',
    component: VotmCloudSensorsHomeComponent
  },
  {
    path: 'sensor/view',
    component: VotmCloudSensorsHomeComponent
  },
  {
    path: 'sensor/detail',
    component: VotmCloudSensorsDetailsComponent
  },
  {
    path: 'gateway/home',
    component: VotmCloudGatewaysHomeComponent
  },
  {
    path: 'admin/networkmanagement',
    component: VotmCloudAdminNetworkManagementComponent
  },
  {
    path: 'admin/usermanagement',
    component: AdminUserHomeComponent
  },
  {
    path: 'admin',
    component: VotmCloudAdminPanelComponent
  },
  {
    path: 'admin/networkmanagement/gatewaydetails/view',
    component: VotmCloudAdminGatewaysDetailsComponent
  },
  {
    path: 'admin/networkmanagement/gatewaydetails/edit',
    component: VotmCloudAdminGatewaysDetailsComponent
  },
  {
    path: 'admin/networkmanagement/sensorDetails/view',
    component: VotmCloudAdminSensorDetailsComponent,
    data: { type: 'View' }
  },
  {
    path: 'admin/networkmanagement/sensorDetails/edit',
    component: VotmCloudAdminSensorDetailsComponent,
    data: { type: 'Edit' }
  },
  {
    path: 'super',
    component: VotmCloudSuperAdminComponent
  },
  {
    path: 'login',
    component: VotmCloudLoginComponent
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
