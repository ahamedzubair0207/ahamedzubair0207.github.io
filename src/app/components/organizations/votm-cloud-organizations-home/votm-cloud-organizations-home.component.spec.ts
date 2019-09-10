import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VotmCloudOrganizationsHomeComponent } from './votm-cloud-organizations-home.component';
import { RouterTestingModule } from '@angular/router/testing';
import { VotmCloudConfimDialogComponent } from '../../shared/votm-cloud-confim-dialog/votm-cloud-confim-dialog.component';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';

describe('VotmCloudOrganizationsHomeComponent', () => {
  let component: VotmCloudOrganizationsHomeComponent;
  let fixture: ComponentFixture<VotmCloudOrganizationsHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule, ToastrModule.forRoot()],
      declarations: [VotmCloudOrganizationsHomeComponent, VotmCloudConfimDialogComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VotmCloudOrganizationsHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
