import { TestBed } from '@angular/core/testing';

import { LocationSignalService } from './location-signal.service';

describe('LocationSignalService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LocationSignalService = TestBed.get(LocationSignalService);
    expect(service).toBeTruthy();
  });
});
