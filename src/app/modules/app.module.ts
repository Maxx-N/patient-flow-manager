import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from '../components/app/app.component';
import { ColumnComponent } from '../components/columns-container/column/column.component';
import { PatientCardComponent } from '../components/columns-container/column/patient-card/patient-card.component';
import { ColumnsContainerComponent } from '../components/columns-container/columns-container.component';
import { FilterBarComponent } from '../components/filter-bar/filter-bar.component';
import { MaterialModule } from './material.module';

@NgModule({
  declarations: [
    AppComponent,
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
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
