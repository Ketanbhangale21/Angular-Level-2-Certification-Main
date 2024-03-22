import { TestBed } from '@angular/core/testing';

import { ApiGateService } from './api-gate.service';

describe('ApiGateService', () => {
  let service: ApiGateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiGateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
