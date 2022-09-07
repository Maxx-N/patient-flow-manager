import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

import { CardService } from './card.service';
import { Card, DtoCard } from '../model/card';

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
    service.cardsSubject.subscribe(() => {
      for (let i = 0; i < service.getCards().length; i++) {
        const card = service.getCards()[i];
        const sampleCard = getSampleCards()[i];
        for (const key of Object.keys(sampleCard)) {
          if (key !== 'createdDate') {
            expect(card[key]).toEqual(sampleCard[key]);
          } else {
            expect(card[key].toString()).toEqual(sampleCard[key].toString());
          }
        }
      }
    });
    service.fetchCards();
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
