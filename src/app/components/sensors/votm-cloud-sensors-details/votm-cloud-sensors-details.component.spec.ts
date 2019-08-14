import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VotmCloudSensorsDetailsComponent } from './votm-cloud-sensors-details.component';

describe('VotmCloudSensorsDetailsComponent', () => {
  let component: VotmCloudSensorsDetailsComponent;
  let fixture: ComponentFixture<VotmCloudSensorsDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VotmCloudSensorsDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VotmCloudSensorsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
