import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { CardService } from 'src/app/services/card.service';

@Component({
  selector: 'app-filter-bar',
  templateUrl: './filter-bar.component.html',
  styleUrls: ['./filter-bar.component.scss'],
})
export class FilterBarComponent implements OnInit, OnDestroy {
  filteredName = '';
  filteredArrhythmias = [];
  arrhythmias: string[];
  private cardsSubscription: Subscription;

  constructor(private cardService: CardService) {}

  ngOnInit(): void {
    this.cardsSubscription = this.cardService.cardsSubject.subscribe(() => {
      this.arrhythmias = this.cardService.getArrhythmias();
    });
  }

  ngOnDestroy(): void {
    this.cardsSubscription.unsubscribe();
  }

  onFilter(): void {
    this.cardService.filterCards(this.filteredName, this.filteredArrhythmias);
  }

  onDeleteName(): void {
    this.filteredName = '';
  }
}
