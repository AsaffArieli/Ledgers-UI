import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../../modules/material.module';
import { MatTableModule } from '@angular/material/table';
import { ParameterModel } from '../../../models/parser';
import { ParserService } from '../../../services/parser.service';

@Component({
  selector: 'app-parser-keys',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './parser-keys.component.html',
  styleUrl: './parser-keys.component.scss'
})
export class ParserKeysComponent implements OnInit {
  columns: string[] = ['id', 'kind', 'name', 'bank', 'value_1'];
  dataSource: ParameterModel[];

  constructor(private parserService: ParserService) {}

  ngOnInit(): void {
    this.parserService.keys.subscribe(keys => this.dataSource = keys);
  }

}
