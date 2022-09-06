import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppComponent } from './components/app/app.component';
import { BoardComponent } from './components/board/board.component';
import { ColumnComponent } from './components/board/columns-container/column/column.component';
import { PatientCardComponent } from './components/board/columns-container/column/patient-card/patient-card.component';
import { FilterBarComponent } from './components/board/filter-bar/filter-bar.component';
import { ColumnsContainerComponent } from './components/board/columns-container/columns-container.component';

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    ColumnComponent,
    PatientCardComponent,
    FilterBarComponent,
    ColumnsContainerComponent,
  ],
  imports: [BrowserModule, HttpClientModule, FlexLayoutModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
