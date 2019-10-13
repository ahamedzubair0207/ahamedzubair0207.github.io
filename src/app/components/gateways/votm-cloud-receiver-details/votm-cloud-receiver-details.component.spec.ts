import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VotmCloudReceiverDetailsComponent } from './votm-cloud-receiver-details.component';

describe('VotmCloudReceiverDetailsComponent', () => {
  let component: VotmCloudReceiverDetailsComponent;
  let fixture: ComponentFixture<VotmCloudReceiverDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VotmCloudReceiverDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VotmCloudReceiverDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
