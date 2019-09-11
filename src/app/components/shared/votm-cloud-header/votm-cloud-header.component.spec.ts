import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VotmCloudHeaderComponent } from './votm-cloud-header.component';

describe('VotmCloudHeaderComponent', () => {
  let component: VotmCloudHeaderComponent;
  let fixture: ComponentFixture<VotmCloudHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VotmCloudHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VotmCloudHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
