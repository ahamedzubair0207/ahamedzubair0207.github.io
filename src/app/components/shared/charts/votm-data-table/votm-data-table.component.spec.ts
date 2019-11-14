import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VotmDataTableComponent } from './votm-data-table.component';

describe('VotmDataTableComponent', () => {
  let component: VotmDataTableComponent;
  let fixture: ComponentFixture<VotmDataTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VotmDataTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VotmDataTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
