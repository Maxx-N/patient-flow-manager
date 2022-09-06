import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppComponent } from './components/app/app.component';
import { BoardComponent } from './components/board/board.component';
import { CardsColumnComponent } from './components/board/cards-column/cards-column.component';
import { PatientCardComponent } from './components/board/cards-column/patient-card/patient-card.component';
import { FilterBarComponent } from './components/board/filter-bar/filter-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    CardsColumnComponent,
    PatientCardComponent,
    FilterBarComponent,
  ],
  imports: [BrowserModule, HttpClientModule, FlexLayoutModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
