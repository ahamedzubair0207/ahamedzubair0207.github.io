import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VotmCloudAlertsHomeComponent } from './votm-cloud-alerts-home.component';

describe('VotmCloudAlertsHomeComponent', () => {
  let component: VotmCloudAlertsHomeComponent;
  let fixture: ComponentFixture<VotmCloudAlertsHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VotmCloudAlertsHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VotmCloudAlertsHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
