import { Component, ViewChild } from '@angular/core';
import { AgExcelLibComponent } from 'ag-excel';
import { AGEColumn, AGEOnChangeModel } from 'ag-excel/lib/ag-excel-lib.models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild(AgExcelLibComponent) JEXCELCOM:AgExcelLibComponent | undefined;

  title = 'Demo';
  Columns: Array<AGEColumn> = [];
  Data: Array<any> = [];
  
  constructor(
  ) { }

  ngOnInit(): void {
    this.Columns = [
      {
        type: 'text',
        width: '120px'
      },
      {
        type: 'text',
      },
      {
        type: 'text',
      },
      { 
        type: 'AgDropDown'
      },
    ]

    this.Data = [];
  }

  AfterOnLoad(data:any){
    console.log("here");
    console.log(data);
    let ColumnOnChangeObs:any = this.JEXCELCOM?.GetColumnsConfig() || [];
    console.log(this.JEXCELCOM?.GetConfig());
    console.log(this.JEXCELCOM?.GetData());
    ColumnOnChangeObs.AgColumns[0].AgOnChangeSubject.subscribe((response:any) => {
      console.log(response);
    })
  }

  OnChange(data:AGEOnChangeModel){
    console.log(data);
  }

  ConsoleThis(data:any){
    console.log(data);
  }
}
