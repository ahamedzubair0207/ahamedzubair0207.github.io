import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VotmCloudAssetTemplateDetailsComponent } from './votm-cloud-asset-template-details.component';
import { VotmCloudConfimDialogComponent } from '../../shared/votm-cloud-confim-dialog/votm-cloud-confim-dialog.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { VotmCloudValidatorComponent } from '../../shared/votm-cloud-validator/votm-cloud-validator.component';
import { VotmCloudCharValidatorComponent } from '../../shared/votm-cloud-char-validator/votm-cloud-char-validator.component';

describe('VotmCloudAssetTemplateDetailsComponent', () => {
  let component: VotmCloudAssetTemplateDetailsComponent;
  let fixture: ComponentFixture<VotmCloudAssetTemplateDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule, FormsModule],
      declarations: [VotmCloudAssetTemplateDetailsComponent, VotmCloudConfimDialogComponent, VotmCloudValidatorComponent, VotmCloudCharValidatorComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VotmCloudAssetTemplateDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
