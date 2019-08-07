import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VotmLineGraphComponent } from './votm-line-graph.component';

describe('VotmLineGraphComponent', () => {
  let component: VotmLineGraphComponent;
  let fixture: ComponentFixture<VotmLineGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VotmLineGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VotmLineGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
