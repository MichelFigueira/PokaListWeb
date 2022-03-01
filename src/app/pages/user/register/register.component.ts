import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ValidatorField } from '@app/helpers/ValidatorField';
import { UserService } from '@app/services/user.service';
import { User } from '@app/models/User';
import { FacebookLoginProvider, GoogleLoginProvider, SocialAuthService } from 'angularx-social-login';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  user = {} as User;
  form: FormGroup;

  get f(): any {
    return this.form.controls;
  }

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private socialAuthService: SocialAuthService,
    private toastr: ToastrService,
    private translate: TranslateService
  ) { }

  ngOnInit() {
    this.validatitonForm();
  }

  public validatitonForm(): void {

    const formOptions: AbstractControlOptions = {
      validators: ValidatorField.mustMatch('password', 'confirmPassword')
    };

    this.form = this.fb.group({
      name: ['', Validators.required],
      userName: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      defaultData: [''],
      privacyPolicy: ['', Validators.requiredTrue]
    }, formOptions);

    this.form.patchValue({defaultData: true});
  }

  register(): void {
    this.user = { ...this.form.value}
    this.userService.register(this.user).subscribe({
      complete: () => this.router.navigateByUrl('/tasks'),
      error: (error:any) => {
        if (error.status == 400)
        this.translate.get('TOASTR.USER_EXIST').subscribe((res: string) => {
          this.toastr.error(res);
        })
        else console.log(error);
      }
    });
  }

  registerWithSocial(socialName: string) {
    if (socialName === 'google') { this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID) }
    if (socialName === 'facebook') { this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID) }

    this.socialAuthService.authState.subscribe({
      next: (response) => { 
        this.user.name = response.name;
        this.user.userName = response.email;
        this.user.photoURL = response.photoUrl;
        this.user.password = response.id;
        this.user.socialLogin = true;
        this.user.defaultData = this.form.value.defaultData;
        
        this.userService.register(this.user).subscribe({
          complete: () => this.router.navigateByUrl('/tasks'),
          error: (error:any) => {
            if (error.status == 400)
            this.translate.get('TOASTR.USER_EXIST').subscribe((res: string) => {
              this.toastr.error(res);
            })
            else console.log(error);
          }
        });
      },
      error: (error: any) => {
        console.error(error);
      }
    });
  }
}
