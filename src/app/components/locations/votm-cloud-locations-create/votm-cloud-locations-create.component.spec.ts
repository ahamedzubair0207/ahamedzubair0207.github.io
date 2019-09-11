import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VotmCloudLocationsCreateComponent } from './votm-cloud-locations-create.component';

describe('VotmCloudLocationsCreateComponent', () => {
  let component: VotmCloudLocationsCreateComponent;
  let fixture: ComponentFixture<VotmCloudLocationsCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VotmCloudLocationsCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VotmCloudLocationsCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
