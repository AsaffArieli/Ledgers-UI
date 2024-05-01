import { AfterViewInit, Component, OnInit, ViewChild, forwardRef } from '@angular/core';
import { MaterialModule } from '../../../../modules/material.module';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ProfileModel } from '../../../../models/database';
import { DatabaseService } from '../../../../services/database.service';
import { TemplateTableComponent } from '../../../../templates/table/template-table.component';

const COLUMNS = ['month', 'name', 'phone', 'email', 'website'];

@Component({
  selector: 'app-banking-monthly',
  standalone: true,
  imports: [MaterialModule, forwardRef(() => TemplateTableComponent)],
  templateUrl: './banking-monthly.component.html',
  styleUrl: './banking-monthly.component.scss'
})
export class BankingMonthlyComponent implements OnInit, AfterViewInit {
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
