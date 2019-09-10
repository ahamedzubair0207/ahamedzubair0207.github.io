import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VotmCloudAssetsCreateComponent } from './votm-cloud-assets-create.component';
import { VotmCloudConfimDialogComponent } from '../../shared/votm-cloud-confim-dialog/votm-cloud-confim-dialog.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { VotmCloudValidatorComponent } from '../../shared/votm-cloud-validator/votm-cloud-validator.component';
import { VotmCloudCharValidatorComponent } from '../../shared/votm-cloud-char-validator/votm-cloud-char-validator.component';
import { FileUploadModule } from 'primeng/fileupload';

describe('VotmCloudAssetsCreateComponent', () => {
  let component: VotmCloudAssetsCreateComponent;
  let fixture: ComponentFixture<VotmCloudAssetsCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule, FormsModule, FileUploadModule ],
      declarations: [VotmCloudAssetsCreateComponent, VotmCloudConfimDialogComponent, VotmCloudValidatorComponent, VotmCloudCharValidatorComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VotmCloudAssetsCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
