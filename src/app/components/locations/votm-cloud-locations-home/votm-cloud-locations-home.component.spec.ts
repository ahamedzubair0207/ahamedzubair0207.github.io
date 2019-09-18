import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VotmCloudLocationsHomeComponent } from './votm-cloud-locations-home.component';
import { RouterTestingModule } from '@angular/router/testing';
import { VotmCloudConfimDialogComponent } from '../../shared/votm-cloud-confim-dialog/votm-cloud-confim-dialog.component';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';

describe('VotmCloudLocationsHomeComponent', () => {
  let component: VotmCloudLocationsHomeComponent;
  let fixture: ComponentFixture<VotmCloudLocationsHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule, ToastrModule.forRoot()],
      declarations: [VotmCloudLocationsHomeComponent, VotmCloudConfimDialogComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VotmCloudLocationsHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
