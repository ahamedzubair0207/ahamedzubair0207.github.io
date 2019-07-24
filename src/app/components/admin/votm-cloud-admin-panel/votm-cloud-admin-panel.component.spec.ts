import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VotmCloudAdminPanelComponent } from './votm-cloud-admin-panel.component';

describe('VotmCloudAdminPanelComponent', () => {
  let component: VotmCloudAdminPanelComponent;
  let fixture: ComponentFixture<VotmCloudAdminPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VotmCloudAdminPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VotmCloudAdminPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
