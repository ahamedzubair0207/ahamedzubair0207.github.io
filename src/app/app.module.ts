
import { NgModule, Directive } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';


import { Routes, RouterModule } from '@angular/router';
import {
  OKTA_CONFIG,
  OktaAuthGuard,
  OktaAuthModule,
  OktaCallbackComponent,
} from '@okta/okta-angular';

import UserAuthenticationConfig from './pcm.configuration';



import { NgSelectModule } from '@ng-select/ng-select';
import { NgbModule, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VotmCloudViewsHomeComponent } from './components/views/votm-cloud-views-home/votm-cloud-views-home.component';
import { VotmCloudAlertsHomeComponent } from './components/alerts/votm-cloud-alerts-home/votm-cloud-alerts-home.component';
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
import { VotmCloudAssetsHomeComponent } from './components/assets/votm-cloud-assets-home/votm-cloud-assets-home.component';
import { VotmCloudAssetsCreateComponent } from './components/assets/votm-cloud-assets-create/votm-cloud-assets-create.component';
import { VotmCloudSensorsHomeComponent } from './components/sensors/votm-cloud-sensors-home/votm-cloud-sensors-home.component';
import { VotmCloudGatewaysHomeComponent } from './components/gateways/votm-cloud-gateways-home/votm-cloud-gateways-home.component';
import { VotmCloudAdminPanelComponent } from './components/admin/votm-cloud-admin-panel/votm-cloud-admin-panel.component';
import { VotmCloudSuperAdminComponent } from './components/super/votm-cloud-super-admin/votm-cloud-super-admin.component';

import { MenuService } from './services/menu/menu.service';
import { SharedService } from './services/shared.service';
import { BreadcrumbsService } from './services/breadcrumbs/breadcrumbs.service';

import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { BackendApiService } from './services/mock/backendApi/backend-api.service';
import { VotmCloudSideMenuComponent } from './components/shared/votm-cloud-side-menu/votm-cloud-side-menu.component';
import { VotmCloudLoginComponent } from './components/shared/votm-cloud-login/votm-cloud-login.component';
import { VotmCloudHeaderComponent } from './components/shared/votm-cloud-header/votm-cloud-header.component';

import { CustomHttp } from './services/custom_http/custom_http.service';
import { OrganizationService } from './services/organizations/organization.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VotmCloudValidatorComponent } from './components/shared/votm-cloud-validator/votm-cloud-validator.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { VotmCloudConfimDialogComponent } from './components/shared/votm-cloud-confim-dialog/votm-cloud-confim-dialog.component';
import { VotmLineGraphComponent } from './components/shared/charts/votm-line-graph/votm-line-graph.component';
import { VotmSimpleGaugeComponent } from './components/shared/charts/votm-simple-gauge/votm-simple-gauge.component';
import { VotmAnimatedGaugeComponent } from './components/shared/charts/votm-animated-gauge/votm-animated-gauge.component';
import { VotmMultiGaugeComponent } from './components/shared/charts/votm-multi-gauge/votm-multi-gauge.component';
import { VotmCylinderGaugeComponent } from './components/shared/charts/votm-cylinder-gauge/votm-cylinder-gauge.component';
import { VotmTwoAxesGaugeComponent } from './components/shared/charts/votm-two-axes-gauge/votm-two-axes-gauge.component';
import { VotmPictorialChartComponent } from './components/shared/charts/votm-pictorial-chart/votm-pictorial-chart.component';
import { VotmPieSliceChartComponent } from './components/shared/charts/votm-pie-slice-chart/votm-pie-slice-chart.component';
import {
  VotmClusteredColumnChartComponent
} from './components/shared/charts/votm-clustered-column-chart/votm-clustered-column-chart.component';
import { VotmCloudNameValidatorDirective } from './components/shared/votm-cloud-name-validator/votm-cloud-name-validator.directive';
import { Select2Module } from 'ng2-select2';
import { VotmCloudSensorsDetailsComponent } from './components/sensors/votm-cloud-sensors-details/votm-cloud-sensors-details.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { VotmCloudAlertsCreateComponent } from './components/alerts/votm-cloud-alerts-create/votm-cloud-alerts-create.component';
import { BreadcrumbsComponent } from './components/shared/breadcrumbs/breadcrumbs.component';
import { VotomCloudAssetsSignalComponent } from './components/assets/votm-cloud-assets-signal/votom-cloud-assets-signal.component';
import { VotmCloudCharValidatorComponent } from './components/shared/votm-cloud-char-validator/votm-cloud-char-validator.component';
import {
  VotmCloudLocationsSignalComponent
} from './components/locations/votm-cloud-locations-signal/votm-cloud-locations-signal.component';
import {
  VotmCloudAssetTemplateListComponent
} from './components/assets/votm-cloud-asset-template-list/votm-cloud-asset-template-list.component';
import {
  VotmCloudAssetTemplateDetailsComponent
} from './components/assets/votm-cloud-asset-template-details/votm-cloud-asset-template-details.component';
import { FileUploadModule } from 'primeng/fileupload';
import { DragDropModule } from 'primeng/dragdrop';
import { TooltipModule } from 'primeng/tooltip';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { VotmCloudEventsHomeComponent } from './components/events/votm-cloud-events-home/votm-cloud-events-home.component';
import { VotomCloudTemplateSignalComponent } from './components/assets/votm-cloud-template-signal/votm-cloud-template-signal.component';
import { VotmCloudRequiredAttributeDirective } from './components/shared/required-attribute/votm-cloud-required-attribute.directive';
import {
  VotmCloudOrganizationDashboardComponent
} from './components/organizations/votm-cloud-organization-dashboard/votm-cloud-organization-dashboard.component';
import { VotmLiveDataComponent } from './components/shared/charts/votm-live-data/votm-live-data.component';
import {
  VotmCloudLocationsDashboardComponent
} from './components/locations/votm-cloud-locations-dashboard/votm-cloud-locations-dashboard.component';
import { VotmCloudAssetDashboardComponent } from './components/assets/votm-cloud-asset-dashboard/votm-cloud-asset-dashboard.component';
import {
  VotmCloudLocationsGatewayComponent
} from './components/locations/votm-cloud-locations-gateway/votm-cloud-locations-gateway.component';
import { VotmCloudEventsLocComponent } from './components/events/votm-cloud-events-loc/votm-cloud-events-loc.component';
import { VotmCloudEventsAssetComponent } from './components/events/votm-cloud-events-asset/votm-cloud-events-asset.component';
import {
  VotmCloudAdminNetworkManagementComponent
} from './components/admin/votm-cloud-admin-network-management/votm-cloud-admin-network-management.component';
import { OnlyNumber } from './components/shared/votm-cloud-only-numbers/only-numbers.directive';
import { VotmCloudAdminUserManagementComponent } from './components/admin/votm-cloud-admin-user-management/votm-cloud-admin-user-management.component';
import { VotmCloudLocationsAssetComponent } from './components/locations/votm-cloud-locations-asset/votm-cloud-locations-asset.component';
import { VotmCloudGatewaysDetailsComponent } from './components/gateways/votm-cloud-gateways-details/votm-cloud-gateways-details.component';
import { VotmCloudReceiverDetailsComponent } from './components/gateways/votm-cloud-receiver-details/votm-cloud-receiver-details.component';
import { TreeTableModule } from 'primeng/treetable';
import { VotmCloudAdminNetworkMapComponent } from './components/admin/votm-cloud-admin-network-map/votm-cloud-admin-network-map.component';
import { VotmCloudAdminSensorHomeComponent } from './components/admin/admin-sensors/votm-cloud-admin-sensor-home/votm-cloud-admin-sensor-home.component';
import { VotmCloudAdminSensorDetailsComponent } from './components/admin/admin-sensors/votm-cloud-admin-sensor-details/votm-cloud-admin-sensor-details.component';
import { VotmCloudAdminGatewaysHomeComponent } from './components/admin/admin-gateways/votm-cloud-admin-gateways-home/votm-cloud-admin-gateways-home.component';
import { VotmCloudAdminGatewaysDetailsComponent } from './components/admin/admin-gateways/votm-cloud-admin-gateways-details/votm-cloud-admin-gateways-details.component';
import { VotmCloudAdminReceiverDetailsComponent } from './components/admin/admin-gateways/votm-cloud-admin-receiver-details/votm-cloud-admin-receiver-details.component';
import { VotmCloudAssetChildComponent } from './components/assets/votm-cloud-asset-child/votm-cloud-asset-child.component';
import { NgbDateMomentParserFormatter } from './components/shared/votm-ngbdatepickerformatter/votm-ngbdatepickerformatter';
import { BasicDashboardComponent } from './components/dashboards/basic-dashboard/basic-dashboard.component';
import { DashboardhostComponent } from './components/dashboardhost/dashboardhost.component';
import { DashboardDirective } from './dashboard.directive';
import { ScoutStyleDashboardComponent } from './components/dashboards/scout-style-dashboard/scout-style-dashboard.component';
import { AdminUserHomeComponent } from './components/admin/admin-user-home/admin-user-home.component';
import { VotmCloudAdminGroupManagementComponent } from './components/admin/votm-cloud-admin-group-management/votm-cloud-admin-group-management.component';
import { VotmCloudFavoritesComponent } from './components/favorites/votm-cloud-favorites/votm-cloud-favorites.component';

import { VotmSmoothLineComponent } from './components/shared/charts/votm-smooth-line/votm-smooth-line.component';
import {AmModule} from "@acaisoft/angular-azure-maps";

const oktaConfig = Object.assign({
  onAuthRequired: ({ oktaAuth, router }) => {
    // Redirect the user to your custom login page
    router.navigate(['/login']);
  }
}, UserAuthenticationConfig.oidc);

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
    VotmCloudHeaderComponent,
    VotmCloudValidatorComponent,
    VotmCloudConfimDialogComponent,
    VotmCloudAssetsCreateComponent,
    VotmLineGraphComponent,
    VotmSimpleGaugeComponent,
    VotmAnimatedGaugeComponent,
    VotmMultiGaugeComponent,
    VotmCylinderGaugeComponent,
    VotmTwoAxesGaugeComponent,
    VotmPictorialChartComponent,
    VotmPieSliceChartComponent,
    VotmClusteredColumnChartComponent,
    VotmCloudNameValidatorDirective,
    VotmCloudSensorsDetailsComponent,
    VotmCloudAlertsCreateComponent,
    BreadcrumbsComponent,
    VotomCloudAssetsSignalComponent,
    VotmCloudCharValidatorComponent,
    VotmCloudLocationsSignalComponent,
    VotmCloudAssetTemplateListComponent,
    VotmCloudAssetTemplateDetailsComponent,
    VotmCloudEventsHomeComponent,
    VotomCloudTemplateSignalComponent,
    VotmCloudRequiredAttributeDirective,
    VotmCloudOrganizationDashboardComponent,
    VotmLiveDataComponent,
    VotmCloudLocationsDashboardComponent,
    VotmCloudAssetDashboardComponent,
    VotmCloudLocationsGatewayComponent,
    VotmCloudEventsLocComponent,
    VotmCloudEventsAssetComponent,
    VotmCloudAdminNetworkManagementComponent,
    OnlyNumber,
    VotmCloudAdminUserManagementComponent,
    VotmCloudLocationsAssetComponent,
    VotmCloudGatewaysDetailsComponent,
    VotmCloudReceiverDetailsComponent,
    VotmCloudAdminNetworkMapComponent,
    VotmCloudAdminSensorHomeComponent,
    VotmCloudAdminSensorDetailsComponent,
    VotmCloudAdminGatewaysHomeComponent,
    VotmCloudAdminGatewaysDetailsComponent,
    VotmCloudAdminReceiverDetailsComponent,
    VotmCloudAssetChildComponent,
    BasicDashboardComponent,
    DashboardhostComponent,
    DashboardDirective,
    ScoutStyleDashboardComponent,
    AdminUserHomeComponent,
    VotmCloudAdminGroupManagementComponent,
    VotmCloudFavoritesComponent,
    VotmSmoothLineComponent
  ],


  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    // InMemoryWebApiModule.forRoot(BackendApiService),
    NgbModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    NgMultiSelectDropDownModule.forRoot(),
    Select2Module,
    ToastrModule.forRoot(),
    FileUploadModule,
    DragDropModule,
    TooltipModule,
    OverlayPanelModule,
    OktaAuthModule,
    TreeTableModule,
    AmModule
  ],
  providers: [
    // LoadMapService,
    DatePipe,
    MenuService,
    SharedService,
    BreadcrumbsService,
    { provide: OKTA_CONFIG, useValue: oktaConfig },
    {
      provide: NgbDateParserFormatter,
      useFactory: () => { return new NgbDateMomentParserFormatter(); }
    }
  ],
  bootstrap: [AppComponent],
  entryComponents: [BasicDashboardComponent, ScoutStyleDashboardComponent]
})
export class AppModule { }
