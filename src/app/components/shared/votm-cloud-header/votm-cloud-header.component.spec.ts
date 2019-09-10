import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VotmCloudHeaderComponent } from './votm-cloud-header.component';
import { BreadcrumbsComponent } from '../breadcrumbs/breadcrumbs.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';

describe('VotmCloudHeaderComponent', () => {
  let component: VotmCloudHeaderComponent;
  let fixture: ComponentFixture<VotmCloudHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule
      ],
      declarations: [VotmCloudHeaderComponent, BreadcrumbsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VotmCloudHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
