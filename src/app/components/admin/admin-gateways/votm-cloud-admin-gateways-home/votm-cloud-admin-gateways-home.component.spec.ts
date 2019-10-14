import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VotmCloudAdminGatewaysHomeComponent } from './votm-cloud-admin-gateways-home.component';

describe('VotmCloudAdminGatewaysHomeComponent', () => {
  let component: VotmCloudAdminGatewaysHomeComponent;
  let fixture: ComponentFixture<VotmCloudAdminGatewaysHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VotmCloudAdminGatewaysHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VotmCloudAdminGatewaysHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
