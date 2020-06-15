import { Injectable, Inject } from '@angular/core';
import { ReplaySubject, Observable } from 'rxjs';
import { WebStorageService, SESSION_STORAGE } from 'ngx-webstorage-service';

@Injectable({
  providedIn: 'root'
})
export class FakeOidcService {
  private readonly fakeAuthorizationTokenSubject$: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);
  private readonly sessionStorageKey: string = 'fakeOidcToken';

  public constructor(@Inject(SESSION_STORAGE) private sessionStorage: WebStorageService) {
    const token = sessionStorage.get(this.sessionStorageKey);
    this.fakeAuthorizationTokenSubject$.next(!!token);
  }

  public authorize() {
    this.sessionStorage.set(this.sessionStorageKey, {});
    this.fakeAuthorizationTokenSubject$.next(true);
  }

  public deAuthorize() {
    this.sessionStorage.remove(this.sessionStorageKey);
    this.fakeAuthorizationTokenSubject$.next(false);
  }

  public isAuthorized(): Observable<boolean> {
    return this.fakeAuthorizationTokenSubject$.asObservable();
  }
}
