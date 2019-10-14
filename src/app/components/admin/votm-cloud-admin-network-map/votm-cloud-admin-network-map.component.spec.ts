import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VotmCloudAdminNetworkMapComponent } from './votm-cloud-admin-network-map.component';

describe('VotmCloudAdminNetworkMapComponent', () => {
  let component: VotmCloudAdminNetworkMapComponent;
  let fixture: ComponentFixture<VotmCloudAdminNetworkMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VotmCloudAdminNetworkMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VotmCloudAdminNetworkMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
