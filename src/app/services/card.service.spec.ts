import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { first, of } from 'rxjs';

import { CardService } from './card.service';
import { Card, DtoCard } from '../models/card';

describe('CardService', () => {
  let service: CardService;

  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    })
  );

  beforeEach(() => {
    service = TestBed.get(CardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should correctly fetch the cards', () => {
    const http = TestBed.inject(HttpClient);
    spyOn(http, 'get').and.returnValue(of(getSampleDtoCards()));
    service.displayedCards$.subscribe((displayedCards) => {
      for (let i = 0; i < displayedCards.length; i++) {
        const displayedCard = displayedCards[i];
        const sampleCard = getSampleCards()[i];
        for (const key of Object.keys(sampleCard)) {
          if (key !== 'createdDate') {
            expect(displayedCard[key]).toEqual(sampleCard[key]);
          } else {
            expect(displayedCard[key].toString()).toEqual(
              sampleCard[key].toString()
            );
          }
        }
      }
    });
    service.fetchCards();
  });

  it('should get 7 "todo" and 3 "done" cards', () => {
    service.getToDoCards().subscribe((toDoCards) => {
      expect(toDoCards.length).toEqual(7);
    });

    service.getDoneCards().subscribe((doneCards) => {
      expect(doneCards.length).toEqual(3);
    });

    service.setCardsForTesting(getSampleCards());
  });

  it('should update the first card status to "done"', () => {
    service.setCardsForTesting(getSampleCards());

    service.displayedCards$.subscribe((displayedCards) => {
      expect(displayedCards[0].status).toEqual('DONE');
    });

    service.updateCardStatus(0, 'DONE');
  });

  it('should get 9 arrhythmias', () => {
    service.getArrhythmias().subscribe((arrhythmias) => {
      expect(arrhythmias.length).toEqual(9);
    });

    service.setCardsForTesting(getSampleCards());
  });

  it('should correctly filter the cards', () => {
    service.setCardsForTesting(getSampleCards());

    service.displayedCards$.pipe(first()).subscribe((displayedCards) => {
      expect(displayedCards.length).toEqual(6);
    });
    service.filterCards('', ['arrhythmia n° 4', 'Arrhythmia n° 9']);

    service.displayedCards$.pipe(first()).subscribe((displayedCards) => {
      expect(displayedCards.length).toEqual(10);
    });
    service.filterCards('', []);

    service.displayedCards$.pipe(first()).subscribe((displayedCards) => {
      expect(displayedCards.length).toEqual(1);
      expect(displayedCards[0].id).toEqual(9);
    });
    service.filterCards('', ['Arrhythmia n° 9']);

    service.displayedCards$.pipe(first()).subscribe((displayedCards) => {
      expect(displayedCards.length).toEqual(1);
      expect(displayedCards[0].id).toEqual(1);
    });
    service.filterCards('1', []);

    service.displayedCards$.pipe(first()).subscribe((displayedCards) => {
      expect(displayedCards.length).toEqual(0);
    });
    service.filterCards('1', ['Arrhythmia n° 9']);

    service.displayedCards$.pipe(first()).subscribe((displayedCards) => {
      expect(displayedCards.length).toEqual(1);
    });
    service.filterCards('1', ['Arrhythmia n° 9', 'Arrhythmia n° 1']);
  });
});

const getSampleDtoCards = (): DtoCard[] => {
  const dtoCards: DtoCard[] = [];
  for (let i = 0; i < 10; i++) {
    dtoCards.push({
      id: i,
      created_date: new Date(
        new Date().setFullYear(new Date().getFullYear() + i)
      ).toString(),
      patient_name: `Patient n° ${i}`,
      arrhythmias: getArrhythmias(i),
      status: ['PENDING', 'REJECTED', 'DONE'][i % 3] as
        | 'PENDING'
        | 'REJECTED'
        | 'DONE',
    });
  }
  return dtoCards;
};

const getSampleCards = (): Card[] => {
  const cards: Card[] = [];
  for (let i = 0; i < 10; i++) {
    cards.push({
      id: i,
      createdDate: new Date(
        new Date().setFullYear(new Date().getFullYear() + i)
      ),
      patientName: `Patient n° ${i}`,
      arrhythmias: getArrhythmias(i),
      status: ['PENDING', 'REJECTED', 'DONE'][i % 3] as
        | 'PENDING'
        | 'REJECTED'
        | 'DONE',
    });
  }
  return cards;
};

const getArrhythmias = (numberOfArrythmias: number): string[] => {
  const arrhythmias = [];
  for (let i = 0; i < numberOfArrythmias; i++) {
    arrhythmias.push(`Arrhythmia n° ${i + 1}`);
  }
  return arrhythmias;
};
