import { TestBed } from '@angular/core/testing';

import { AlertsService } from './alerts.service';
import { HttpClientModule } from '@angular/common/http';

describe('AlertsService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientModule],
  }));

  it('should be created', () => {
    const service: AlertsService = TestBed.get(AlertsService);
    expect(service).toBeTruthy();
  });
});
