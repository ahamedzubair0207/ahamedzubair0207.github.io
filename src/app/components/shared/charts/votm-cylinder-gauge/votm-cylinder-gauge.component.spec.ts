import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VotmCylinderGaugeComponent } from './votm-cylinder-gauge.component';

describe('VotmCylinderGaugeComponent', () => {
  let component: VotmCylinderGaugeComponent;
  let fixture: ComponentFixture<VotmCylinderGaugeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VotmCylinderGaugeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VotmCylinderGaugeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
