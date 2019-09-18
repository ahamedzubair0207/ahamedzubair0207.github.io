import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VotmCloudAlertsCreateComponent } from './votm-cloud-alerts-create.component';
import { FormsModule } from '@angular/forms';

describe('VotmCloudAlertsCreateComponent', () => {
  let component: VotmCloudAlertsCreateComponent;
  let fixture: ComponentFixture<VotmCloudAlertsCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [ VotmCloudAlertsCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VotmCloudAlertsCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
