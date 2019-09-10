import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VotmCloudOrganizationsCreateComponent } from './votm-cloud-organizations-create.component';
import { FormsModule } from '@angular/forms';
// import { OrganizationService } from '../services/Organization/organization.service';

describe('VotmCloudOrganizationsCreateComponent', () => {
  let component: VotmCloudOrganizationsCreateComponent;
  let fixture: ComponentFixture<VotmCloudOrganizationsCreateComponent>;
  // let newOrg : Organization = {
  //   name: "",
  //   desc: ""
  // };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [VotmCloudOrganizationsCreateComponent]
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
