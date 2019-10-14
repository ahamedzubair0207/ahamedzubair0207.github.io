import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VotmCloudGatewaysDetailsComponent } from './votm-cloud-gateways-details.component';

describe('VotmCloudGatewaysDetailsComponent', () => {
  let component: VotmCloudGatewaysDetailsComponent;
  let fixture: ComponentFixture<VotmCloudGatewaysDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VotmCloudGatewaysDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VotmCloudGatewaysDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
