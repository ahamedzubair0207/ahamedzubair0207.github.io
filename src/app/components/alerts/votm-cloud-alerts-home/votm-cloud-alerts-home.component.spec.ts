import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VotmCloudAlertsHomeComponent } from './votm-cloud-alerts-home.component';
import { RouterTestingModule } from '@angular/router/testing';
import { VotmCloudConfimDialogComponent } from '../../shared/votm-cloud-confim-dialog/votm-cloud-confim-dialog.component';

describe('VotmCloudAlertsHomeComponent', () => {
  let component: VotmCloudAlertsHomeComponent;
  let fixture: ComponentFixture<VotmCloudAlertsHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [VotmCloudAlertsHomeComponent, VotmCloudConfimDialogComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VotmCloudAlertsHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
