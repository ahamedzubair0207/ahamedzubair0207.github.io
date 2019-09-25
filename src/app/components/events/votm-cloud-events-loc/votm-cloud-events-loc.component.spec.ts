import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VotmCloudEventsLocComponent } from './votm-cloud-events-loc.component';

describe('VotmCloudEventsLocComponent', () => {
  let component: VotmCloudEventsLocComponent;
  let fixture: ComponentFixture<VotmCloudEventsLocComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VotmCloudEventsLocComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VotmCloudEventsLocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
