import { TestBed, fakeAsync, tick, flushMicrotasks } from '@angular/core/testing';

import { FakeOidcService } from './fake-oidc.service';
import { WebStorageService } from 'ngx-webstorage-service';
import { pairwise, tap, skip } from 'rxjs/operators';
import { serialize } from 'v8';

describe('FakeOidcServiceService', () => {
  let service: FakeOidcService;
  let storageSpy: jasmine.SpyObj<WebStorageService>;
  let storage: WebStorageService;

  beforeEach(() => {
    storageSpy = jasmine.createSpyObj('WebStorageService', ['get', 'set', 'remove']);
    TestBed.configureTestingModule({
      providers: [
        {provide: WebStorageService, useValue: storageSpy}
      ]
    });

    service = TestBed.inject(FakeOidcService);
    storage = TestBed.inject(WebStorageService) as jasmine.SpyObj<WebStorageService>;
    storage.get = jasmine.createSpy('get').and.returnValue(false);
    storage.set = jasmine.createSpy('set').and.callFake(() => {});
    storage.remove = jasmine.createSpy('remove').and.callFake(() => {});
    service.deAuthorize();// Set default state before tests watch
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#authorize', () => {
    it('will change an unauthorized user to authorized', fakeAsync(() => {
      service.isAuthorized().pipe(
        pairwise(),
        tap((beforeAndAfter) => {
          expect(beforeAndAfter[0]).toBe(false);
          expect(beforeAndAfter[1]).toBe(true);
        })
      ).subscribe();
      service.authorize();
      
      tick();

      flushMicrotasks();
    }));

    it('is idempotent', fakeAsync(() => {
      service.isAuthorized().pipe(
        skip(1),// Skip the initial false value
        pairwise(),
        tap((beforeAndAfter) => {
          expect(beforeAndAfter[0]).toBe(true);
          expect(beforeAndAfter[1]).toBe(true);
        })
      ).subscribe();
      service.authorize();
      tick();
      service.authorize();
      tick();

      flushMicrotasks();
    }));
  });

  describe('#deAuthorize', () => {
    it('will change an authorized user to unauthorized', fakeAsync(() => {
      service.isAuthorized().pipe(
        skip(1), // Skip the initial false value
        pairwise(),
        tap((beforeAndAfter) => {
          expect(beforeAndAfter[0]).toBe(true);
          expect(beforeAndAfter[1]).toBe(false);
        })
      ).subscribe();
      service.authorize();
      service.deAuthorize();
      
      tick();

      flushMicrotasks();
    }));

    it('is idempotent', fakeAsync(() => {
      service.isAuthorized().pipe(
        pairwise(),
        tap((beforeAndAfter) => {
          expect(beforeAndAfter[0]).toBe(false);
          expect(beforeAndAfter[1]).toBe(false);
        })
      ).subscribe();
      service.deAuthorize();
      tick();

      flushMicrotasks();
    }));
  });

  // At this point #isAuthorized is implicitly tested via the prior tests. This can change in the future though.
});
