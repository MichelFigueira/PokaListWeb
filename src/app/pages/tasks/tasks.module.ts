import { TableComponent } from './table/table.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { TasksComponent } from './tasks.component';
import { CardsComponent } from './cards/cards.component';
import { TasksRoutingModule } from './tasks.routing';


@NgModule({
  declarations: [
    TasksComponent,
    CardsComponent,
    TableComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    RouterModule,
    TasksRoutingModule
  ],
  providers: [],
  bootstrap: []
})
export class TasksModule { }
