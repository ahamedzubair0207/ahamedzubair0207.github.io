import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VotmCloudCharValidatorComponent } from './votm-cloud-char-validator.component';

describe('VotmCloudCharValidatorComponent', () => {
  let component: VotmCloudCharValidatorComponent;
  let fixture: ComponentFixture<VotmCloudCharValidatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VotmCloudCharValidatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VotmCloudCharValidatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
