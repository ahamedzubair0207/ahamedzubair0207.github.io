import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VotmCloudAssetsDashboardComponent } from './votm-cloud-assets-dashboard.component';

describe('VotmCloudAssetsDashboardComponent', () => {
  let component: VotmCloudAssetsDashboardComponent;
  let fixture: ComponentFixture<VotmCloudAssetsDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VotmCloudAssetsDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VotmCloudAssetsDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
