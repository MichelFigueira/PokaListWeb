import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {

  count;
  
  constructor() {}
  ngOnInit(): void {
  }

  pokaCount(event: any): void {
    this.count = event;
    this.pokaCountGo();
  }

  pokaCountGo() {
    return this.count;
  }

}
