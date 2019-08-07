import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VotmSimpleGaugeComponent } from './votm-simple-gauge.component';

describe('VotmSimpleGaugeComponent', () => {
  let component: VotmSimpleGaugeComponent;
  let fixture: ComponentFixture<VotmSimpleGaugeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VotmSimpleGaugeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VotmSimpleGaugeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
