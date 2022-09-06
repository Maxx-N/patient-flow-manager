import { Component, OnInit } from '@angular/core';

import { CardService } from 'src/app/services/card.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {
  constructor(private cardService: CardService) {}

  ngOnInit(): void {
    this.cardService.fetchCards();
  }
}
