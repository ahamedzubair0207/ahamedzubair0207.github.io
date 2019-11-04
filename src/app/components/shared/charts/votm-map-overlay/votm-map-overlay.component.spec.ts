import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VotmMapOverlayComponent } from './votm-map-overlay.component';

describe('VotmMapOverlayComponent', () => {
  let component: VotmMapOverlayComponent;
  let fixture: ComponentFixture<VotmMapOverlayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VotmMapOverlayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VotmMapOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
