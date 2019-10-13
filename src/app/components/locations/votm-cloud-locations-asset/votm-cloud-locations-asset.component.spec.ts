import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VotmCloudLocationsAssetComponent } from './votm-cloud-locations-asset.component';

describe('VotmCloudLocationsAssetComponent', () => {
  let component: VotmCloudLocationsAssetComponent;
  let fixture: ComponentFixture<VotmCloudLocationsAssetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VotmCloudLocationsAssetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VotmCloudLocationsAssetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
