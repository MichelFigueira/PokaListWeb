import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

import { urlAPI, urlResources } from 'src/environments/environment';
import { MenuItems } from '@app/helpers/MenuItems';
import { UserService } from '@app/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  //pictureURL = urlResources + 'profileimages/';

  public focus;
  public listTitles: any[];
  public location: Location;

  constructor(
    location: Location,
    private router: Router,
    public userService: UserService
  ) { this.location = location; }

  ngOnInit() {
    this.listTitles = MenuItems.filter(listTitle => listTitle);
  }

  logout(): void {
    this.userService.logout();
    this.router.navigateByUrl('/login');
  }

  public getPhotoURL(imageName: string): string {
    console.log(urlResources + `profileimages/${imageName}`)
    if (imageName)
      return urlResources + `profileimages/${imageName}`;
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
            return this.listTitles[item].title;
        }
    }
    return '';
  }

}
