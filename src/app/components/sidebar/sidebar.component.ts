import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { UserService } from '@app/services/user.service';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})

export class SidebarComponent implements OnInit {

  public isCollapsed = true;

  constructor(
    private router: Router,
    private sanitizer: DomSanitizer,
    public userService: UserService
  ) { }

  ngOnInit() {
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
   });
  }

  public getPhotoURL(imageName: string): string {
    let socialStorage = JSON.parse(localStorage.getItem('social_auth'));

    if (imageName) 
      return 'data:image/jpg;base64,' + (this.sanitizer.bypassSecurityTrustResourceUrl(imageName) as any).changingThisBreaksApplicationSecurity;
    else if (socialStorage.photoUrl) 
      return socialStorage.photoUrl
    else 
      return './assets/img/theme/profile-picture.jpg';
  }

}
