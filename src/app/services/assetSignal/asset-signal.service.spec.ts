import { TestBed } from '@angular/core/testing';

import { AssetSignalService } from './asset-signal.service';
import { HttpClientModule } from '@angular/common/http';

describe('AssetSignalService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientModule]
  }));

  it('should be created', () => {
    const service: AssetSignalService = TestBed.get(AssetSignalService);
    expect(service).toBeTruthy();
  });
});
