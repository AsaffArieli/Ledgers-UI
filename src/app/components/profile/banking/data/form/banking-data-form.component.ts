import { Component } from '@angular/core';
import { MaterialModule } from '../../../../../modules/material.module';
import { BankingConfigModel, FilterModel } from '../../../../../models/interfaces';
import { Observable, firstValueFrom } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
import { BankingService } from '../../../../../services/banking.service';


const OPERATIONS = [
  { value: '=', tooltip: 'Equal' },
  { value: '>=', tooltip: 'Larger/Equal' },
  { value: '>', tooltip: 'Larger' },
  { value: '<=', tooltip: 'Smaller/Equal' },
  { value: '<', tooltip: 'Smaller' }
];

@Component({
  selector: 'app-banking-data-form',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './banking-data-form.component.html',
  styleUrl: './banking-data-form.component.scss'
})
export class BankingDataFormComponent {

  sortOptions = ['date', 'section', 'description', 'amount', 'balance'];
  groupOptions = ['statements', 'balances', 'transactions', 'sections', 'accounts', 'positions'];
  filterColumns = ['date', 'section', 'description', 'amount', 'balance', 'key'];
  filterOperations = OPERATIONS;
  
  config: Observable<BankingConfigModel>;

  resultsLength = 0;
  form: FormGroup;

  constructor(private bankingService: BankingService) { }

  ngOnInit(): void {


    this.config = this.bankingService.config;
    (async () => {
      const config = await firstValueFrom(this.bankingService.config);
      this.form = new FormGroup({
        group: new FormControl(config.group),
        sort: new FormControl(config.sort),
        order: new FormControl(config.order),
        filterBy: new FormControl(null),
        filters: new FormControl(config.filters),
        startDate: new FormControl(null),
        endDate: new FormControl(null),
        operation: new FormControl('='),
        filter: new FormControl(null),
        section: new FormControl(null)
      });
    })();
  }

  fieldChange() {
    
  }

  private currentFilter(): FilterModel[] {
    const filterBy = this.form.get('filterBy').value;
    const type = ['amount', 'balance'].includes(filterBy) ? 'number' : filterBy === 'date' ? 'date' : 'text';
    const filter = {
      type: type,
      column: filterBy === 'section' && ['deposit', 'withdrawal'].includes(this.form.get('section').value) ? 'operation' : this.form.get('filterBy').value,
      active: true,
      operation: type === 'number' ? this.form.get('operation').value : type === 'date' ? '>=' : null,
      filter: type === 'date' ? this.form.get('startDate').value : (filterBy === 'section' ? this.form.get('section').value : this.form.get('filter').value)
    }
    return type === 'date' ? [filter, {
      type: type,
      column: this.form.get('filterBy').value,
      active: true,
      operation: '<=',
      filter: this.form.get('endDate').value
    }] : [filter];
  }

}
