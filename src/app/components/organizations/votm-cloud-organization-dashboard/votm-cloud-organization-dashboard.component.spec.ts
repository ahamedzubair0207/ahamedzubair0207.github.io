import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VotmCloudOrganizationDashboardComponent } from './votm-cloud-organization-dashboard.component';

describe('VotmCloudOrganizationDashboardComponent', () => {
  let component: VotmCloudOrganizationDashboardComponent;
  let fixture: ComponentFixture<VotmCloudOrganizationDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VotmCloudOrganizationDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VotmCloudOrganizationDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
