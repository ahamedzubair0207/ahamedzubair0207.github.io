import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VotmCloudSitesHomeComponent } from './votm-cloud-sites-home.component';

describe('VotmCloudSitesHomeComponent', () => {
  let component: VotmCloudSitesHomeComponent;
  let fixture: ComponentFixture<VotmCloudSitesHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VotmCloudSitesHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VotmCloudSitesHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
