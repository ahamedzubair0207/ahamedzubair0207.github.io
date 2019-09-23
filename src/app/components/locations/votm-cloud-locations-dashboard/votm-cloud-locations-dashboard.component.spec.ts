import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VotmCloudLocationsDashboardComponent } from './votm-cloud-locations-dashboard.component';

describe('VotmCloudLocationsDashboardComponent', () => {
  let component: VotmCloudLocationsDashboardComponent;
  let fixture: ComponentFixture<VotmCloudLocationsDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VotmCloudLocationsDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VotmCloudLocationsDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
