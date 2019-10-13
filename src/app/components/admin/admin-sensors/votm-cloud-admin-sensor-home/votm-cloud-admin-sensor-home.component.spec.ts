import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VotmCloudAdminSensorHomeComponent } from './votm-cloud-admin-sensor-home.component';

describe('VotmCloudAdminSensorHomeComponent', () => {
  let component: VotmCloudAdminSensorHomeComponent;
  let fixture: ComponentFixture<VotmCloudAdminSensorHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VotmCloudAdminSensorHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VotmCloudAdminSensorHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
