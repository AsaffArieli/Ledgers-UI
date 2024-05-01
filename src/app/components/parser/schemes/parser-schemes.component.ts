import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../../modules/material.module';
import { SchemeModel } from '../../../models/parser';
import { MatTableDataSource } from '@angular/material/table';
import { ParserService } from '../../../services/parser.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { ParserParametersComponent } from './parser-parameters/parser-parameters.component';
import { ParserSettingsComponent } from './parser-settings/parser-settings.component';

@Component({
  selector: 'app-parser-schemes',
  standalone: true,
  imports: [MaterialModule, ParserParametersComponent, ParserSettingsComponent],
  templateUrl: './parser-schemes.component.html',
  styleUrl: './parser-schemes.component.scss',
  animations: [
    trigger('detailExpand', [
      state('collapsed,void', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class ParserSchemesComponent implements OnInit {
    
  columns = ['bank', 'name'];
  dataSource: MatTableDataSource<SchemeModel> = new MatTableDataSource([]);
  expandedElement: any;

  constructor(private parserService: ParserService) {}

  ngOnInit(): void {
    this.parserService.schemes.subscribe(schemes => this.dataSource.data = schemes)
  }

}
