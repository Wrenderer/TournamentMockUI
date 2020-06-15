import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import { RouterTestingModule } from '@angular/router/testing';
import { FakeOidcService } from '../fake-oidc.service';
import { Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({selector: '', template: '', styles: ['']})
class MockComponent {}

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
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
      imports: [ ],
      declarations: [ DashboardComponent ],
      providers: [
        { provide: FakeOidcService, useValue: oidcSpy },
        { provide: Router, useValue: mockRouter }
      ]
    })
    .compileComponents().then(() => {
      oidc = TestBed.inject(FakeOidcService) as jasmine.SpyObj<FakeOidcService>;
      oidc.authorize = jasmine.createSpy('authorize').and.callFake(() => {});
      oidc.deAuthorize = jasmine.createSpy('deAuthorize').and.callFake(() => {});
      oidc.isAuthorized = jasmine.createSpy('isAuthorized').and.returnValue(true);
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#logout', () => {
    it('should end the session and send the user to the login page', () => {
      expect(oidc.deAuthorize).not.toHaveBeenCalled();
      expect(mockRouter.navigate).not.toHaveBeenCalled();
      component.logout();
      expect(oidc.deAuthorize).toHaveBeenCalled();
      expect(mockRouter.navigate).toHaveBeenCalled();
    });
  });
});
