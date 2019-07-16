import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
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

import { MenuService } from './services/menu/menu.service';

import { InMemoryWebApiModule } from 'angular-in-memory-web-api';  
import { BackendApiService } from './services/mock/backendApi/backend-api.service';
import { VotmCloudSideMenuComponent } from './votm-cloud-side-menu/votm-cloud-side-menu.component';
import { VotmCloudLoginComponent } from './votm-cloud-login/votm-cloud-login.component';
import { VotmCloudHeaderComponent } from './votm-cloud-header/votm-cloud-header.component';

@NgModule({
  declarations: [
    AppComponent,
    VotmCloudViewsHomeComponent,
    VotmCloudAlertsHomeComponent,
    VotmCloudPreferencesComponent,
    VotmCloudOrganizationsHomeComponent,
    VotmCloudSitesHomeComponent,
    VotmCloudAssetsHomeComponent,
    VotmCloudSensorsHomeComponent,
    VotmCloudGatewaysHomeComponent,
    VotmCloudAdminPanelComponent,
    VotmCloudSuperAdminComponent,
    VotmCloudSideMenuComponent,
    VotmCloudLoginComponent,
    VotmCloudHeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    InMemoryWebApiModule.forRoot(BackendApiService)
  ],
  providers: [
    MenuService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
