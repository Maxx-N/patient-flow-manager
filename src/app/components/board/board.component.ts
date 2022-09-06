import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';

import { CardService } from 'src/app/services/card.service';
import { Card } from 'src/app/model/card';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {
  toDoCards$: Observable<Card[]>;
  doneCards$: Observable<Card[]>;

  constructor(private cardService: CardService) {}

  ngOnInit(): void {
    this.toDoCards$ = this.cardService.fetchCards().pipe(
      map((cards) => {
        return this.cardService.getToDoCards(cards);
      })
    );

    this.doneCards$ = this.cardService.fetchCards().pipe(
      map((cards) => {
        return this.cardService.getDoneCards(cards);
      })
    );
  }
}
