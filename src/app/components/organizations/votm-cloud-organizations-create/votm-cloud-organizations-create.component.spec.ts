import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VotmCloudOrganizationsCreateComponent } from './votm-cloud-organizations-create.component';
import { FormsModule } from '@angular/forms';
import { VotmCloudValidatorComponent } from '../../shared/votm-cloud-validator/votm-cloud-validator.component';
import { VotmCloudCharValidatorComponent } from '../../shared/votm-cloud-char-validator/votm-cloud-char-validator.component';
import { VotmCloudConfimDialogComponent } from '../../shared/votm-cloud-confim-dialog/votm-cloud-confim-dialog.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
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
      imports: [RouterTestingModule, HttpClientModule, FormsModule, ToastrModule.forRoot()],
      declarations: [VotmCloudOrganizationsCreateComponent, VotmCloudConfimDialogComponent, VotmCloudValidatorComponent, VotmCloudCharValidatorComponent]
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
