import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JExcelRoutingModule } from './jexcel-routing.module';
import { JExcelComponent } from './jexcel.component';


@NgModule({
  declarations: [
    JExcelComponent
  ],
  imports: [
    CommonModule,
    JExcelRoutingModule
  ],
  exports: [
    JExcelComponent
  ]
})
export class JExcelModule { }
