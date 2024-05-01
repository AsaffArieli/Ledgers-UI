import { animate, state, style, transition, trigger } from '@angular/animations';
import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, OnInit, ViewChild, forwardRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MaterialModule } from '../../../modules/material.module';
import { DatabaseService } from '../../../services/database.service';
import { TemplateTableComponent } from '../../../templates/table/template-table.component';
import { ProfileModel } from '../../../models/database';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ActivatedRoute } from '@angular/router';
import { distinctUntilChanged, filter, map, merge, startWith, switchMap, tap, withLatestFrom } from 'rxjs';

const COLUMNS = ['select', 'id', 'name', 'phone', 'email', 'website'];

@Component({
  selector: 'app-database-table',
  standalone: true,
  imports: [MaterialModule, forwardRef(() => TemplateTableComponent)],
  templateUrl: './database-table.component.html',
  styleUrl: './database-table.component.scss',
  animations: [
    trigger('detailExpand', [
      state('collapsed,void', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class DatabaseTableComponent implements OnInit, AfterViewInit {
  columns: string[] = COLUMNS;
  dataSource: MatTableDataSource<ProfileModel> = new MatTableDataSource([]);
  expandedElement: any;
  selection = new SelectionModel<ProfileModel>(true, []);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private databaseService: DatabaseService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.selection.changed.subscribe(() => this.databaseService.selected = this.selection.selected);
  }

  public toggleAllRows(): void {
    this.selection.selected.length === this.dataSource.data.length ? this.selection.clear() : this.selection.select(...this.dataSource.data);
  }

  ngAfterViewInit(): void {
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    merge(this.sort.sortChange, this.paginator.page, this.route.params)
      .pipe(
        startWith({}),
        withLatestFrom(this.route.params),
        switchMap(([_, params]) =>
          this.databaseService.dataStream(params['table'])
            .pipe(
              tap(data => this.paginator.length = data.length),
              map(data => sliceData(data, this.paginator.pageIndex, this.paginator.pageSize))
            )
        ),
        filter(data => !!data),
        distinctUntilChanged()
      )
      .subscribe(data => {
        this.dataSource.data = data;
      });
  }
}

function sliceData(data: any[], page: number, pageItems: number): any[] {
  return data.slice(page * pageItems, (page + 1) * (pageItems > data.length ? data.length : pageItems));
}

/*
export class DatabaseTableComponent<T> implements OnInit, OnChanges {

  @Input() columns: string[] = [];
  @Input() dataSource: MatTableDataSource<T>;
  expandedElement: any;
  selection = new SelectionModel<any>(true, []);

  @ContentChildren(MatHeaderRowDef) headerRowDefs: QueryList<MatHeaderRowDef>;
  @ContentChildren(MatRowDef) rowDefs: QueryList<MatRowDef<T>>;
  @ContentChildren(MatColumnDef) columnDefs: QueryList<MatColumnDef>;
  @ContentChild(MatNoDataRow) noDataRow: MatNoDataRow;
  @ViewChild(MatTable, { static: true }) table: MatTable<T>;

  constructor(private databaseService: DatabaseService) {}

  ngOnInit(): void {
    this.selection.changed.subscribe(() => this.databaseService.selected = this.selection.selected);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ((changes['dataSource']) && this.dataSource && this.columns) {
      this.initTable();
    }
  }

  toggleAllRows(): void {
    this.selection.selected.length === this.dataSource.data.length ? this.selection.clear() : this.selection.select(...this.dataSource.data);
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

*/