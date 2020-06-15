import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthComponent } from './auth.component';
import { RouterTestingModule } from '@angular/router/testing';
import { FakeOidcService } from '../fake-oidc.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';

describe('AuthComponent', () => {
  let component: AuthComponent;
  let fixture: ComponentFixture<AuthComponent>;
  let oidc: FakeOidcService;

  const oidcSpy: jasmine.SpyObj<FakeOidcService> = jasmine.createSpyObj(
    'FakeOidcService',
    ['authorize', 'deAuthorize', 'isAuthorized']
  );

  const mockRouter = {
    navigate: jasmine.createSpy('navigate')
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule ],
      declarations: [ AuthComponent ],
      providers: [
        { provide: FakeOidcService, useValue: oidcSpy },
        { provide: Router, useValue: mockRouter }
      ]
    })
    .compileComponents().then(() => {
      oidc = TestBed.inject(FakeOidcService) as jasmine.SpyObj<FakeOidcService>;
      oidc.authorize = jasmine.createSpy('authorize').and.callFake(() => {});
      oidc.deAuthorize = jasmine.createSpy('deAuthorize').and.callFake(() => {});
      oidc.isAuthorized = jasmine.createSpy('isAuthorized').and.returnValue(of(true));
      mockRouter.navigate.calls.reset();
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#validateLogin', () => {
    it('rejects invalid form submissions', () => {
      component.loginForm.setValue({
        username: '',
        password: ''
      });

      component.loginForm.updateValueAndValidity();
      expect(component.loginForm.valid).toBeFalse();

      expect(oidc.authorize).not.toHaveBeenCalled();
      expect(mockRouter.navigate).not.toHaveBeenCalled();
      
      component.validateLogin();
      
      expect(oidc.authorize).not.toHaveBeenCalled();
      expect(mockRouter.navigate).not.toHaveBeenCalled();
    });

    it('logs a user in on valid form submissions', () => {
      component.loginForm.setValue({
        username: 'valid',
        password: 'valid'
      });

      component.loginForm.updateValueAndValidity();
      expect(component.loginForm.valid).toBeTrue();

      expect(oidc.authorize).not.toHaveBeenCalled();
      expect(mockRouter.navigate).not.toHaveBeenCalled();
      
      component.validateLogin();
      
      expect(oidc.authorize).toHaveBeenCalled();
      expect(mockRouter.navigate).toHaveBeenCalledWith(['']);
    });
  });
});
