import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VotmCloudPreferencesComponent } from './votm-cloud-preferences.component';

describe('VotmCloudPreferencesComponent', () => {
  let component: VotmCloudPreferencesComponent;
  let fixture: ComponentFixture<VotmCloudPreferencesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VotmCloudPreferencesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VotmCloudPreferencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
