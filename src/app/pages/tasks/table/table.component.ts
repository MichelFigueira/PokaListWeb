import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { debounceTime, Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Poka } from 'src/app/models/Poka';
import { PokaService } from '@app/services/poka.service';
import { PaginatedResult, Pagination } from '@app/models/Pagination';

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

  public pagination = {} as Pagination;
  
  termFindChanged: Subject<string> = new Subject<string>();


  dateExample = new Date(12/12/2021);
  get fp(): any { return this.form.controls; }

  constructor(
    private pokaService: PokaService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private modalService: NgbModal,
  ) { }

  ngOnInit(): void {
    this.pagination = { currentPage: 1, itemsPerPage: 5, totalItems: 1} as Pagination;
    this.getPokas();
    this.validatitonForm();
  }

  getPokas(): void {
    this.pokaService
      .get(this.pagination.currentPage, this.pagination.itemsPerPage, '')
      .subscribe((paginatedResult: PaginatedResult<Poka[]>) => {
        {
          this.pokas = paginatedResult.result;
          this.pagination = paginatedResult.pagination;
        }
      });
  }

  public pageChanged(event): void {
    this.pagination.currentPage = event.page;
    this.getPokas();
  }

  public filterPokas(event: any): void {
    if (this.termFindChanged.observers.length === 0) {
      this.termFindChanged
        .pipe(debounceTime(500))
        .subscribe((filterBy) => { 
          this.pokaService.get(
            this.pagination.currentPage, 
            this.pagination.itemsPerPage,
            filterBy
          ).subscribe((paginatedResult: PaginatedResult<Poka[]>) => {
              next: {
                this.pokas = paginatedResult.result;
                this.pagination = paginatedResult.pagination;
              }
          });
        }
      )
    }
    this.termFindChanged.next(event.value);
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
