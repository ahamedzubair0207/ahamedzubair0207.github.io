
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
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

import { MenuService } from './services/menu/menu.service';
import { SharedService } from './services/shared.service';

import { InMemoryWebApiModule } from 'angular-in-memory-web-api';  
import { BackendApiService } from './services/mock/backendApi/backend-api.service';
import { VotmCloudSideMenuComponent } from './components/shared/votm-cloud-side-menu/votm-cloud-side-menu.component';
import { VotmCloudLoginComponent } from './components/shared/votm-cloud-login/votm-cloud-login.component';
import { VotmCloudHeaderComponent } from './components/shared/votm-cloud-header/votm-cloud-header.component';

import { CustomHttp } from './services/custom_http/custom_http.service';
import { OrganizationService } from './services/organizations/organization.service';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    VotmCloudViewsHomeComponent,
    VotmCloudAlertsHomeComponent,
    VotmCloudPreferencesComponent,
    VotmCloudOrganizationsHomeComponent,
    VotmCloudOrganizationsCreateComponent,
    VotmCloudLocationsHomeComponent,
    VotmCloudLocationsCreateComponent,
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
    HttpClientModule,
    AppRoutingModule,
    // InMemoryWebApiModule.forRoot(BackendApiService),
    NgbModule,
    FormsModule
  ],
  providers: [
    DatePipe,
    MenuService,
    SharedService,

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
