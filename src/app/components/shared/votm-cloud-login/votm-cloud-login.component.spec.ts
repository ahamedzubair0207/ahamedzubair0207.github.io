import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VotmCloudLoginComponent } from './votm-cloud-login.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

describe('VotmCloudLoginComponent', () => {
  let component: VotmCloudLoginComponent;
  let fixture: ComponentFixture<VotmCloudLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [VotmCloudLoginComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VotmCloudLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
