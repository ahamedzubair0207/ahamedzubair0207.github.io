import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VotmCloudConfimDialogComponent } from './votm-cloud-confim-dialog.component';

describe('VotmCloudConfimDialogComponent', () => {
  let component: VotmCloudConfimDialogComponent;
  let fixture: ComponentFixture<VotmCloudConfimDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VotmCloudConfimDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VotmCloudConfimDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
