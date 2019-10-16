import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicDashboardComponent } from './basic-dashboard.component';

describe('BasicDashboardComponent', () => {
  let component: BasicDashboardComponent;
  let fixture: ComponentFixture<BasicDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BasicDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
