import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { Observable, Observer, Subject } from 'rxjs';
import { AgExcelLibService } from './ag-excel-lib.service';
import { AGEColumn, AGEOnChangeModel } from './ag-excel-lib.models';
declare var jspreadsheet: any;

@Component({
  selector: 'AgExcel',
  template: `
    <div class="jexcelContainer">
      <div #spreadsheet></div>
    </div>
  `,
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AgExcelLibComponent implements OnChanges {
  @ViewChild('spreadsheet', { read: ElementRef })
  spreadsheet: ElementRef<HTMLElement> | undefined;

  @Input() ngModel: Array<any> = [];
  @Output() ngModelChange = new EventEmitter<Array<any>>();

  @Input() Columns: Array<AGEColumn> = [];
  @Input() setWidthToMaxParent: boolean = false;
  @Input() minColumns: number = 0;
  @Input() minRows: number = 0;

  @Output() AgOnLoad = new EventEmitter<any>();
  @Output() OnLoad = new EventEmitter<any>();
  @Output() OnBeforeChange = new EventEmitter<any>();
  @Output() OnChange = new EventEmitter<AGEOnChangeModel>();
  @Output() OnAfterChanges = new EventEmitter<any>();
  @Output() OnPaste = new EventEmitter<any>();
  @Output() OnBeforePaste = new EventEmitter<any>();
  @Output() OnInsertRow = new EventEmitter<any>();
  @Output() OnBeforeInsertRow = new EventEmitter<any>();
  @Output() OnDeleteRow = new EventEmitter<any>();
  @Output() OnBeforeDeleteRow = new EventEmitter<any>();
  @Output() OnInsertColumn = new EventEmitter<any>();
  @Output() OnBeforeInsertColumn = new EventEmitter<any>();
  @Output() OnDeleteColumn = new EventEmitter<any>();
  @Output() OnBeforeDeleteColumn = new EventEmitter<any>();
  @Output() OnMoveRow = new EventEmitter<any>();
  @Output() OnMoveColumn = new EventEmitter<any>();
  @Output() OnResizeRow = new EventEmitter<any>();
  @Output() OnResizeColumn = new EventEmitter<any>();
  @Output() OnSelection = new EventEmitter<any>();
  @Output() OnSort = new EventEmitter<any>();
  @Output() OnFocus = new EventEmitter<any>();
  @Output() OnBlur = new EventEmitter<any>();
  @Output() OnMerge = new EventEmitter<any>();
  @Output() OnChangeHeader = new EventEmitter<any>();
  @Output() OnUndo = new EventEmitter<any>();
  @Output() OnRedo = new EventEmitter<any>();
  @Output() OnEditionStart = new EventEmitter<any>();
  @Output() OnEditionEnd = new EventEmitter<any>();
  @Output() OnChangeStyle = new EventEmitter<any>();
  @Output() OnChangeMeta = new EventEmitter<any>();

  JSpreadsheet: any = null;
  AgColumns: Array<AGEColumn> = [];
  AgColumnsBeforeSetup: Array<AGEColumn> = [];
  SubCalledColumns: Array<any> = [];
  onLoadNotCalled:boolean = true;

  textColumn:AGEColumn = {};

  constructor(
    private _AgExcelLib:AgExcelLibService
  ) { }

  ngOnInit(): void {
    this.UpdateJExcel();
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes['ngModel']){
      if(JSON.stringify(changes['ngModel'].previousValue) != JSON.stringify(changes['ngModel'].currentValue)){
        if(this.GetData() && changes['ngModel'].currentValue && (JSON.stringify(this.GetData()) != JSON.stringify(changes['ngModel'].currentValue))){
          this.SetData(changes['ngModel'].currentValue);
        }
      }
    }
  }

  UpdateJExcel() {
    this._AgExcelLib.setupExternalFiles().subscribe((response: boolean) => {
      if (response) {
        this.SetUpColumns();
        this.JSpreadsheet = jspreadsheet(this.spreadsheet?.nativeElement, {
          data: this.ngModel,
          columns: this.Columns,
          minDimensions: [this.minColumns, this.minRows],
          onload: (event: any) => { this.ngModelChange.emit(this.GetData()); this.OnLoadCALLBACK(event); },
          onchange: (instance: any, cell: any, x: any, y: any, value: any) => { this.ngModelChange.emit(this.GetData()); this.OnChangeCALLBACK(instance, cell, x, y, value); },
          onbeforechange: (instance: any, cell: any, x: any, y: any, value: any) => { this.ngModelChange.emit(this.GetData()); let data = { "instance": instance, "cell": cell, "x": x, "y": y, "value": value }; this.OnBeforeChange.emit(data); },
          oninsertrow: (event: any) => { this.ngModelChange.emit(this.GetData()); this.OnInsertRow.emit(event); },
          oninsertcolumn: (event: any) => { this.ngModelChange.emit(this.GetData()); this.OnInsertColumn.emit(event); },
          ondeleterow: (event: any) => { this.ngModelChange.emit(this.GetData()); this.OnDeleteRow.emit(event); },
          ondeletecolumn: (event: any) => { this.ngModelChange.emit(this.GetData()); this.OnDeleteColumn.emit(event); },
          onselection: (instance: any, x1: any, y1: any, x2: any, y2: any, origin: any) => { this.ngModelChange.emit(this.GetData()); let data = { "instance": instance, "x1": x1, "y1": y1, "x2": x2, "y2": y2, "origin": origin }; this.OnSelection.emit(data); },
          onsort: (instance: any, cellNum: any, order: any) => { this.ngModelChange.emit(this.GetData()); let data = { "instance": instance, "cellNum": cellNum, "order": order }; this.OnSort.emit(data); },
          onresizerow: (instance: any, cell: any, height: any) => { this.ngModelChange.emit(this.GetData()); let data = { "instance": instance, "cell": cell, "height": height }; this.OnResizeRow.emit(data); },
          onresizecolumn: (instance: any, cell: any, width: any) => { this.ngModelChange.emit(this.GetData()); let data = { "instance": instance, "cell": cell, "width": width }; this.OnResizeColumn.emit(data); },
          onmoverow: (instance: any, from: any, to: any) => { this.ngModelChange.emit(this.GetData()); let data = { "instance": instance, "from": from, "to": to }; this.OnMoveRow.emit(data); },
          onmovecolumn: (instance: any, from: any, to: any) => { this.ngModelChange.emit(this.GetData()); let data = { "instance": instance, "from": from, "to": to }; this.OnMoveColumn.emit(data); },
          onblur: (event: any) => { this.ngModelChange.emit(this.GetData()); this.OnBlur.emit(event); },
          onfocus: (event: any) => { this.ngModelChange.emit(this.GetData()); this.OnFocus.emit(event); },
          onafterchanges: (instance: any, records: any) => { this.ngModelChange.emit(this.GetData()); let data = { "instance": instance, "records": records }; this.OnAfterChanges.emit(data); },
          onpaste: (instance: any, records: any) => { this.ngModelChange.emit(this.GetData()); let data = { "instance": instance, "records": records }; this.OnPaste.emit(data); },
          onbeforepaste: (instance: any, records: any, x: any, y: any) => { this.ngModelChange.emit(this.GetData()); let data = { "instance": instance, "records": records, "x": x, "y": y }; this.OnBeforePaste.emit(data); },
          onbeforeinsertrow: (instance: any, rowNumber: any, numOfRows: any, insertBefore: any) => { this.ngModelChange.emit(this.GetData()); let data = { "instance": instance, "rowNumber": rowNumber, "numOfRows": numOfRows, "insertBefore": insertBefore }; this.OnBeforeInsertRow.emit(data); },
          onbeforedeleterow: (instance: any, rowNumber: any, numOfRows: any) => { this.ngModelChange.emit(this.GetData()); let data = { "instance": instance, "rowNumber": rowNumber, "numOfRows": numOfRows }; this.OnBeforeDeleteRow.emit(data); },
          onbeforeinsertcolumn: (instance: any, columnNumber: any, numOfColumns: any, insertBefore: any) => { this.ngModelChange.emit(this.GetData()); let data = { "instance": instance, "columnNumber": columnNumber, "numOfColumns": numOfColumns, "insertBefore": insertBefore }; this.OnBeforeInsertColumn.emit(data); },
          onbeforedeletecolumn: (instance: any, columnNumber: any, numOfColumns: any) => { this.ngModelChange.emit(this.GetData()); let data = { "instance": instance, "columnNumber": columnNumber, "numOfColumns": numOfColumns }; this.OnBeforeDeleteColumn.emit(data); },
          onmerge: (instance: any, cellName: any, colspan: any, rowspan: any) => { this.ngModelChange.emit(this.GetData()); let data = { "instance": instance, "cellName": cellName, "colspan": colspan, "rowspan": rowspan }; this.OnMerge.emit(data); },
          onchangeheader: (instance: any, column: any, oldValue: any, newValue: any) => { this.ngModelChange.emit(this.GetData()); let data = { "instance": instance, "column": column, "oldValue": oldValue, "newValue": newValue }; this.OnChangeHeader.emit(data); },
          onundo: (instance: any, historyRecord: any) => { this.ngModelChange.emit(this.GetData()); let data = { "instance": instance, "historyRecord": historyRecord }; this.OnUndo.emit(data); },
          onredo: (instance: any, historyRecord: any) => { this.ngModelChange.emit(this.GetData()); let data = { "instance": instance, "historyRecord": historyRecord }; this.OnRedo.emit(data); },
          oneditionstart: (instance: any, cell: any, x: any, y: any) => { this.ngModelChange.emit(this.GetData()); let data = { "instance": instance, "cell": cell, "x": x, "y": y }; this.OnEditionStart.emit(data); },
          oneditionend: (instance: any, cell: any, x: any, y: any, value: any, save: any) => { this.ngModelChange.emit(this.GetData()); let data = { "instance": instance, "cell": cell, "x": x, "y": y, "value": value, "save": save }; this.OnEditionEnd.emit(data); },
          onchangestyle: (instance: any, o: any, k: any, v: any) => { this.ngModelChange.emit(this.GetData()); let data = { "instance": instance, "o": o, "k": k, "v": v }; this.OnChangeStyle.emit(data); },
          onchangemeta: (instance: any, o: any, k: any, v: any) => { this.ngModelChange.emit(this.GetData()); let data = { "instance": instance, "o": o, "k": k, "v": v }; this.OnChangeMeta.emit(data); },
        });

        if (this.setWidthToMaxParent) {
          this.SetupWidthToMaxParent();
        }
      }
      else {
      }
    })
  }

  private OnChangeCALLBACK(instance: any, cell: any, x: any, y: any, value: any) {
    let data:AGEOnChangeModel = {
      instance: instance,
      cell: cell,
      x: x,
      y: y,
      value: value
    };
    this.OnChange.emit(data);
    if(this.AgColumns[x] && this.AgColumns[x].AgOnChangeSubject){
      this.AgColumns[x].AgOnChangeSubject?.next(data);
    }
  }

  private OnLoadCALLBACK(data:any){
    if(this.GetConfig()){
      if(this.onLoadNotCalled){
        this.onLoadNotCalled = false;
        this.AgOnLoad.emit(data);
      }
    }
    else{
      this.OnLoad.emit(data);
      setTimeout(() => {
        this.OnLoadCALLBACK(data);
      }, 500);
    }
  }

  private SetUpColumns() {
    this.AgColumnsBeforeSetup = this.Columns;

    this.Columns.forEach((column: any) => {
      column.AgOnChangeSubject = new Subject<any>();
    });

    this.AgColumns = this.Columns;
  }

  private SetupWidthToMaxParent() {
    let allColumnsWidth: number = this.GetWidth(0).reduce((partialSum: number, a: number) => partialSum + a, 0);
    let parentWidth: number = 0;

    try {
      parentWidth = this.spreadsheet?.nativeElement.parentElement!.offsetWidth || 0;
    }
    catch {
      parentWidth = 0;
    }

    if (parentWidth > allColumnsWidth) {
      parentWidth = parentWidth - (51 + 7);
      let averageWidthRequired = parentWidth / this.Columns.length;
      for (let index = 0; index < this.Columns.length; index++) {
        this.SetWidth(index, (averageWidthRequired).toString());
      }
    }
  }

  GetColumnsConfig() {
    return {
      "AgColumnsBeforeSetup": this.AgColumnsBeforeSetup,
      "AgColumns": this.AgColumns,
      "Columns": this.Columns,
    };
  }

  GetJSpreadsheetObject() {
    return this.JSpreadsheet;
  }

  // RefreshExcel() { if (this.JSpreadsheet) { return this.JSpreadsheet.refresh(); } else { return null; } }
  GetData(onlyHighlighedCells: boolean = false) { if (this.JSpreadsheet) { return this.JSpreadsheet.getData(onlyHighlighedCells); } else { return null; } }
  GetRowData(rowNumber: number) { if (this.JSpreadsheet) { return this.JSpreadsheet.getRowData(rowNumber); } else { return null; } }
  SetRowData(rowNumber: number, rowData: Array<any>) { if (this.JSpreadsheet) { return this.JSpreadsheet.setRowData(rowNumber, rowData); } else { return null; } }
  GetColumnData(columnNumber: number) { if (this.JSpreadsheet) { return this.JSpreadsheet.getColumnData(columnNumber); } else { return null; } }
  SetColumnData(columnNumber: number, colData: Array<any>) { if (this.JSpreadsheet) { return this.JSpreadsheet.setColumnData(columnNumber, colData); } else { return null; } }
  SetData(newData: any) { if (this.JSpreadsheet) { return this.JSpreadsheet.setData(newData); } else { return null; } }
  SetMerge(columnName: string, colspan: number, rowspan: number) { if (this.JSpreadsheet) { return this.JSpreadsheet.setMerge(columnName, colspan, rowspan); } else { return null; } }
  GetMerge(columnName: string) { if (this.JSpreadsheet) { return this.JSpreadsheet.getMerge(columnName); } else { return null; } }
  RemoveMerge(columnName: string) { if (this.JSpreadsheet) { return this.JSpreadsheet.removeMerge(columnName); } else { return null; } }
  DestroyMerged() { if (this.JSpreadsheet) { return this.JSpreadsheet.DestroyMerged(); } else { return null; } }
  GetCell(columnName: string) { if (this.JSpreadsheet) { return this.JSpreadsheet.getCell(columnName); } else { return null; } }
  GetLabel(columnName: string) { if (this.JSpreadsheet) { return this.JSpreadsheet.getLabel(columnName); } else { return null; } }
  GetValue(cellIdent: any) { if (this.JSpreadsheet) { return this.JSpreadsheet.getValue(cellIdent); } else { return null; } }
  GetValueFromCoords(x: number, y: number) { if (this.JSpreadsheet) { return this.JSpreadsheet.getValueFromCoords(x, y); } else { return null; } }
  SetValue(cellIdent: any, Value: string, force: boolean) { if (this.JSpreadsheet) { return this.JSpreadsheet.setValue(cellIdent, Value, force); } else { return null; } }
  SetValueFromCoords(x: number, y: number, Value: string, force: boolean) { if (this.JSpreadsheet) { return this.JSpreadsheet.setValueFromCoords(x, y, Value, force); } else { return null; } }
  ResetSelection(executeBlur: any) { if (this.JSpreadsheet) { return this.JSpreadsheet.resetSelection(executeBlur); } else { return null; } }
  UpdateSelection(startCell: any, endCell: any, ignoreEvents: boolean) { if (this.JSpreadsheet) { return this.JSpreadsheet.updateSelection(startCell, endCell, ignoreEvents); } else { return null; } }
  UpdateSelectionFromCoords(x1: number, y1: number, x2: number, y2: number) { if (this.JSpreadsheet) { return this.JSpreadsheet.updateSelectionFromCoords(x1, y1, x2, y2); } else { return null; } }
  GetWidth(columnNumber: number) { if (this.JSpreadsheet) { return this.JSpreadsheet.getWidth(columnNumber); } else { return null; } }
  SetWidth(columnNumber: number, newColumnWidth: string) { if (this.JSpreadsheet) { return this.JSpreadsheet.setWidth(columnNumber, newColumnWidth); } else { return null; } }
  GetHeight(rowNumber: number) { if (this.JSpreadsheet) { return this.JSpreadsheet.getHeight(rowNumber); } else { return null; } }
  SetHeight(rowNumber: number, newRowHeight: string) { if (this.JSpreadsheet) { return this.JSpreadsheet.setHeight(rowNumber, newRowHeight); } else { return null; } }
  GetHeader(columnNumber: number) { if (this.JSpreadsheet) { return this.JSpreadsheet.getHeader(columnNumber); } else { return null; } }
  GetHeaders() { if (this.JSpreadsheet) { return this.JSpreadsheet.GetHeaders(); } else { return null; } }
  SetHeader(columnNumber: number, columnTitle: string) { if (this.JSpreadsheet) { return this.JSpreadsheet.setHeader(columnNumber, columnTitle); } else { return null; } }
  GetStyle(cell: any) { if (this.JSpreadsheet) { return this.JSpreadsheet.getStyle(cell); } else { return null; } }
  SetStyle(data: any, k: string | undefined = undefined, v: string | undefined = undefined) { if (this.JSpreadsheet) { return this.JSpreadsheet.setStyle(data, k, v); } else { return null; } }
  ResetStyle(columnName: string) { if (this.JSpreadsheet) { return this.JSpreadsheet.resetStyle(columnName); } else { return null; } }
  GetComments(cellIdentification: any = null) { if (this.JSpreadsheet) { return this.JSpreadsheet.getComments(cellIdentification); } else { return null; } }
  SetComments(cell: any, text: string) { if (this.JSpreadsheet) { return this.JSpreadsheet.setComments(cell, text); } else { return null; } }
  OrderBy(columnNumber: number, sortType: boolean) { if (this.JSpreadsheet) { return this.JSpreadsheet.orderBy(columnNumber, sortType); } else { return null; } }
  GetConfig() { if (this.JSpreadsheet) { return this.JSpreadsheet.getConfig(); } else { return null; } }
  InsertColumn(numOfColumns: any, columnNumber: number, insertBefore: boolean, properties: any) { if (this.JSpreadsheet) { return this.JSpreadsheet.insertColumn(numOfColumns, columnNumber, insertBefore, properties); } else { return null; } }
  DeleteColumn(columnNumber: number, numOfColumns: number) { if (this.JSpreadsheet) { return this.JSpreadsheet.deleteColumn(columnNumber, numOfColumns); } else { return null; } }
  MoveColumn(columnPosition: number, newColumnPosition: number) { if (this.JSpreadsheet) { return this.JSpreadsheet.moveColumn(columnPosition, newColumnPosition); } else { return null; } }
  InsertRow(numberOfBlankLines: any, rowNumber: number, insertBefore: boolean) { if (this.JSpreadsheet) { return this.JSpreadsheet.insertRow(numberOfBlankLines, rowNumber, insertBefore); } else { return null; } }
  DeleteRow(rowNumber: number, numOfRows: number) { if (this.JSpreadsheet) { return this.JSpreadsheet.deleteRow(rowNumber, numOfRows); } else { return null; } }
  MoveRow(rowPosition: number, newRowPosition: number) { if (this.JSpreadsheet) { return this.JSpreadsheet.moveRow(rowPosition, newRowPosition); } else { return null; } }
  Download(parsedFormulas: boolean = false) { if (this.JSpreadsheet) { return this.JSpreadsheet.download(parsedFormulas); } else { return null; } }
  GetMeta(cellIdentification: any) { if (this.JSpreadsheet) { return this.JSpreadsheet.getMeta(cellIdentification); } else { return null; } }
  SetMeta(Data: any) { if (this.JSpreadsheet) { return this.JSpreadsheet.setMeta(Data); } else { return null; } }
  Fullscreen(fullscreen: boolean) { if (this.JSpreadsheet) { return this.JSpreadsheet.fullscreen(fullscreen); } else { return null; } }
  GetSelectedRows(asIds: boolean) { if (this.JSpreadsheet) { return this.JSpreadsheet.getSelectedRows(asIds); } else { return null; } }
  GetSelectedColumns() { if (this.JSpreadsheet) { return this.JSpreadsheet.getSelectedColumns(); } else { return null; } }
  ShowIndex() { if (this.JSpreadsheet) { return this.JSpreadsheet.showIndex(); } else { return null; } }
  HideIndex() { if (this.JSpreadsheet) { return this.JSpreadsheet.hideIndex(); } else { return null; } }
  Search(searchString: string) { if (this.JSpreadsheet) { return this.JSpreadsheet.search(searchString); } else { return null; } }
  ResetSearch() { if (this.JSpreadsheet) { return this.JSpreadsheet.resetSearch(); } else { return null; } }
  WhichPage() { if (this.JSpreadsheet) { return this.JSpreadsheet.whichPage(); } else { return null; } }
  Page(pageNumber: number) { if (this.JSpreadsheet) { return this.JSpreadsheet.page(pageNumber); } else { return null; } }
  Undo() { if (this.JSpreadsheet) { return this.JSpreadsheet.undo(); } else { return null; } }
  Redo() { if (this.JSpreadsheet) { return this.JSpreadsheet.redo(); } else { return null; } }
}
