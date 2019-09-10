import { TestBed } from '@angular/core/testing';

import { AssetsService } from './assets.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';

describe('AssetsService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      RouterTestingModule,
      HttpClientModule
    ]
  }));

  it('should be created', () => {
    const service: AssetsService = TestBed.get(AssetsService);
    expect(service).toBeTruthy();
  });
});
