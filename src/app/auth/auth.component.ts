import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FakeOidcService } from '../fake-oidc.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  public loginForm: FormGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  public constructor(private oidcService: FakeOidcService, private router: Router) { }
  public ngOnInit(): void { }

  public validateLogin() {
    if (!this.loginForm.valid) {
      // A cheap way to display the error state in this specific case.
      // Would want a more sophisticated error message system for a real login page
      this.loginForm.markAllAsTouched(); 
      return;
    }

    this.oidcService?.authorize();
    this.router.navigate(['']);
  }
}
