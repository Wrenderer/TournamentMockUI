import { TestBed, async, ComponentFixture, fakeAsync, tick, flushMicrotasks } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { Title } from '@angular/platform-browser';
import { Router, NavigationEnd, Routes } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: '',
  template: '',
  styles: ['']
})
class MockComponent {}

describe('AppComponent', () => {
  let titleSpy: jasmine.SpyObj<Title>;
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let title: Title;

  

  const testRoutes: Routes = [
    {
      path: 'routeOne',
      component: MockComponent
    },
    {
      path: 'parentWithChild',
      component: MockComponent,
      children: [
        {
          path: 'childOfParent',
          component: MockComponent
        }
      ]
    }
  ];

  beforeEach(async(() => {
    titleSpy = jasmine.createSpyObj('Title', ['setTitle']);
    
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes(testRoutes)
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        {provide: Title, use: titleSpy}
      ]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(AppComponent);
      component = fixture.componentInstance;
      title = TestBed.inject(Title) as jasmine.SpyObj<Title>;
      spyOn(title, 'setTitle').and.callThrough();
    });
  }));

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  describe('#ngOnInit', () => {
    it('sets a default title', fakeAsync(() => {
      expect(title.setTitle).not.toHaveBeenCalled();
      component.ngOnInit();
      TestBed.get(Router).events.next(new NavigationEnd(1, 'fake', 'fake'));
      tick();

      // Do not create a brittle test by restricting what the default can be
      // just test that there is one
      expect(title.setTitle).toHaveBeenCalled();
      expect(title.setTitle).not.toHaveBeenCalledWith(null);
      expect(title.setTitle).not.toHaveBeenCalledWith(undefined);

      flushMicrotasks();
    }));

    it('sets a proper title based on parent route', fakeAsync(() => {
      expect(title.setTitle).not.toHaveBeenCalled();
      component.ngOnInit();
      TestBed.get(Router).navigate(['routeOne']);
      TestBed.get(Router).events.next(new NavigationEnd(1, 'fake', 'fake'));
      tick();

      // Do not create a brittle test by restricting what the title can be, but do test it contains the pertinent info
      expect(title.setTitle).toHaveBeenCalledWith(jasmine.stringMatching('routeOne'));
      
      flushMicrotasks();
    }));

    it('sets a proper title based on child route', fakeAsync(() => {
      expect(title.setTitle).not.toHaveBeenCalled();
      component.ngOnInit();
      TestBed.get(Router).navigate(['parentWithChild/childOfParent']);
      TestBed.get(Router).events.next(new NavigationEnd(1, 'fake', 'fake'));
      tick();

      // Do not create a brittle test by restricting what the title can be, but do test it contains the pertinent info
      expect(title.setTitle).toHaveBeenCalledWith(jasmine.stringMatching('childOfParent'));
      expect(title.setTitle).not.toHaveBeenCalledWith(jasmine.stringMatching('parentWithChild'));
      
      flushMicrotasks();
    }));
  });
});
