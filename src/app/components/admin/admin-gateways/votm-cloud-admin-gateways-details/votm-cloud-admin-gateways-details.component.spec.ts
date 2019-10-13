import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VotmCloudAdminGatewaysDetailsComponent } from './votm-cloud-admin-gateways-details.component';

describe('VotmCloudAdminGatewaysDetailsComponent', () => {
  let component: VotmCloudAdminGatewaysDetailsComponent;
  let fixture: ComponentFixture<VotmCloudAdminGatewaysDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VotmCloudAdminGatewaysDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VotmCloudAdminGatewaysDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
