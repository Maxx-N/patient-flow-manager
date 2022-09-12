import { Component, Input, OnInit } from '@angular/core';

import { Card } from 'src/app/models/card';
import { CardService } from 'src/app/services/card.service';

@Component({
  selector: 'app-patient-card',
  templateUrl: './patient-card.component.html',
  styleUrls: ['./patient-card.component.scss'],
})
export class PatientCardComponent implements OnInit {
  @Input() card: Card;

  constructor(private cardService: CardService) {}

  ngOnInit(): void {}

  onChangeStatus(newStatus: 'REJECTED' | 'DONE'): void {
    this.cardService.updateCardStatus(this.card.id, newStatus);
  }
}
