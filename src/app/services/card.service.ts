import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, Subject } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Card, DtoCard } from '../model/card';

@Injectable({
  providedIn: 'root',
})
export class CardService {
  private readonly CARDS_API_URL = `${environment.api_url}/cards`;
  private cards: Card[];
  cardsSubject = new Subject<void>();

  constructor(private http: HttpClient) {}

  fetchCards(): void {
    this.http.get<DtoCard[]>(this.CARDS_API_URL).subscribe((dtoCards) => {
      this.cards = dtoCards.map((dtoCard) => {
        return {
          id: dtoCard.id,
          createdDate: new Date(dtoCard.created_date),
          patientName: dtoCard.patient_name,
          arrhythmias: dtoCard.arrhythmias,
          status: dtoCard.status,
        };
      });

      this.cardsSubject.next();
    });
  }

  getToDoCards() {
    return this.getCards().filter((card) => card.status !== 'DONE');
  }

  getDoneCards() {
    return this.getCards().filter((card) => card.status === 'DONE');
  }

  getCards(): Card[] {
    return [...this.cards];
  }

  updateCardStatus(cardId: number, newStatus: 'PENDING' | 'REJECTED' | 'DONE') {
    this.getCardById(cardId).status = newStatus;
    this.cardsSubject.next();
  }

  getArrhythmias(): string[] {
    const duplicatedArhythmias: string[] = [];
    for (const card of this.cards) {
      duplicatedArhythmias.push(...card.arrhythmias);
    }

    const obj = {};
    for (const arr of duplicatedArhythmias) {
      obj[arr] = arr;
    }

    const arrhythmias: string[] = [];
    for (const key of Object.keys(obj)) {
      arrhythmias.push(obj[key]);
    }

    return arrhythmias;
  }

  private getCardById(cardId: number) {
    return this.cards.find((card) => {
      return card.id === cardId;
    });
  }
}
