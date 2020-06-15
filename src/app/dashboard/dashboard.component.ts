import { Component, OnInit } from '@angular/core';
import { FakeOidcService } from '../fake-oidc.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public readonly appTitleDefault:string = 'Tournament Analysis System';

  public constructor(private oidcService: FakeOidcService, private router: Router) { }

  public ngOnInit(): void { }

  public logout() {
    this.oidcService.deAuthorize();
    this.router.navigate(['auth']);
  }
}
