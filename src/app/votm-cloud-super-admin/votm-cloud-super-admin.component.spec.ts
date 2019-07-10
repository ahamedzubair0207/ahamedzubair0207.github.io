import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VotmCloudSuperAdminComponent } from './votm-cloud-super-admin.component';

describe('VotmCloudSuperAdminComponent', () => {
  let component: VotmCloudSuperAdminComponent;
  let fixture: ComponentFixture<VotmCloudSuperAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VotmCloudSuperAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VotmCloudSuperAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
