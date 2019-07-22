import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VotmCloudSitesCreateComponent } from './votm-cloud-sites-create.component';

describe('VotmCloudSitesCreateComponent', () => {
  let component: VotmCloudSitesCreateComponent;
  let fixture: ComponentFixture<VotmCloudSitesCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VotmCloudSitesCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VotmCloudSitesCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
