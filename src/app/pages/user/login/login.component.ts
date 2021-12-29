import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from '@app/services/user.service';
import { UserLogin } from '@app/models/UserLogin';

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
    private router: Router
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
        if (error.status == 401)
          console.error("Invalid Email or Password", error);
        else
          console.error(error);
      }
    });
  }

}
