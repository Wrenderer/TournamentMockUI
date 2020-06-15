import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { filter, map, tap, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  // Not *particularly* necessary here, but as convention, any manually subscribed observables get this safeguard to unsubscribe on destroy
  private readonly unsubSubject: Subject<void> = new Subject<void>();

  public constructor( private router: Router, private titleService: Title) {}

  public ngOnInit() {
    this.setTitle();
  }

  /**
   * setTitle implementation inspired (but greatly modified from) https://stackoverflow.com/questions/47900447/how-to-change-page-title-with-routing-in-angular-application
   */
  private setTitle() {
    this.router?.events?.pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => this.router),
        tap((event) => {
          const title = this.makeTitle(this.router.routerState, this.router.routerState.root).join(' - ');
          this.titleService.setTitle(title);
        }),
        takeUntil(this.unsubSubject)
      ).subscribe();
  }


  private makeTitle(state, parent) {
    const data = [];
    if (parent?.snapshot.data?.title) {
      data.push(parent.snapshot.data.title);
    }

    if (state && parent) {
      data.push(... this.makeTitle(state, state.firstChild(parent)));
    }
    return data.length > 0 ? data : ['Tournament Analysis System'];
  }

  public ngOnDestroy() {
    this.unsubSubject.next();
    this.unsubSubject.complete();
  }
}
