import { DomSanitizer } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

import { UserService } from '@app/services/user.service';
import { MenuItems } from '@app/helpers/menuItems';
import { Languages } from '@app/helpers/Languages';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public lang;

  public focus;
  public listTitles: any[];
  public location: Location;

  constructor(
    location: Location,
    private router: Router,
    public userService: UserService,
    private sanitizer: DomSanitizer
  ) { this.location = location; }

  ngOnInit() {
    this.lang = localStorage.getItem('lang') || 'en'
    
    this.listTitles = MenuItems.filter(listTitle => listTitle);
  }

  logout(): void {
    this.userService.logout();
    this.router.navigateByUrl('/login');
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

  getTitle(){
    var titlee = this.location.prepareExternalUrl(this.location.path());
    
    if(titlee.charAt(0) === '#'){
        titlee = titlee.slice( 1 );
    }

    for(var item = 0; item < this.listTitles.length; item++){
        if(this.listTitles[item].path === titlee){
            if(titlee === '/tasks') {
              return this.lang == 'en' ? "TASKS" : "TAREFAS"
            } else if (titlee === '/profile') {
              return this.lang == 'en' ? "PROFILE" : "PERFIL"
            }

            return this.listTitles[item].title;
        }
    }
  }

}
