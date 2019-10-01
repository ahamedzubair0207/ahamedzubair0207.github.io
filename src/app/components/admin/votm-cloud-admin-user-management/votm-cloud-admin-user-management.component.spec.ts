import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VotmCloudAdminUserManagementComponent } from './votm-cloud-admin-user-management.component';

describe('VotmCloudAdminUserManagementComponent', () => {
  let component: VotmCloudAdminUserManagementComponent;
  let fixture: ComponentFixture<VotmCloudAdminUserManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VotmCloudAdminUserManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VotmCloudAdminUserManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
