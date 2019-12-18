import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VotmcloudDashboardCreateComponent } from './votmcloud-dashboard-create.component';

describe('VotmcloudDashboardCreateComponent', () => {
  let component: VotmcloudDashboardCreateComponent;
  let fixture: ComponentFixture<VotmcloudDashboardCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VotmcloudDashboardCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VotmcloudDashboardCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
