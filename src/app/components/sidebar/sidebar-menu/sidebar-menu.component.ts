import { Component, OnInit } from '@angular/core';
import { MenuItems } from '@app/helpers/menuItems';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-sidebar-menu',
  templateUrl: './sidebar-menu.component.html'
})
export class SidebarMenuComponent implements OnInit {

  public menuItems: any[];
  public adminItems: any[];

  closeResult = '';

  constructor(private modalService: NgbModal) { }

  ngOnInit() {
    this.menuItems = MenuItems.filter(menuItem => !menuItem.admin);
    this.adminItems = MenuItems.filter(adminItem => adminItem.admin);
  }

  openModal(content) {
    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    });
  }
}
