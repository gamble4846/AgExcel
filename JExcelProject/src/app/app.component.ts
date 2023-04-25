import { Component, ElementRef, ViewChild } from '@angular/core';
import { JExcelComponent } from './JExcel/jexcel.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild(JExcelComponent) JEXCELCOM:JExcelComponent | undefined;
  
  title = 'JExcelProject';
  Columns: Array<any> = [];
  Data: Array<any> = [];
  
  constructor(
  ) { }

  ngOnInit(): void {
    this.Columns = [
      {
        type: 'text',
        title: 'Name',
      },
      {
        type: 'text',
        title: 'Thumbnail Link',
      },
      {
        type: 'text',
        title: 'Type',
      },
      {
        type: 'text',
        title: 'Size',
      },
      {
        type: 'text',
        title: 'Email',
      },
      {
        type: 'text',
        title: 'Link',
      },
      {
        type: 'text',
        title: 'Password',
      },
      {
        type: 'text',
        title: 'OtherData',
      },
    ]

    this.Data = [];

    setTimeout(() => {
      this.JEXCELCOM?.SetRowData(1,['as','asd','asd','asda','as','asd','asd','asda','as','asd','asd','asda'])
    }, 1000);
  }

  ConsoleThis(data:any){
    console.log(data);
  }
}
