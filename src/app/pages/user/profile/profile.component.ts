import { Component } from '@angular/core';
import { UserUpdate } from '@app/models/UserUpdate';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

  public user = {} as UserUpdate;

  constructor() {}

  public setFormValue(user: UserUpdate): void {
    this.user = user;
  }

  public getFormValue() {
    return this.user;
  }

}
