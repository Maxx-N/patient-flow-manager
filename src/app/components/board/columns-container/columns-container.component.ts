import { Component, Input, OnInit } from '@angular/core';

import { Card } from 'src/app/model/card';

@Component({
  selector: 'app-columns-container',
  templateUrl: './columns-container.component.html',
  styleUrls: ['./columns-container.component.scss'],
})
export class ColumnsContainerComponent implements OnInit {
  @Input() toDoCards: Card[];
  @Input() doneCards: Card[];

  constructor() {}

  ngOnInit(): void {}
}
