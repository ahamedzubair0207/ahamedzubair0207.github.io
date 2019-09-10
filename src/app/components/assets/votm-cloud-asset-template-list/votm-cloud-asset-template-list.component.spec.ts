import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VotmCloudAssetTemplateListComponent } from './votm-cloud-asset-template-list.component';
import { VotmCloudConfimDialogComponent } from '../../shared/votm-cloud-confim-dialog/votm-cloud-confim-dialog.component';

describe('VotmCloudAssetTemplateListComponent', () => {
  let component: VotmCloudAssetTemplateListComponent;
  let fixture: ComponentFixture<VotmCloudAssetTemplateListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
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
