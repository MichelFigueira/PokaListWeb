import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit {

  @Input() countCards = new Array();

  constructor() { }

  ngOnInit() {
    this.countCards = [{0: 1, 1: 0}]
  }

}
