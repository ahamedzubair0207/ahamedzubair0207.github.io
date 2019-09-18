import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VotmCloudSideMenuComponent } from './votm-cloud-side-menu.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('VotmCloudSideMenuComponent', () => {
  let component: VotmCloudSideMenuComponent;
  let fixture: ComponentFixture<VotmCloudSideMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [VotmCloudSideMenuComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VotmCloudSideMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
