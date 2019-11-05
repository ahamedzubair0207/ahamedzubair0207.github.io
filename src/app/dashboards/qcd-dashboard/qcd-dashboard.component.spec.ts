import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QcdDashboardComponent } from './qcd-dashboard.component';

describe('QcdDashboardComponent', () => {
  let component: QcdDashboardComponent;
  let fixture: ComponentFixture<QcdDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QcdDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QcdDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
