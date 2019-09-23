import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VotmCloudUserPreferenceComponent } from './votm-cloud-user-preference.component';

describe('VotmCloudUserPreferenceComponent', () => {
  let component: VotmCloudUserPreferenceComponent;
  let fixture: ComponentFixture<VotmCloudUserPreferenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VotmCloudUserPreferenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VotmCloudUserPreferenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
