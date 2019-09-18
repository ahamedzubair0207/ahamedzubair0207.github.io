import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VotmCloudAssetsCreateComponent } from './votm-cloud-assets-create.component';
import { FormsModule } from '@angular/forms';
import { VotmCloudValidatorComponent } from '../../shared/votm-cloud-validator/votm-cloud-validator.component';
import { VotmCloudCharValidatorComponent } from '../../shared/votm-cloud-char-validator/votm-cloud-char-validator.component';
import { VotomCloudAssetsSignalComponent } from '../votm-cloud-assets-signal/votom-cloud-assets-signal.component';
import { VotmCloudEventsHomeComponent } from '../../events/votm-cloud-events-home/votm-cloud-events-home.component';
import { VotmCloudConfimDialogComponent } from '../../shared/votm-cloud-confim-dialog/votm-cloud-confim-dialog.component';
import { OverlayPanel } from 'primeng/overlaypanel';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule } from 'ngx-toastr';

describe('VotmCloudAssetsCreateComponent', () => {
  let component: VotmCloudAssetsCreateComponent;
  let fixture: ComponentFixture<VotmCloudAssetsCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, HttpClientModule, RouterTestingModule, ToastrModule.forRoot()],
      declarations: [
        VotmCloudAssetsCreateComponent,
        VotmCloudConfimDialogComponent,
        VotmCloudValidatorComponent,
        VotmCloudCharValidatorComponent,
        VotomCloudAssetsSignalComponent,
        VotmCloudEventsHomeComponent,
        OverlayPanel
      ]
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
