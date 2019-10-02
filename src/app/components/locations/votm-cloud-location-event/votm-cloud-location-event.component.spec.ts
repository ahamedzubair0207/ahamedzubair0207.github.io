import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VotmCloudLocationEventComponent } from './votm-cloud-location-event.component';

describe('VotmCloudLocationEventComponent', () => {
  let component: VotmCloudLocationEventComponent;
  let fixture: ComponentFixture<VotmCloudLocationEventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VotmCloudLocationEventComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VotmCloudLocationEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
