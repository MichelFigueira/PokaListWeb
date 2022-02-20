import { Component, OnInit } from '@angular/core';
import { Languages } from '@app/helpers/Languages';

@Component({
  selector: 'app-language-small',
  templateUrl: './language-small.component.html',
  styleUrls: ['./language-small.component.scss']
})
export class LanguageSmallComponent implements OnInit {

  public lang;
  availableLangs = Languages;
  activeLang: string;

  constructor() { }

  ngOnInit() {
    this.lang = localStorage.getItem('lang') || 'en'
  }

  changeLang(lang) {
    localStorage.setItem('lang', lang);
    window.location.reload();
  }

}
