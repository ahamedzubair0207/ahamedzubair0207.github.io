import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VotmCloudOrganizationsHomeComponent } from './votm-cloud-organizations-home.component';

describe('VotmCloudOrganizationsHomeComponent', () => {
  let component: VotmCloudOrganizationsHomeComponent;
  let fixture: ComponentFixture<VotmCloudOrganizationsHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VotmCloudOrganizationsHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VotmCloudOrganizationsHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
