import { TestBed } from '@angular/core/testing';

import { FakeOidcService } from './fake-oidc.service';

describe('FakeOidcServiceService', () => {
  let service: FakeOidcService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FakeOidcService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
