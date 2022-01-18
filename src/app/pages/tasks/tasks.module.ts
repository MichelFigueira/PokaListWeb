import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { PaginationModule } from 'ngx-bootstrap/pagination';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';

import { TasksRoutingModule } from './tasks.routing';

import { TableComponent } from './table/table.component';
import { CardsComponent } from './cards/cards.component';
import { TasksComponent } from './tasks.component';


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
    PaginationModule.forRoot(),
    LoadingBarHttpClientModule
  ],
  providers: [],
  bootstrap: []
})
export class TasksModule { }
