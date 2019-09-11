import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VotmCloudAssetsHomeComponent } from './votm-cloud-assets-home.component';

describe('VotmCloudAssetsHomeComponent', () => {
  let component: VotmCloudAssetsHomeComponent;
  let fixture: ComponentFixture<VotmCloudAssetsHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VotmCloudAssetsHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VotmCloudAssetsHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
