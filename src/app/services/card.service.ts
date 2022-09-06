import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CardService {
  private readonly CARDS_API_URL = `${environment.api_url}/cards`;

  constructor(private http: HttpClient) {}

  fetchCards(): void {
    this.http.get(this.CARDS_API_URL).subscribe((res) => {
      console.log(res);
    });
  }
}
