import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VotmCloudValidatorComponent } from './votm-cloud-validator.component';

describe('VotmCloudValidatorComponent', () => {
  let component: VotmCloudValidatorComponent;
  let fixture: ComponentFixture<VotmCloudValidatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VotmCloudValidatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VotmCloudValidatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
