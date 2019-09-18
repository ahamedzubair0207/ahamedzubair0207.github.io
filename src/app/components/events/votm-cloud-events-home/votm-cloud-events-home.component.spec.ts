import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VotmCloudEventsHomeComponent } from './votm-cloud-events-home.component';
import { FormsModule } from '@angular/forms';

describe('VotmCloudEventsHomeComponent', () => {
  let component: VotmCloudEventsHomeComponent;
  let fixture: ComponentFixture<VotmCloudEventsHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [VotmCloudEventsHomeComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VotmCloudEventsHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
