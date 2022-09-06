export interface Card {
  readonly id: number;
  readonly createdDate: Date;
  readonly patientName: string;
  readonly arrhythmias: string[];
  status: 'PENDING' | 'REJECTED' | 'DONE';
}

export interface DtoCard {
  readonly id: number;
  readonly created_date: string;
  readonly patient_name: string;
  readonly arrhythmias: string[];
  readonly status: 'PENDING' | 'REJECTED' | 'DONE';
}
