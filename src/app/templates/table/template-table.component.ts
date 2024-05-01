import { AfterContentInit, Component, ContentChild, ContentChildren, Input, OnChanges, QueryList, SimpleChanges, ViewChild } from '@angular/core';
import { MaterialModule } from '../../modules/material.module';
import { MatColumnDef, MatHeaderRowDef, MatNoDataRow, MatRowDef, MatTable, MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'template-table',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './template-table.component.html',
  styleUrl: './template-table.component.scss'
})
export class TemplateTableComponent<T> implements OnChanges, AfterContentInit {

  @Input() columns: string[] = [];
  @Input() dataSource: MatTableDataSource<T>;
  render: boolean = false;
  
  @ContentChildren(MatHeaderRowDef) headerRowDefs: QueryList<MatHeaderRowDef>;
  @ContentChildren(MatRowDef) rowDefs: QueryList<MatRowDef<T>>;
  @ContentChildren(MatColumnDef) columnDefs: QueryList<MatColumnDef>;
  @ContentChild(MatNoDataRow) noDataRow: MatNoDataRow;
  @ViewChild(MatTable, { static: true }) table: MatTable<T>;

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    if ((changes['dataSource'] || changes['columns']) && this.render && this.dataSource && this.columns) {
      this.initTable();
    }
  }

  ngAfterContentInit(): void {
    this.render = true;
    this.initTable();
  }

  private initTable(): void {
    if (this.columnDefs && this.rowDefs && this.headerRowDefs && this.table) {
      this.columnDefs.forEach(columnDef => this.table.addColumnDef(columnDef));
      this.rowDefs.forEach(rowDef => this.table.addRowDef(rowDef));
      this.headerRowDefs.forEach(headerRowDef => this.table.addHeaderRowDef(headerRowDef));
      this.table.setNoDataRow(this.noDataRow);
    }
  }
}
