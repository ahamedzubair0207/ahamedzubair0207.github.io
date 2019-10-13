import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VotmCloudAdminSensorDetailsComponent } from './votm-cloud-admin-sensor-details.component';

describe('VotmCloudAdminSensorDetailsComponent', () => {
  let component: VotmCloudAdminSensorDetailsComponent;
  let fixture: ComponentFixture<VotmCloudAdminSensorDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VotmCloudAdminSensorDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VotmCloudAdminSensorDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
