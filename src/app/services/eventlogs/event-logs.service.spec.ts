import { TestBed } from '@angular/core/testing';

import { EventLogsService } from './event-logs.service';

describe('EventLogsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EventLogsService = TestBed.get(EventLogsService);
    expect(service).toBeTruthy();
  });
});
