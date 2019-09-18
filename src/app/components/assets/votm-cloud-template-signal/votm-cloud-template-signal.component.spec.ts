import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { VotomCloudTemplateSignalComponent } from './votm-cloud-template-signal.component';


describe('VotomCloudTemplateSignalComponent', () => {
  let component: VotomCloudTemplateSignalComponent;
  let fixture: ComponentFixture<VotomCloudTemplateSignalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VotomCloudTemplateSignalComponent ]
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
