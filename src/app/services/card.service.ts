import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CardService {
  constructor(private http: HttpClient) {}

  fetchCards(): void {
    this.http.get('http://localhost:3000/cards').subscribe((res) => {
      console.log(res);
    });
  }
}
