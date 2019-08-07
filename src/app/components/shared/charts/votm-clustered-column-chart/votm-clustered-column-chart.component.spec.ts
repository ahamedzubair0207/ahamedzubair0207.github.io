import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VotmClusteredColumnChartComponent } from './votm-clustered-column-chart.component';

describe('VotmClusteredColumnChartComponent', () => {
  let component: VotmClusteredColumnChartComponent;
  let fixture: ComponentFixture<VotmClusteredColumnChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VotmClusteredColumnChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VotmClusteredColumnChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
