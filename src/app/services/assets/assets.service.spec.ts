import { TestBed } from '@angular/core/testing';

import { AssetsService } from './assets.service';
import { HttpClientModule } from '@angular/common/http';

describe('AssetsService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientModule],
    providers: [AssetsService]
  }));

  it('should be created', () => {
    const service: AssetsService = TestBed.get(AssetsService);
    expect(service).toBeTruthy();
  });
});
