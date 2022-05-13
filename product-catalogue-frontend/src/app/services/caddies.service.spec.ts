import { TestBed } from '@angular/core/testing';

import { CaddiesService } from './caddies.service';

describe('CaddiesService', () => {
  let service: CaddiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CaddiesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
