import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VotmCloudLocationsGatewayComponent } from './votm-cloud-locations-gateway.component';

describe('VotmCloudLocationsGatewayComponent', () => {
  let component: VotmCloudLocationsGatewayComponent;
  let fixture: ComponentFixture<VotmCloudLocationsGatewayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VotmCloudLocationsGatewayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VotmCloudLocationsGatewayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
