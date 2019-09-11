import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VotmCloudLoginComponent } from './votm-cloud-login.component';

describe('VotmCloudLoginComponent', () => {
  let component: VotmCloudLoginComponent;
  let fixture: ComponentFixture<VotmCloudLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VotmCloudLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VotmCloudLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
