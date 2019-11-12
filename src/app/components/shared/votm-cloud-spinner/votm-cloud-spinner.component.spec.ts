import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VotmCloudSpinnerComponent } from './votm-cloud-spinner.component';

describe('VotmCloudSpinnerComponent', () => {
  let component: VotmCloudSpinnerComponent;
  let fixture: ComponentFixture<VotmCloudSpinnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VotmCloudSpinnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VotmCloudSpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
