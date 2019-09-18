import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VotmCloudOrganizationsCreateComponent } from './votm-cloud-organizations-create.component';
import { FormsModule } from '@angular/forms';
import { VotmCloudValidatorComponent } from '../../shared/votm-cloud-validator/votm-cloud-validator.component';
import { VotmCloudCharValidatorComponent } from '../../shared/votm-cloud-char-validator/votm-cloud-char-validator.component';
import { VotmCloudAlertsHomeComponent } from '../../alerts/votm-cloud-alerts-home/votm-cloud-alerts-home.component';
import { VotmCloudEventsHomeComponent } from '../../events/votm-cloud-events-home/votm-cloud-events-home.component';
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
      imports: [FormsModule, RouterTestingModule, HttpClientModule, ToastrModule.forRoot()],
      declarations: [
        VotmCloudOrganizationsCreateComponent,
        VotmCloudConfimDialogComponent,
        VotmCloudValidatorComponent,
        VotmCloudEventsHomeComponent,
        VotmCloudCharValidatorComponent,
        VotmCloudAlertsHomeComponent
      ]
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
