import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VotmCloudAdminGroupManagementComponent } from './votm-cloud-admin-group-management.component';

describe('VotmCloudAdminGroupManagementComponent', () => {
  let component: VotmCloudAdminGroupManagementComponent;
  let fixture: ComponentFixture<VotmCloudAdminGroupManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VotmCloudAdminGroupManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VotmCloudAdminGroupManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
