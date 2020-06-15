import { TestBed, fakeAsync, tick, flush, flushMicrotasks } from '@angular/core/testing';

import { AuthGuard } from './auth.guard';
import { FakeOidcService } from './fake-oidc.service';
import { of, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let oidc: FakeOidcService;

  const oidcSpy: jasmine.SpyObj<FakeOidcService> = jasmine.createSpyObj(
    'FakeOidcService',
    ['authorize', 'deAuthorize', 'isAuthorized']
  );

  const mockRouter = {
    navigate: jasmine.createSpy('navigate')
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        { provide: Router, useValue: mockRouter }
      ]
    });
    guard = TestBed.inject(AuthGuard);
    
    oidc = TestBed.inject(FakeOidcService) as jasmine.SpyObj<FakeOidcService>;
    oidc.authorize = jasmine.createSpy('authorize').and.callFake(() => {});
    oidc.deAuthorize = jasmine.createSpy('deAuthorize').and.callFake(() => {});
    mockRouter.navigate.calls.reset();
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  describe('#canActivate', () => {
    it('redirects unauthorized users', fakeAsync(() => {
      oidc.isAuthorized = jasmine.createSpy('isAuthorized').and.returnValue(of(false));
      (<Observable<boolean>> guard.canActivate(null, null)).pipe(
        tap((result) => {
          expect(result).toBeFalse();
          expect(mockRouter.navigate).toHaveBeenCalledWith(['auth']);
        })
      ).subscribe();
      
      tick();

      flushMicrotasks();
    }));

    it('does not redirect authorized users', fakeAsync(() => {
      oidc.isAuthorized = jasmine.createSpy('isAuthorized').and.returnValue(of(true));
      (<Observable<boolean>> guard.canActivate(null, null)).pipe(
        tap((result) => {
          expect(result).toBeTrue();
          expect(mockRouter.navigate).not.toHaveBeenCalled();
        })
      ).subscribe();
      
      tick();

      flushMicrotasks();
    }));
  });
});
