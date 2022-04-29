import { TestBed } from '@angular/core/testing';

import { CaddyService } from './caddy.service';

describe('CaddyService', () => {
  let service: CaddyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CaddyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
