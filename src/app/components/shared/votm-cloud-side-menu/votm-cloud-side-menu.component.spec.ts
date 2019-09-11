import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VotmCloudSideMenuComponent } from './votm-cloud-side-menu.component';

describe('VotmCloudSideMenuComponent', () => {
  let component: VotmCloudSideMenuComponent;
  let fixture: ComponentFixture<VotmCloudSideMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VotmCloudSideMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VotmCloudSideMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
