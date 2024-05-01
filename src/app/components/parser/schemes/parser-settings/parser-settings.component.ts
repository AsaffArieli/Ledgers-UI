import { Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { MaterialModule } from '../../../../modules/material.module';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-parser-settings',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './parser-settings.component.html',
  styleUrl: './parser-settings.component.scss'
})
export class ParserSettingsComponent implements OnChanges {
  @Input() data = [];
  displayedColumns: string[] = ['key', 'value', 'span'];
  dataSource:  MatTableDataSource<{key: string, value: string}>;
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
