import { TestBed } from '@angular/core/testing';

import { OrganizationService } from './organization.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';

describe('OrganizationService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      RouterTestingModule,
      HttpClientModule
    ]
  }));

  it('should be created', () => {
    const service: OrganizationService = TestBed.get(OrganizationService);
    expect(service).toBeTruthy();
  });
});
