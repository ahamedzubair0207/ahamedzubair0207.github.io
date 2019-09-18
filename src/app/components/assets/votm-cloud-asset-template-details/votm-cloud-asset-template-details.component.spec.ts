import { OverlayPanel } from 'primeng/overlaypanel';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VotmCloudAssetTemplateDetailsComponent } from './votm-cloud-asset-template-details.component';
import { VotmCloudConfimDialogComponent } from '../../shared/votm-cloud-confim-dialog/votm-cloud-confim-dialog.component';
import { FormsModule} from '@angular/forms';
import { VotmCloudValidatorComponent } from '../../shared/votm-cloud-validator/votm-cloud-validator.component';
import { VotmCloudCharValidatorComponent } from '../../shared/votm-cloud-char-validator/votm-cloud-char-validator.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { VotomCloudTemplateSignalComponent } from '../votm-cloud-template-signal/votm-cloud-template-signal.component';
import { ToastrModule } from 'ngx-toastr';

describe('VotmCloudAssetTemplateDetailsComponent', () => {
  let component: VotmCloudAssetTemplateDetailsComponent;
  let fixture: ComponentFixture<VotmCloudAssetTemplateDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, RouterTestingModule, HttpClientModule,  ToastrModule.forRoot()],
      declarations: [
        VotmCloudAssetTemplateDetailsComponent,
        VotmCloudConfimDialogComponent,
        VotmCloudValidatorComponent,
        VotmCloudCharValidatorComponent,
        VotomCloudTemplateSignalComponent,
        OverlayPanel]
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
