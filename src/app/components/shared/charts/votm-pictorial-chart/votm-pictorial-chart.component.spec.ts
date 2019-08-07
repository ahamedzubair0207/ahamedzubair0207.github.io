import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VotmPictorialChartComponent } from './votm-pictorial-chart.component';

describe('VotmPictorialChartComponent', () => {
  let component: VotmPictorialChartComponent;
  let fixture: ComponentFixture<VotmPictorialChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VotmPictorialChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VotmPictorialChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
