import { trigger, state, style, transition, animate } from '@angular/animations';
import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, OnInit, ViewChild, forwardRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ProfileModel } from '../../../../models/database';
import { MaterialModule } from '../../../../modules/material.module';
import { TemplateTableComponent } from '../../../../templates/table/template-table.component';

const COLUMNS = ['select', 'id', 'name', 'phone', 'email', 'website'];

@Component({
  selector: 'app-underwriting-funders',
  standalone: true,
  imports: [MaterialModule, forwardRef(() => TemplateTableComponent)],
  templateUrl: './underwriting-funders.component.html',
  styleUrl: './underwriting-funders.component.scss',
  animations: [
    trigger('detailExpand', [
      state('collapsed,void', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class UnderwritingFundersComponent implements OnInit, AfterViewInit {
  columns: string[] = COLUMNS;
  dataSource: MatTableDataSource<ProfileModel> = new MatTableDataSource([]);
  expandedElement: any;
  selection = new SelectionModel<ProfileModel>(true, []);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor() { }

  ngOnInit(): void {
    this.selection.changed.subscribe(() => {});
  }

  public toggleAllRows(): void {
    this.selection.selected.length === this.dataSource.data.length ? this.selection.clear() : this.selection.select(...this.dataSource.data);
  }

  ngAfterViewInit(): void {
  }
}