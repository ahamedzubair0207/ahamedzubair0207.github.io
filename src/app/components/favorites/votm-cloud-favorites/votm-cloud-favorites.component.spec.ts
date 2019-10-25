import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VotmCloudFavoritesComponent } from './votm-cloud-favorites.component';

describe('VotmCloudFavoritesComponent', () => {
  let component: VotmCloudFavoritesComponent;
  let fixture: ComponentFixture<VotmCloudFavoritesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VotmCloudFavoritesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VotmCloudFavoritesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
