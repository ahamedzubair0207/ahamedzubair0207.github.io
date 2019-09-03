import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VotmCloudAssetTemplateDetailsComponent } from './votm-cloud-asset-template-details.component';

describe('VotmCloudAssetTemplateDetailsComponent', () => {
  let component: VotmCloudAssetTemplateDetailsComponent;
  let fixture: ComponentFixture<VotmCloudAssetTemplateDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VotmCloudAssetTemplateDetailsComponent ]
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
