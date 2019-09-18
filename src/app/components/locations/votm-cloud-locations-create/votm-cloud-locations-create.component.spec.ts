import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VotmCloudLocationsCreateComponent } from './votm-cloud-locations-create.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VotmCloudValidatorComponent } from '../../shared/votm-cloud-validator/votm-cloud-validator.component';
import { VotmCloudCharValidatorComponent } from '../../shared/votm-cloud-char-validator/votm-cloud-char-validator.component';
import { Select2Module } from 'ng2-select2';
import { VotmCloudLocationsSignalComponent } from '../votm-cloud-locations-signal/votm-cloud-locations-signal.component';
import { VotmCloudEventsHomeComponent } from '../../events/votm-cloud-events-home/votm-cloud-events-home.component';
import { VotmCloudConfimDialogComponent } from '../../shared/votm-cloud-confim-dialog/votm-cloud-confim-dialog.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule } from 'ngx-toastr';



describe('VotmCloudLocationsCreateComponent', () => {
  let component: VotmCloudLocationsCreateComponent;
  let fixture: ComponentFixture<VotmCloudLocationsCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        Select2Module,
        HttpClientModule,
        RouterTestingModule,
        ToastrModule.forRoot()
      ],
      declarations: [
        VotmCloudLocationsCreateComponent,
        VotmCloudEventsHomeComponent,
        VotmCloudConfimDialogComponent,
        VotmCloudValidatorComponent,
        VotmCloudLocationsSignalComponent,
        VotmCloudCharValidatorComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VotmCloudLocationsCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
