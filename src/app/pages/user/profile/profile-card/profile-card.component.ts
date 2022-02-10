import { AfterViewChecked, Component, Input } from '@angular/core';

import { ImageCroppedEvent, ImageTransform, base64ToFile } from 'ngx-image-cropper';
import { ToastrService } from 'ngx-toastr';

import { environment } from 'src/environments/environment';
import { UserService } from '@app/services/user.service';
import { UserUpdate } from '@app/models/UserUpdate';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.scss']
})
export class ProfileCardComponent implements AfterViewChecked {

  @Input() user = {} as UserUpdate;

  imageChangedEvent: any = '';
  croppedImage: any = '';
  transform: ImageTransform = {};

  public photo = '';
  public file: File;
  public nameFile: string;

  constructor(
    private toastr: ToastrService,
    private userService: UserService,
    private modalService: NgbModal,
    private sanitizer: DomSanitizer
  ) { }

  ngAfterViewChecked(): void {
    this.getProfileImage();
  }


  public getProfileImage(): void {
    if (this.user.photoBytes){
      this.photo = 'data:image/jpg;base64,' + (this.sanitizer.bypassSecurityTrustResourceUrl(this.user.photoBytes) as any).changingThisBreaksApplicationSecurity;
    }
    else {
      this.photo = 'assets/img/theme/profile-picture.jpg';
    }
  }

  fileChangeEvent(event: any, content: any): void {
    this.imageChangedEvent = event;
    this.nameFile = event.currentTarget.files[0].name;
    this.modalService.open(content,{ centered: true }); 
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;

    let fileConvert = base64ToFile(this.croppedImage);

    this.file = new File([fileConvert], this.nameFile, {
      type: fileConvert.type,
    });
  }

  imageLoaded() {
  }
  cropperReady() {
  }
  loadImageFailed() {
  }

  public uploadImage() {
    this.userService
      .postUpload(this.file)
      .subscribe({
        next: () => (
          this.toastr.success('Updated image', 'Success'),
          this.modalService.dismissAll()),
        error: (error: any) => this.toastr.error('Error')
      });
  }
}
