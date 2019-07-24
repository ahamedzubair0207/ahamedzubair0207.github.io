import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VotmCloudSensorsHomeComponent } from './votm-cloud-sensors-home.component';

describe('VotmCloudSensorsHomeComponent', () => {
  let component: VotmCloudSensorsHomeComponent;
  let fixture: ComponentFixture<VotmCloudSensorsHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VotmCloudSensorsHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VotmCloudSensorsHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
