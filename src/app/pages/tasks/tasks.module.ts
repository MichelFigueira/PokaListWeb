import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { PaginationModule } from 'ngx-bootstrap/pagination';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { TasksRoutingModule } from './tasks.routing';

import { TableComponent } from './table/table.component';
import { CardsComponent } from './cards/cards.component';
import { TasksComponent } from './tasks.component';
import { SharedModule } from '@app/shared/shared.module';


@NgModule({
  declarations: [
    TasksComponent,
    CardsComponent,
    TableComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    RouterModule,
    TasksRoutingModule,
    SharedModule,
    PaginationModule.forRoot()
  ],
  providers: [],
  bootstrap: []
})
export class TasksModule { }
