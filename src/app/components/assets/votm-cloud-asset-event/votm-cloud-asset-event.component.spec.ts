import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VotmCloudAssetEventComponent } from './votm-cloud-asset-event.component';

describe('VotmCloudAssetEventComponent', () => {
  let component: VotmCloudAssetEventComponent;
  let fixture: ComponentFixture<VotmCloudAssetEventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VotmCloudAssetEventComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VotmCloudAssetEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
