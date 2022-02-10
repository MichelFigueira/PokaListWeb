import { AbstractControl, AbstractControlOptions, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { ToastrService } from 'ngx-toastr';

import { ValidatorField } from '@app/helpers/ValidatorField';
import { UserUpdate } from '@app/models/UserUpdate';
import { UserService } from '@app/services/user.service';

@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.scss']
})
export class ProfileDetailsComponent implements OnInit {

  @Output() changeFormValue = new EventEmitter();

  userUpdate = {} as UserUpdate
  form: FormGroup;

  get f(): any { return this.form.controls; }

  constructor(
    private fb: FormBuilder,
    public userService: UserService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.loadingUser();
    this.validatitonForm();
    this.checkForm();
  }

  private checkForm(): void {
    this.form.valueChanges.subscribe({
      next: () => {
        this.changeFormValue.emit({ ...this.form.value });
      },
    });
  }

  private loadingUser(): void {
    this.userService.getUser().subscribe({
      next: (returnUser: UserUpdate) => {
        this.userUpdate = returnUser;
        this.form.patchValue(this.userUpdate);
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  onSubmit() {
    this.updateUser();
  }

  public updateUser() {
    this.userUpdate = { ...this.form.value }

    this.userService.updateUser(this.userUpdate).subscribe({
      next: () => { this.toastr.success('Profile Saved!') },
      error: (error) => { console.log(error); }
    });
  }

  public validatitonForm(): void {
    const formOptions: AbstractControlOptions = {
      validators: ValidatorField.mustMatch('password', 'confirmPassword')
    };

    this.form = this.fb.group({
      userName: ['', [Validators.required, Validators.email]],
      name: ['', Validators.required],
      password: ['', [Validators.minLength(6), Validators.nullValidator]],
      confirmPassword: ['', Validators.nullValidator],
      photoBytes: [''],
      address: [''],
      city: [''],
      country: [''],
      postalCode: [''],
      aboutMe: ['']
    }, formOptions);
  }

  cssValidator(field: FormControl | AbstractControl): any {
    return { 'is-invalid': field.errors && field.touched };
  }

}
