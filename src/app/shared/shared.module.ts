import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageComponent } from './components/language/language.component';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LanguageSmallComponent } from './components/language-small/language-small.component';

@NgModule({
  declarations: [
    LanguageComponent,
    LanguageSmallComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule
  ],
  exports: [
    TranslateModule,
    LanguageComponent,
    LanguageSmallComponent
  ]
})
export class SharedModule { }
