import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { VotmCloudAssetsHomeComponent } from './votm-cloud-assets-home.component';
import { VotmCloudConfimDialogComponent } from '../../shared/votm-cloud-confim-dialog/votm-cloud-confim-dialog.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule } from 'ngx-toastr';

describe('VotmCloudAssetsHomeComponent', () => {
  let component: VotmCloudAssetsHomeComponent;
  let fixture: ComponentFixture<VotmCloudAssetsHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, RouterTestingModule, ToastrModule.forRoot()],
      declarations: [VotmCloudAssetsHomeComponent, VotmCloudConfimDialogComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VotmCloudAssetsHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
