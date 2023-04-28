import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
// import { AgExcelLibComponent } from 'ag-excel';
// import { AGEColumn, AGEOnChangeModel } from 'ag-excel/lib/ag-excel-lib.models';
import { AgExcelLibComponent } from 'src/AgExcel/ag-excel-lib.component';
import { AGEColumn, AGEOnChangeModel } from 'src/AgExcel/ag-excel-lib.models';

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
    private cdref: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.Columns = [
      {
        type: 'text'
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
    console.log(ColumnOnChangeObs);
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

  UpdateData(){
    this.Data = [["a","b","c"]]
  }
}
