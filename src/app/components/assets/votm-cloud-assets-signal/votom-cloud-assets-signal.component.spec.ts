import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VotomCloudAssetsSignalComponent } from './votom-cloud-assets-signal.component';
import { OverlayPanel } from 'primeng/overlaypanel';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';

describe('VotomCloudAssetsSignalComponent', () => {
  let component: VotomCloudAssetsSignalComponent;
  let fixture: ComponentFixture<VotomCloudAssetsSignalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule],
      declarations: [VotomCloudAssetsSignalComponent, OverlayPanel]
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
