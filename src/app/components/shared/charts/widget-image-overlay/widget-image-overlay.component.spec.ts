import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetImageOverlayComponent } from './widget-image-overlay.component';

describe('WidgetImageOverlayComponent', () => {
  let component: WidgetImageOverlayComponent;
  let fixture: ComponentFixture<WidgetImageOverlayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WidgetImageOverlayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WidgetImageOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
