import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VotmAnimatedGaugeComponent } from './votm-animated-gauge.component';

describe('VotmAnimatedGaugeComponent', () => {
  let component: VotmAnimatedGaugeComponent;
  let fixture: ComponentFixture<VotmAnimatedGaugeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VotmAnimatedGaugeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VotmAnimatedGaugeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
