import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// import { AgExcelLibModule } from 'ag-excel';
import { AgExcelLibModule } from 'src/AgExcel/ag-excel-lib.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AgExcelLibModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
