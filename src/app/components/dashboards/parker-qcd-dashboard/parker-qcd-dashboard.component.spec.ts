import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParkerQcdDashboardComponent } from './parker-qcd-dashboard.component';

describe('ParkerQcdDashboardComponent', () => {
  let component: ParkerQcdDashboardComponent;
  let fixture: ComponentFixture<ParkerQcdDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParkerQcdDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParkerQcdDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
