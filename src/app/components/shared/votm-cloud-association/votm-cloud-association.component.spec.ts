import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VotmCloudAssociationComponent } from './votm-cloud-association.component';

describe('VotmCloudAssociationComponent', () => {
  let component: VotmCloudAssociationComponent;
  let fixture: ComponentFixture<VotmCloudAssociationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VotmCloudAssociationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VotmCloudAssociationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
