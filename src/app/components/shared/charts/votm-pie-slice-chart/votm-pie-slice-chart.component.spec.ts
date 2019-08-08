import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VotmPieSliceChartComponent } from './votm-pie-slice-chart.component';

describe('VotmPieSliceChartComponent', () => {
  let component: VotmPieSliceChartComponent;
  let fixture: ComponentFixture<VotmPieSliceChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VotmPieSliceChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VotmPieSliceChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
