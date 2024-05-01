import { Component } from '@angular/core';
import { DatabaseService } from '../../../services/database.service';
import { Observable } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MaterialModule } from '../../../modules/material.module';
import { SchemeModel } from '../../../models/parser';
import { ParserService } from '../../../services/parser.service';

@Component({
  selector: 'app-dialog-key',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './dialog-key.component.html',
  styleUrl: './dialog-key.component.scss'
})
export class DialogKeyComponent {

  public formGroup = new FormGroup({
    parser: new FormControl('Bank Statement', [
      Validators.required,
    ]),
    pattern: new FormControl(null, [
      Validators.required,
    ]),
    bank: new FormControl(null, [
      Validators.required
    ]),
    type: new FormControl('funder', [
      Validators.required
    ]),
    funder: new FormControl(null, [])
  });

  constructor(private parserService: ParserService, private databaseService: DatabaseService) {}

  get schemes(): Observable<SchemeModel[]> {
    return this.parserService.schemes;
  }

  get funders(): Observable<any[]> {
    return this.databaseService.funders;
  }

  public insert(): void {
    const type = this.formGroup.get('type').value;
    this.parserService.insert([{
      scheme_id: this.formGroup.get('bank').value[0],
      type: 'key',
      kind: type,
      name: '',
      value_1: this.formGroup.get('pattern').value,
      value_2: type === 'funder' ? this.formGroup.get('funder').value[0] : null
    }])
  }
}
