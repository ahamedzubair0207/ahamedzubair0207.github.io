import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VotmCloudAdminSensorAlertComponent } from './votm-cloud-admin-sensor-alert.component';

describe('VotmCloudAdminSensorAlertComponent', () => {
  let component: VotmCloudAdminSensorAlertComponent;
  let fixture: ComponentFixture<VotmCloudAdminSensorAlertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VotmCloudAdminSensorAlertComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VotmCloudAdminSensorAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
