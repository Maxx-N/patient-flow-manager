import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { CardService } from 'src/app/services/card.service';

@Component({
  selector: 'app-filter-bar',
  templateUrl: './filter-bar.component.html',
  styleUrls: ['./filter-bar.component.scss'],
})
export class FilterBarComponent implements OnInit {
  filteredName = '';
  filteredArrhythmias = [];
  arrhythmias$: Observable<string[]>;

  constructor(private cardService: CardService) {}

  ngOnInit(): void {
    this.arrhythmias$ = this.cardService.getArrhythmias();
  }

  onFilter(): void {
    this.cardService.filterCards(this.filteredName, this.filteredArrhythmias);
  }

  onDeleteName(): void {
    this.filteredName = '';
  }
}
