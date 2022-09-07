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

  getCards(): Card[] {
    return [...this.cards];
  }

  getToDoCards() {
    return this.getCards().filter((card) => card.status !== 'DONE');
  }

  getDoneCards() {
    return this.getCards().filter((card) => card.status === 'DONE');
  }
}
