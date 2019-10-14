import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VotmCloudAdminReceiverDetailsComponent } from './votm-cloud-admin-receiver-details.component';

describe('VotmCloudAdminReceiverDetailsComponent', () => {
  let component: VotmCloudAdminReceiverDetailsComponent;
  let fixture: ComponentFixture<VotmCloudAdminReceiverDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VotmCloudAdminReceiverDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VotmCloudAdminReceiverDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
