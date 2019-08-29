import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VotmCloudLocationsSignalComponent } from './votm-cloud-locations-signal.component';

describe('VotmCloudLocationsSignalComponent', () => {
  let component: VotmCloudLocationsSignalComponent;
  let fixture: ComponentFixture<VotmCloudLocationsSignalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VotmCloudLocationsSignalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VotmCloudLocationsSignalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
