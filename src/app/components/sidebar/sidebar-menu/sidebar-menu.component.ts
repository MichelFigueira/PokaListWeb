import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { PokaService } from 'src/app/services/poka.service';
import { Poka } from '@app/models/Poka';
import { MenuItems } from '@app/helpers/menuItems';
import { Group } from '@app/models/Group';

@Component({
  selector: 'app-sidebar-menu',
  templateUrl: './sidebar-menu.component.html'
})
export class SidebarMenuComponent implements OnInit {

  menuItems: any[];
  adminItems: any[];
  poka = {} as Poka;
  groups: any[];
  modeModal = 'post';

  form: FormGroup;
  closeResult: string;

  get fp(): any { return this.form.controls; }

  constructor(
    private modalService: NgbModal,
    private fb: FormBuilder,
    private pokaService: PokaService
  ) { }

  ngOnInit() {
    this.menuItems = MenuItems.filter(menuItem => !menuItem.admin);
    this.adminItems = MenuItems.filter(adminItem => adminItem.admin);
    this.validatitonForm();
  }

  openModal(content) {
    this.getGroups();
    this.modalService.open(content,{ centered: true })
      .result.then(
        () => {},
        () => {
          this.resetForm();
        }
      );
  }

  getGroups() {
    this.pokaService.getGroups().subscribe((response) => {
      this.groups = response;
    });
  }

  newPoka() {
    if (this.form.valid) {
      this.poka = this.form.value;
      this.pokaService.post(this.poka).subscribe();
      this.resetForm();
      this.pokaService.pokaEvent();
    }
  }

  public validatitonForm(): void {
    this.form = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(5)]],
      description: [''],
      groupId: ['', Validators.required]
    });
  }

  public resetForm(): void {
    this.form.reset();
  }

  cssValidator(field: FormControl | AbstractControl): any {
    return { 'is-invalid': field.errors && field.touched };
  }

}
