import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VotmLiveOrderBookDepthChartComponent } from './votm-live-order-book-depth-chart.component';

describe('VotmLiveOrderBookDepthChartComponent', () => {
  let component: VotmLiveOrderBookDepthChartComponent;
  let fixture: ComponentFixture<VotmLiveOrderBookDepthChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VotmLiveOrderBookDepthChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VotmLiveOrderBookDepthChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
