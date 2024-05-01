import { AfterViewInit, Component, OnInit, ViewChild, forwardRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ProfileModel } from '../../../../models/database';
import { MaterialModule } from '../../../../modules/material.module';
import { DatabaseService } from '../../../../services/database.service';
import { TemplateTableComponent } from '../../../../templates/table/template-table.component';

const COLUMNS = ['month', 'name', 'phone', 'email', 'website'];

@Component({
  selector: 'app-banking-statements',
  standalone: true,
  imports: [MaterialModule, forwardRef(() => TemplateTableComponent)],
  templateUrl: './banking-statements.component.html',
  styleUrl: './banking-statements.component.scss'
})
export class BankingStatementsComponent implements OnInit, AfterViewInit {
  columns: string[] = COLUMNS;
  dataSource: MatTableDataSource<ProfileModel> = new MatTableDataSource([]);
  expandedElement: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private databaseService: DatabaseService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
  }
}

function sliceData(data: any[], page: number, pageItems: number): any[] {
  return data.slice(page * pageItems, (page + 1) * (pageItems > data.length ? data.length : pageItems));
}