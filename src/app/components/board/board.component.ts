import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Card } from 'src/app/model/card';
import { CardService } from 'src/app/services/card.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit, OnDestroy {
  toDoCards: Card[];
  doneCards: Card[];
  private cardsSubscription: Subscription;

  constructor(private cardService: CardService) {}

  ngOnInit(): void {
    this.cardsSubscription = this.cardService.cardsSubject.subscribe(() => {
      this.toDoCards = this.cardService.getToDoCards();
      this.doneCards = this.cardService.getDoneCards();
    });

    this.cardService.fetchCards();
  }

  ngOnDestroy(): void {
    this.cardsSubscription.unsubscribe();
  }
}
