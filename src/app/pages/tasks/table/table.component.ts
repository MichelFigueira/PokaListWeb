import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Poka } from 'src/app/models/Poka';
import { PokaService } from '@app/services/poka.service';
import { Pagination } from '@app/models/Pagination';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  focus: any;
  pokas: Poka[];
  poka = {} as Poka;
  form: FormGroup

  pokasFiltered: Poka[];
  private filterListed = '';

  public pagination = {} as Pagination;

  dateExample = new Date(12/12/2021);
  get fp(): any { return this.form.controls; }

  constructor(
    private pokaService: PokaService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private modalService: NgbModal,
  ) { }

  ngOnInit() {
    this.getPokas();
    this.validatitonForm();
  }

  getPokas() {
    this.pokaService.get().subscribe(pokas => {
      this.pokas = pokas;
      this.pokasFiltered = pokas;
    });
  }

  public get filterList(): string {
    return this.filterListed;
  }

  public set filterList(value: string) {
    this.filterListed = value;
    this.pokas = this.filterList ? this.filterPokas(this.filterList) : this.pokas;
  }

  public filterPokas(filterBy: string): Poka[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.pokas.filter(
      (poka: any) => poka.title?.toLocaleLowerCase().indexOf(filterBy) !== -1 ||
      poka.description?.toLocaleLowerCase().indexOf(filterBy) !== -1
    );
  }

  checkPoka(): void {
    this.toastr.success('Congratulations!');
  }

  openModal(content, pokaId) {
    this.modalService.open(content,{ centered: true });

    if (pokaId !== null) {
      this.pokaService.getById(pokaId).subscribe(poka => {
        this.poka = { ...poka };
        this.form.patchValue(this.poka);
      });
    }

  }

  public validatitonForm(): void {
    this.form = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      groupId: ['']
    });
  }

  cssValidator(field: FormControl | AbstractControl): any {
    return { 'is-invalid': field.errors && field.touched };
  }

  savePoka(id) {
    if (this.form.valid) {
      this.pokaService.put(this.poka.id, this.form.value).subscribe();
    }
  }


}
