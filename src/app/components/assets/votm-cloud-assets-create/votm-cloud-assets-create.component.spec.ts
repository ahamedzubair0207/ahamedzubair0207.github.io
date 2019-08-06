import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VotmCloudAssetsCreateComponent } from './votm-cloud-assets-create.component';

describe('VotmCloudAssetsCreateComponent', () => {
  let component: VotmCloudAssetsCreateComponent;
  let fixture: ComponentFixture<VotmCloudAssetsCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VotmCloudAssetsCreateComponent ]
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
