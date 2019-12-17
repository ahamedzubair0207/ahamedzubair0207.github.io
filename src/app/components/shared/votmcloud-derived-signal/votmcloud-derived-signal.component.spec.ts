import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VotmcloudDerivedSignalComponent } from './votmcloud-derived-signal.component';

describe('VotmcloudDerivedSignalComponent', () => {
  let component: VotmcloudDerivedSignalComponent;
  let fixture: ComponentFixture<VotmcloudDerivedSignalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VotmcloudDerivedSignalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VotmcloudDerivedSignalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
