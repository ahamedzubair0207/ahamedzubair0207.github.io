import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VotmCloudOrganizationsCreateComponent } from './votm-cloud-organizations-create.component';

describe('VotmCloudOrganizationsCreateComponent', () => {
  let component: VotmCloudOrganizationsCreateComponent;
  let fixture: ComponentFixture<VotmCloudOrganizationsCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VotmCloudOrganizationsCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VotmCloudOrganizationsCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
