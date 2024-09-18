import { TestBed } from '@angular/core/testing';

import { NAMKUBAPIService } from './namkub-api.service';

describe('NAMKUBAPIService', () => {
  let service: NAMKUBAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NAMKUBAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
