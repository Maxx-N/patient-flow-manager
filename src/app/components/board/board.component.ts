import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Card } from 'src/app/models/card';
import { CardService } from 'src/app/services/card.service';

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
      this.toDoCards$ = this.cardService.getToDoCards();
      this.doneCards$ = this.cardService.getDoneCards();

    this.cardService.fetchCards();
  }


}
