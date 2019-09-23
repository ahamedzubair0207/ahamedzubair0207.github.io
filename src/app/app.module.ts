
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
import { FormsModule } from '@angular/forms';
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
import { VotmClusteredColumnChartComponent } from './components/shared/charts/votm-clustered-column-chart/votm-clustered-column-chart.component';
import { VotmCloudNameValidatorDirective } from './components/shared/votm-cloud-name-validator/votm-cloud-name-validator.directive';
import { Select2Module } from 'ng2-select2';
import { VotmCloudSensorsDetailsComponent } from './components/sensors/votm-cloud-sensors-details/votm-cloud-sensors-details.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { VotmCloudAlertsCreateComponent } from './components/alerts/votm-cloud-alerts-create/votm-cloud-alerts-create.component';
import { BreadcrumbsComponent } from './components/shared/breadcrumbs/breadcrumbs.component';
import { VotomCloudAssetsSignalComponent } from './components/assets/votm-cloud-assets-signal/votom-cloud-assets-signal.component';
import { VotmCloudCharValidatorComponent } from './components/shared/votm-cloud-char-validator/votm-cloud-char-validator.component';
import { VotmCloudLocationsSignalComponent } from './components/locations/votm-cloud-locations-signal/votm-cloud-locations-signal.component';
import { VotmCloudAssetTemplateListComponent } from './components/assets/votm-cloud-asset-template-list/votm-cloud-asset-template-list.component';
import { VotmCloudAssetTemplateDetailsComponent } from './components/assets/votm-cloud-asset-template-details/votm-cloud-asset-template-details.component';
import {FileUploadModule} from 'primeng/fileupload';
import {DragDropModule} from 'primeng/dragdrop';
import {TooltipModule} from 'primeng/tooltip';
import {OverlayPanelModule} from 'primeng/overlaypanel';
import { VotmCloudEventsHomeComponent } from './components/events/votm-cloud-events-home/votm-cloud-events-home.component';
import { VotomCloudTemplateSignalComponent } from './components/assets/votm-cloud-template-signal/votm-cloud-template-signal.component';
import { VotmCloudRequiredAttributeDirective } from './components/shared/required-attribute/votm-cloud-required-attribute.directive';
import { VotmCloudOrganizationDashboardComponent } from './components/organizations/votm-cloud-organization-dashboard/votm-cloud-organization-dashboard.component';
import { VotmLiveOrderBookDepthChartComponent } from './components/shared/charts/votm-live-order-book-depth-chart/votm-live-order-book-depth-chart.component';
import { VotmLiveDataComponent } from './components/shared/charts/votm-live-data/votm-live-data.component';
import { VotmCloudLocationsDashboardComponent } from './components/locations/votm-cloud-locations-dashboard/votm-cloud-locations-dashboard.component';
import { VotmCloudAssetDashboardComponent } from './components/assets/votm-cloud-asset-dashboard/votm-cloud-asset-dashboard.component';



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
    VotmLiveOrderBookDepthChartComponent,
    VotmLiveDataComponent,
    VotmCloudLocationsDashboardComponent,
    VotmCloudAssetDashboardComponent
  ],

 
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    // InMemoryWebApiModule.forRoot(BackendApiService),
    NgbModule,
    HttpClientModule,
    FormsModule,
    NgMultiSelectDropDownModule.forRoot(),
    Select2Module,
    ToastrModule.forRoot(),
    FileUploadModule,
    DragDropModule,
    TooltipModule,
    OverlayPanelModule
  ],
  providers: [
    DatePipe,
    MenuService,
    SharedService,
    BreadcrumbsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
