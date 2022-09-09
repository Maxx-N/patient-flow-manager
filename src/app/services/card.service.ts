import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first, last, map, Observable, Subject, takeLast, tap } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Card, DtoCard } from '../models/card';

@Injectable({
  providedIn: 'root',
})
export class CardService {
  private readonly CARDS_API_URL = `${environment.api_url}/cards`;
  private originalCards: Card[] = [];
  private cards: Card[] = [];

  private displayedCards: Card[] = [];
  private displayedCardsSubject = new Subject<Card[]>();
  displayedCards$: Observable<Card[]> =
    this.displayedCardsSubject.asObservable();

  constructor(private http: HttpClient) {}

  fetchCards(): void {
    this.http.get<DtoCard[]>(this.CARDS_API_URL).subscribe((dtoCards) => {
      this.originalCards = dtoCards.map((dtoCard) => {
        return {
          id: dtoCard.id,
          createdDate: new Date(dtoCard.created_date),
          patientName: dtoCard.patient_name,
          arrhythmias: dtoCard.arrhythmias,
          status: dtoCard.status,
        };
      });

      this.cards = this.originalCards.map((card) => {
        return { ...card };
      });

      this.displayedCards = this.cards;
      this.updateDisplayedCards();
    });
  }

  private updateDisplayedCards(): void {
    this.displayedCardsSubject.next(this.displayedCards);
  }

  getToDoCards(): Observable<Card[]> {
    return this.displayedCards$.pipe(
      map((cards) => {
        return cards
          .filter((card) => card.status !== 'DONE')
          .sort((c1, c2) => {
            return c1.patientName < c2.patientName ? -1 : +1;
          })
          .sort((c1, c2) => {
            return c1.status === 'PENDING' && c2.status === 'REJECTED'
              ? -1
              : +1;
          });
      })
    );
  }

  getDoneCards(): Observable<Card[]> {
    return this.displayedCards$.pipe(
      map((cards) => {
        return cards
          .filter((card) => card.status === 'DONE')
          .sort((c1, c2) => {
            return c1.patientName < c2.patientName ? -1 : +1;
          });
      })
    );
  }

  updateCardStatus(cardId: number, newStatus: 'PENDING' | 'REJECTED' | 'DONE') {
    this.getCardById(cardId).status = newStatus;
    this.updateDisplayedCards();
  }

  getArrhythmias(): Observable<string[]> {
    return this.displayedCards$.pipe(
      map(() => {
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
      })
    );
  }

  filterCards(name: string, arrhythmias: string[]): void {
    const filteredName = name.toLowerCase().trim();
    const filteredArrhythmias = arrhythmias.map((arr) => {
      return arr.toLowerCase().trim();
    });

    this.displayedCards = this.cards.filter((card) => {
      if (!!!filteredArrhythmias.length && !!!filteredName) {
        return true;
      }

      const doesIncludeName: boolean = card.patientName
        .toLowerCase()
        .trim()
        .includes(filteredName);

      if (!!!filteredArrhythmias.length) {
        return doesIncludeName;
      }

      const doesIncludeArrhythmia: boolean = card.arrhythmias.some((arr) => {
        return filteredArrhythmias.includes(arr.toLowerCase().trim());
      });

      if (!!!filteredName) {
        return doesIncludeArrhythmia;
      }

      return doesIncludeName && doesIncludeArrhythmia;
    });

    this.updateDisplayedCards();
  }

  setCardsForTesting(cards: Card[]) {
    this.cards = cards;
    this.displayedCards = this.cards;
    this.updateDisplayedCards();
  }

  private getCardById(cardId: number) {
    return this.cards.find((card) => {
      return card.id === cardId;
    });
  }
}
