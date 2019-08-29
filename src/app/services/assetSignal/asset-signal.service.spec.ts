import { TestBed } from '@angular/core/testing';

import { AssetSignalService } from './asset-signal.service';

describe('AssetSignalService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AssetSignalService = TestBed.get(AssetSignalService);
    expect(service).toBeTruthy();
  });
});
