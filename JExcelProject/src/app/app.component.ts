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
        agOnChange: () => { console.log("here") },
      },
      { type: 'agDropdown', source: [ {'id':'1', 'name':'Fruits'},  {'id':'2', 'name':'Legumes'}, {'id':'3', 'name':'General Food'} ] },
    ]

    this.Data = [];

    setTimeout(() => {
      this.Columns = [
        {
          type: 'text',
          title: 'Name',
        },
        { type: 'dropdown', source: [ "a","b","c" ] },
      ]
      this.JEXCELCOM?.RefreshExcel();
      console.log(this.JEXCELCOM?.GetJSpreadsheetObject().updateOptions(1, 1, ['as','asd','asd','asda','as','asd','asd','asda','as','asd','asd','asda']));
    }, 1000);
  }

  ConsoleThis(data:any){
    console.log(data);
  }
}
