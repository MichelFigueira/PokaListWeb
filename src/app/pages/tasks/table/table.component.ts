import { Component, OnInit } from '@angular/core';

import { ToastrService } from 'ngx-toastr';

import { Poka } from 'src/app/models/Poka';
import { PokaService } from 'src/app/services/poka.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  focus: any;
  pokas: Poka[];
  pokasFiltered: Poka[];
  private filterListed = '';
  dateExample = new Date(12/12/2021);

  constructor(
    private pokaService: PokaService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.getPokas();
  }

  getPokas() {
    this.pokaService.getPoka().subscribe(pokas => {
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

}
