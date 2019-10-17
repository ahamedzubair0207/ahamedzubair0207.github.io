import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoutStyleDashboardComponent } from './scout-style-dashboard.component';

describe('ScoutStyleDashboardComponent', () => {
  let component: ScoutStyleDashboardComponent;
  let fixture: ComponentFixture<ScoutStyleDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScoutStyleDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScoutStyleDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
