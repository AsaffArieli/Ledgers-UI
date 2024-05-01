import { Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ParameterModel } from '../../../../models/parser';
import { MatSort } from '@angular/material/sort';
import { MaterialModule } from '../../../../modules/material.module';

@Component({
  selector: 'app-parser-parameters',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './parser-parameters.component.html',
  styleUrl: './parser-parameters.component.scss'
})
export class ParserParametersComponent implements OnChanges {
  @Input() data = [];
  displayedColumns: string[] = ['id', 'type', 'kind', 'name', 'value_1', 'value_2'];
  dataSource:  MatTableDataSource<ParameterModel>;
  @ViewChild(MatSort) sort: MatSort;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      this.dataSource = new MatTableDataSource(this.data);
      this.dataSource.sort = this.sort;
    }
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
}