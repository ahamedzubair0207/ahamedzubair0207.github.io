import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VotmCloudAssetDashboardComponent } from './votm-cloud-asset-dashboard.component';

describe('VotmCloudAssetDashboardComponent', () => {
  let component: VotmCloudAssetDashboardComponent;
  let fixture: ComponentFixture<VotmCloudAssetDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VotmCloudAssetDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VotmCloudAssetDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
