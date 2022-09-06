import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Card, DtoCard } from '../model/card';

@Injectable({
  providedIn: 'root',
})
export class CardService {
  private readonly CARDS_API_URL = `${environment.api_url}/cards`;

  constructor(private http: HttpClient) {}

  fetchCards(): Observable<Card[]> {
    return this.http.get<DtoCard[]>(this.CARDS_API_URL).pipe(
      map((dtoCards) => {
        return dtoCards.map((dtoCard) => {
          return {
            id: dtoCard.id,
            createdDate: new Date(dtoCard.created_date),
            patientName: dtoCard.patient_name,
            arrhythmias: dtoCard.arrhythmias,
            status: dtoCard.status,
          };
        });
      })
    );
  }
}
