import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VotmCloudLocationsCreateComponent } from './votm-cloud-locations-create.component';
import { FormsModule } from '@angular/forms';

describe('VotmCloudLocationsCreateComponent', () => {
  let component: VotmCloudLocationsCreateComponent;
  let fixture: ComponentFixture<VotmCloudLocationsCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [VotmCloudLocationsCreateComponent]
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
