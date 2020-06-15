import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { filter, map, tap, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { last } from 'lodash';

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
        tap((event) => console.log(event)),
        filter((event) => event instanceof NavigationEnd),
        map(() => this.router),
        tap((event) => {
          let title = 'Tournament Analysis System';
          const subtitle = last(this.router?.url?.split('/') || ['']);
          title = (subtitle.length > 0) ? title + ' - ' + subtitle: title;
          this.titleService.setTitle(title);
        }),
        takeUntil(this.unsubSubject)
      ).subscribe();
  }

  public ngOnDestroy() {
    this.unsubSubject.next();
    this.unsubSubject.complete();
  }
}
