import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VotmCloudLocationsSignalComponent } from './votm-cloud-locations-signal.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('VotmCloudLocationsSignalComponent', () => {
  let component: VotmCloudLocationsSignalComponent;
  let fixture: ComponentFixture<VotmCloudLocationsSignalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [VotmCloudLocationsSignalComponent]
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
