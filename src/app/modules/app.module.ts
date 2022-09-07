import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';

import { BoardComponent } from '../components/board/board.component';
import { ColumnComponent } from '../components/board/columns-container/column/column.component';
import { PatientCardComponent } from '../components/board/columns-container/column/patient-card/patient-card.component';
import { FilterBarComponent } from '../components/board/filter-bar/filter-bar.component';
import { ColumnsContainerComponent } from '../components/board/columns-container/columns-container.component';
import { AppComponent } from '../components/app/app.component';
import { MaterialModule } from './material.module';

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    ColumnComponent,
    PatientCardComponent,
    FilterBarComponent,
    ColumnsContainerComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FlexLayoutModule,
    MaterialModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
