import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { CardService } from 'src/app/services/card.service';
import { Card } from 'src/app/model/card';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {
  cards$: Observable<Card[]>;

  constructor(private cardService: CardService) {}

  ngOnInit(): void {
    this.cards$ = this.cardService.fetchCards();
  }
}
