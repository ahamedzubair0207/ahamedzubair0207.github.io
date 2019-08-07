import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VotmTwoAxesGaugeComponent } from './votm-two-axes-gauge.component';

describe('VotmTwoAxesGaugeComponent', () => {
  let component: VotmTwoAxesGaugeComponent;
  let fixture: ComponentFixture<VotmTwoAxesGaugeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VotmTwoAxesGaugeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VotmTwoAxesGaugeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
