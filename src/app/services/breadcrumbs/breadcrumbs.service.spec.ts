import { TestBed } from '@angular/core/testing';

import { BreadcrumbsService } from './breadcrumbs.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';

describe('BreadcrumbsService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      RouterTestingModule,
      HttpClientModule
    ],
  }));

  it('should be created', () => {
    const service: BreadcrumbsService = TestBed.get(BreadcrumbsService);
    expect(service).toBeTruthy();
  });
});
