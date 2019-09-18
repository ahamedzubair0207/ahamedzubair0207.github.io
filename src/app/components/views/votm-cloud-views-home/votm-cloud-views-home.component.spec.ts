import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VotmCloudViewsHomeComponent } from './votm-cloud-views-home.component';
import { BreadcrumbsComponent } from '../../shared/breadcrumbs/breadcrumbs.component';
import { VotmSimpleGaugeComponent } from '../../shared/charts/votm-simple-gauge/votm-simple-gauge.component';
import { VotmLineGraphComponent } from '../../shared/charts/votm-line-graph/votm-line-graph.component';
import { VotmAnimatedGaugeComponent } from '../../shared/charts/votm-animated-gauge/votm-animated-gauge.component';
import { VotmTwoAxesGaugeComponent } from '../../shared/charts/votm-two-axes-gauge/votm-two-axes-gauge.component';
import { VotmMultiGaugeComponent } from '../../shared/charts/votm-multi-gauge/votm-multi-gauge.component';
import { VotmClusteredColumnChartComponent } from '../../shared/charts/votm-clustered-column-chart/votm-clustered-column-chart.component';
import { VotmCylinderGaugeComponent } from '../../shared/charts/votm-cylinder-gauge/votm-cylinder-gauge.component';
import { VotmPictorialChartComponent } from '../../shared/charts/votm-pictorial-chart/votm-pictorial-chart.component';
import { VotmPieSliceChartComponent } from '../../shared/charts/votm-pie-slice-chart/votm-pie-slice-chart.component';

describe('VotmCloudViewsHomeComponent', () => {
  let component: VotmCloudViewsHomeComponent;
  let fixture: ComponentFixture<VotmCloudViewsHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        VotmCloudViewsHomeComponent,
        BreadcrumbsComponent,
        VotmSimpleGaugeComponent,
        VotmMultiGaugeComponent,
        VotmPictorialChartComponent,
        VotmPieSliceChartComponent,
        VotmCylinderGaugeComponent,
        VotmClusteredColumnChartComponent,
        VotmLineGraphComponent,
        VotmAnimatedGaugeComponent,
        VotmTwoAxesGaugeComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VotmCloudViewsHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
