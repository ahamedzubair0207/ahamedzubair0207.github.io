import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VotmLiveDataComponent } from './votm-live-data.component';

describe('VotmLiveDataComponent', () => {
  let component: VotmLiveDataComponent;
  let fixture: ComponentFixture<VotmLiveDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VotmLiveDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VotmLiveDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
