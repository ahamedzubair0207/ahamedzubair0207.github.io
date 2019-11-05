import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetTrendComponent } from './widget-trend.component';

describe('WidgetTrendComponent', () => {
  let component: WidgetTrendComponent;
  let fixture: ComponentFixture<WidgetTrendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WidgetTrendComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WidgetTrendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
