import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { JExcelModule } from "./JExcel/jexcel.module";

@NgModule({
  declarations: [
    AppComponent
  ],
  providers: [],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    JExcelModule
  ]
})
export class AppModule { }
