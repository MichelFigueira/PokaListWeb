import { AfterViewChecked, Component, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { UserService } from '@app/services/user.service';
import { UserUpdate } from '@app/models/UserUpdate';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.scss']
})
export class ProfileCardComponent implements AfterViewChecked {

  @Input() user = {} as UserUpdate;

  public photoURL = '';
  public file: File;

  constructor(
    private toastr: ToastrService,
    private userService: UserService
  ) { }

  ngAfterViewChecked(): void {
    this.getProfileImage();
  }


  public getProfileImage(): void {

    if (this.user.photoURL){
      this.photoURL = environment.urlResources + `profileimages/${this.user.photoURL}`;
    }
    else {
      this.photoURL = 'assets/img/theme/profile-picture.jpg';
    }
  }

  onFileChange(ev: any): void {
    const reader = new FileReader();

    reader.onload = (event: any) => this.photoURL = event.target.result;

    this.file = ev.target.files;
    reader.readAsDataURL(this.file[0]);

    this.uploadImage();
  }

  private uploadImage(): void {
    this.userService
      .postUpload(this.file)
      .subscribe({
        next: () => this.toastr.success('Updated image', 'Success'),
        error: (error: any) => this.toastr.error('Error')
      });
  }

}
