import { TestBed } from '@angular/core/testing';

import { DerivedSignalService } from './derived-signal.service';

describe('DerivedSignalService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DerivedSignalService = TestBed.get(DerivedSignalService);
    expect(service).toBeTruthy();
  });
});
