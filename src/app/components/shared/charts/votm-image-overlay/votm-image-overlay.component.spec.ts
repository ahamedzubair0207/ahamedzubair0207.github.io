import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VotmImageOverlayComponent } from './votm-image-overlay.component';

describe('VotmImageOverlayComponent', () => {
  let component: VotmImageOverlayComponent;
  let fixture: ComponentFixture<VotmImageOverlayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VotmImageOverlayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VotmImageOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
