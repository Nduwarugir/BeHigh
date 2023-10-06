import { TestBed } from '@angular/core/testing';

import { NetworkScanService } from './network-scan.service';

describe('NetworkScanService', () => {
  let service: NetworkScanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NetworkScanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
