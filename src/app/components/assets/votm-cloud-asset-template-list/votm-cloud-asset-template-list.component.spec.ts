import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VotmCloudAssetTemplateListComponent } from './votm-cloud-asset-template-list.component';
import { VotmCloudConfimDialogComponent } from '../../shared/votm-cloud-confim-dialog/votm-cloud-confim-dialog.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule } from 'ngx-toastr';

describe('VotmCloudAssetTemplateListComponent', () => {
  let component: VotmCloudAssetTemplateListComponent;
  let fixture: ComponentFixture<VotmCloudAssetTemplateListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        RouterTestingModule,
        ToastrModule.forRoot()
      ],
      declarations: [VotmCloudAssetTemplateListComponent, VotmCloudConfimDialogComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VotmCloudAssetTemplateListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
