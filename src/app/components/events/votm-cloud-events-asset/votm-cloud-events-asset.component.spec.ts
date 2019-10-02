import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VotmCloudEventsAssetComponent } from './votm-cloud-events-asset.component';

describe('VotmCloudEventsAssetComponent', () => {
  let component: VotmCloudEventsAssetComponent;
  let fixture: ComponentFixture<VotmCloudEventsAssetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VotmCloudEventsAssetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VotmCloudEventsAssetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
