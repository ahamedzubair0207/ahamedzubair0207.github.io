import { TestBed } from '@angular/core/testing';

import { BreadcrumbsService } from './breadcrumbs.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

describe('BreadcrumbsService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [     
      HttpClientModule,
      RouterTestingModule
    ]
  }));

  it('should be created', () => {
    const service: BreadcrumbsService = TestBed.get(BreadcrumbsService);
    expect(service).toBeTruthy();
  });
});
