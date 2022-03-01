import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';

import { UserService } from '@app/services/user.service';
import { UserLogin } from '@app/models/UserLogin';
import { FacebookLoginProvider, GoogleLoginProvider, SocialAuthService, SocialUser } from 'angularx-social-login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  model = {} as UserLogin;

  get f(): any {
    return this.form.controls;
  }

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private toastr: ToastrService,
    private socialAuthService: SocialAuthService
  ) { }

  ngOnInit() {
    this.validatitonForm();
  }

  public validatitonForm(): void {
    this.form = this.fb.group({
      userName: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  public login(): void {
    this.userService.login(this.model).subscribe({
      next: () => { this.router.navigateByUrl('/tasks'); },
      error: (error: any) => {
        console.log(this.model);
        if (error.status == 401)
          this.toastr.error('Invalid Email or Password!');
        else
          console.error(error);
      }
    });
  }

  loginWithSocial(socialName: string) {
    if (socialName === 'google') { this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID) }
    if (socialName === 'facebook') { this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID) }

    this.socialAuthService.authState.subscribe({
      next: (response) => { 
        this.model.userName = response.email;
        this.model.password = response.id;

        this.login();
      },
      error: (error: any) => {
        console.error(error);
      }
    });
  }

}
