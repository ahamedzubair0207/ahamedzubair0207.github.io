import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { VotomCloudTemplateSignalComponent } from './votm-cloud-template-signal.component';
import { OverlayPanel } from 'primeng/overlaypanel';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';


describe('VotomCloudTemplateSignalComponent', () => {
  let component: VotomCloudTemplateSignalComponent;
  let fixture: ComponentFixture<VotomCloudTemplateSignalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[RouterTestingModule, HttpClientModule],
      declarations: [ VotomCloudTemplateSignalComponent, OverlayPanel]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VotomCloudTemplateSignalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
