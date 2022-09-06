import { Component, Input, OnInit } from '@angular/core';

import { Card } from 'src/app/model/card';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss'],
})
export class ColumnComponent implements OnInit {
  @Input() cards: Card[];

  constructor() {}

  ngOnInit(): void {}
}
