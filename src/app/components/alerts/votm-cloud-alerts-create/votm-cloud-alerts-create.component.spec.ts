import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VotmCloudAlertsCreateComponent } from './votm-cloud-alerts-create.component';
import { FormsModule } from '@angular/forms';
import { Select2Module } from 'ng2-select2';

describe('VotmCloudAlertsCreateComponent', () => {
  let component: VotmCloudAlertsCreateComponent;
  let fixture: ComponentFixture<VotmCloudAlertsCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, Select2Module],
      declarations: [VotmCloudAlertsCreateComponent]
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
