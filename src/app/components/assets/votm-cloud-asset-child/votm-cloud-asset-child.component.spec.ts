import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VotmCloudAssetChildComponent } from './votm-cloud-asset-child.component';

describe('VotmCloudAssetChildComponent', () => {
  let component: VotmCloudAssetChildComponent;
  let fixture: ComponentFixture<VotmCloudAssetChildComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VotmCloudAssetChildComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VotmCloudAssetChildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
