import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VotmCloudViewsHomeComponent } from './votm-cloud-views-home.component';

describe('VotmCloudViewsHomeComponent', () => {
  let component: VotmCloudViewsHomeComponent;
  let fixture: ComponentFixture<VotmCloudViewsHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VotmCloudViewsHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VotmCloudViewsHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
