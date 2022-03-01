import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl } from '@angular/forms';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { debounceTime, map, Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Poka } from 'src/app/models/Poka';
import { PokaService } from '@app/services/poka.service';
import { PaginatedResult, Pagination } from '@app/models/Pagination';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  @Output() pokaCountEmitter = new EventEmitter();

  public lang;
  focus: any;
  pokas: Poka[];
  poka = {} as Poka;
  form: FormGroup
  modalReference: any;

  public pagination = {} as Pagination;
  
  termFindChanged: Subject<string> = new Subject<string>();
  
  get fp(): any { return this.form.controls; }
  
  constructor(
    private pokaService: PokaService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private modalService: NgbModal,
    private translate: TranslateService
  ) 
  {   
    this.pokaService.newPokaEvent.subscribe(() => {
        this.getPokas();
    });
  }
  
  ngOnInit(): void {
    this.lang = localStorage.getItem('lang') || 'en'
    this.pagination = { currentPage: 1, itemsPerPage: 10, totalItems: 1} as Pagination;
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
          this.getCardNumbers();
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
      .pipe(debounceTime(450))
      .subscribe((filterBy) => { 
        this.pokaService.get(
            this.pagination.currentPage, 
            this.pagination.itemsPerPage,
            filterBy
            ).subscribe((paginatedResult: PaginatedResult<Poka[]>) => {
              {
                this.pokas = paginatedResult.result;
                this.pagination = paginatedResult.pagination;
              }
            });
          }
      )
    }
    this.termFindChanged.next(event.value);
  }

  checkPoka(poka: Poka, event): void {
    if (event === true) {
      poka.dateFinished = new Date();
      poka.status = 1;
      this.pokaService.put(poka.id, poka).subscribe();
      this.translate.get('TOASTR.CHECKED').subscribe((res: string) => {
        this.toastr.success(res);
      });

    } else {
      poka.dateFinished = null
      poka.status = 0;
      this.pokaService.put(poka.id, poka).subscribe();
      this.translate.get('TOASTR.UNCHECKED').subscribe((res: string) => {
        this.toastr.error(res);
      });
    }
    
    this.getCardNumbers();
  }
  
  openModal(content, poka: Poka) {
    this.modalReference = this.modalService.open(content,{ centered: true });
    
    if (poka !== null) {
      this.poka = poka;
      this.form.patchValue(this.poka);
    }
    
  }

  public validatitonForm(): void {
    this.form = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(5)]],
      description: [''],
      groupId: ['']
    });
  }
  
  cssValidator(field: FormControl | AbstractControl): any {
    return { 'is-invalid': field.errors && field.touched };
  }
  
  savePoka() {
    if (this.form.valid) {
      this.pokaService.put(this.poka.id, this.form.value).subscribe({
        complete: () => {
          this.toastr.success('Saved!');
          this.modalReference.close();
          this.getPokas();
        },
        error: (error:any) => {
            this.translate.get('TOASTR.ERROR').subscribe((res: string) => {
            this.toastr.error(error, res);
          });
        }
      });
    }
  }
  
  getCardNumbers(): void {
    let count = new Array;
    count.push(this.pokas.filter(poka => poka.status == 0).length)
    count.push(this.pokas.filter(poka => poka.status == 1).length)
    
    this.pokaCountEmitter.emit(count);
  }
    
}
