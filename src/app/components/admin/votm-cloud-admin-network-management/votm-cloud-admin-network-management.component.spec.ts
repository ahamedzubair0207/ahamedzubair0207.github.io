import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VotmCloudAdminNetworkManagementComponent } from './votm-cloud-admin-network-management.component';

describe('VotmCloudAdminNetworkManagementComponent', () => {
  let component: VotmCloudAdminNetworkManagementComponent;
  let fixture: ComponentFixture<VotmCloudAdminNetworkManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VotmCloudAdminNetworkManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VotmCloudAdminNetworkManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
