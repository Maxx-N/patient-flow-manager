import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Card, DtoCard } from '../model/card';

@Injectable({
  providedIn: 'root',
})
export class CardService {
  private readonly CARDS_API_URL = `${environment.api_url}/cards`;
  private cards: Card[];
  private filteredCards: Card[];
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

      this.filteredCards = this.cards;

      this.cardsSubject.next();
    });
  }

  getToDoCards() {
    return this.getCards()
      .filter((card) => card.status !== 'DONE')
      .sort((c1, c2) => {
        return c1.patientName < c2.patientName ? -1 : +1;
      })
      .sort((c1, c2) => {
        return c1.status === 'PENDING' && c2.status === 'REJECTED' ? -1 : +1;
      });
  }

  getDoneCards() {
    return this.getCards()
      .filter((card) => card.status === 'DONE')
      .sort((c1, c2) => {
        return c1.patientName < c2.patientName ? -1 : +1;
      });
  }

  getCards(): Card[] {
    return [...this.filteredCards];
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

  filterCards(name: string, arrhythmias: string[]): void {
    const filteredName = name.toLowerCase().trim();
    const filteredArrhythmias = arrhythmias.map((arr) => {
      return arr.toLowerCase().trim();
    });

    this.filteredCards = this.cards
      .filter((card) => {
        if (!!filteredArrhythmias.length) {
          return card.arrhythmias.some((arr) => {
            return filteredArrhythmias.includes(arr.toLowerCase().trim());
          });
        } else {
          return true;
        }
      })
      .filter((card) => {
        return filteredName
          ? card.patientName.toLowerCase().trim().includes(filteredName)
          : true;
      });

    this.cardsSubject.next();
  }

  setCardsForTesting(cards: Card[]) {
    this.cards = cards;
    this.filteredCards = this.cards;
    this.cardsSubject.next();
  }

  private getCardById(cardId: number) {
    return this.cards.find((card) => {
      return card.id === cardId;
    });
  }
}
