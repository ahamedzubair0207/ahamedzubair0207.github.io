import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VotmCloudGatewaysHomeComponent } from './votm-cloud-gateways-home.component';

describe('VotmCloudGatewaysHomeComponent', () => {
  let component: VotmCloudGatewaysHomeComponent;
  let fixture: ComponentFixture<VotmCloudGatewaysHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VotmCloudGatewaysHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VotmCloudGatewaysHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
