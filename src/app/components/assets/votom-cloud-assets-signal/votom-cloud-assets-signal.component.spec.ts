import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VotomCloudAssetsSignalComponent } from './votom-cloud-assets-signal.component';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

describe('VotomCloudAssetsSignalComponent', () => {
  let component: VotomCloudAssetsSignalComponent;
  let fixture: ComponentFixture<VotomCloudAssetsSignalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [VotomCloudAssetsSignalComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VotomCloudAssetsSignalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
