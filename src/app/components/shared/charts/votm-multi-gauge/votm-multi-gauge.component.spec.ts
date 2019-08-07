import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VotmMultiGaugeComponent } from './votm-multi-gauge.component';

describe('VotmMultiGaugeComponent', () => {
  let component: VotmMultiGaugeComponent;
  let fixture: ComponentFixture<VotmMultiGaugeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VotmMultiGaugeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VotmMultiGaugeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
