import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Card } from 'src/app/models/card';

import { CardService } from '../../services/card.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  toDoCards$: Observable<Card[]>;
  doneCards$: Observable<Card[]>;

  constructor(private cardService: CardService) {}

  ngOnInit(): void {
      this.toDoCards$ = this.cardService.getToDoCards();
      this.doneCards$ = this.cardService.getDoneCards();

    this.cardService.fetchCards();
  }}
