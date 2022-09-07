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
  toDoCards: Card[];
  doneCards: Card[];

  constructor(private cardService: CardService) {}

  ngOnInit(): void {
    this.cardService.cardsSubject.subscribe(() => {
      this.toDoCards = this.cardService.getToDoCards();
      this.doneCards = this.cardService.getDoneCards();
    });

    this.cardService.fetchCards();
  }
}
