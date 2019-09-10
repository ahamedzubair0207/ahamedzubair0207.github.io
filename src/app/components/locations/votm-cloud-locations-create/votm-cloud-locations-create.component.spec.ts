import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VotmCloudLocationsCreateComponent } from './votm-cloud-locations-create.component';
import { FormsModule } from '@angular/forms';
import { VotmCloudValidatorComponent } from '../../shared/votm-cloud-validator/votm-cloud-validator.component';
import { VotmCloudCharValidatorComponent } from '../../shared/votm-cloud-char-validator/votm-cloud-char-validator.component';
import { Select2Module } from 'ng2-select2';
import { VotmCloudConfimDialogComponent } from '../../shared/votm-cloud-confim-dialog/votm-cloud-confim-dialog.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';

describe('VotmCloudLocationsCreateComponent', () => {
  let component: VotmCloudLocationsCreateComponent;
  let fixture: ComponentFixture<VotmCloudLocationsCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, Select2Module, RouterTestingModule, HttpClientModule, ToastrModule.forRoot()],
      declarations: [VotmCloudLocationsCreateComponent, VotmCloudConfimDialogComponent, VotmCloudValidatorComponent, VotmCloudCharValidatorComponent]
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
