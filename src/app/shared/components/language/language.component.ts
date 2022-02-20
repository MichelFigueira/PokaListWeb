import { Component, OnInit } from '@angular/core';
import { Languages } from '@app/helpers/Languages';

@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.scss']
})
export class LanguageComponent implements OnInit {

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
