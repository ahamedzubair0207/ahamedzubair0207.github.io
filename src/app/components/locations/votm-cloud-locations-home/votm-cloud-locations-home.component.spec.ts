import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VotmCloudLocationsHomeComponent } from './votm-cloud-locations-home.component';

describe('VotmCloudLocationsHomeComponent', () => {
  let component: VotmCloudLocationsHomeComponent;
  let fixture: ComponentFixture<VotmCloudLocationsHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VotmCloudLocationsHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VotmCloudLocationsHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
