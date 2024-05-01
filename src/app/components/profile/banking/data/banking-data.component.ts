import { Component } from '@angular/core';
import { MaterialModule } from '../../../../modules/material.module';
import { BankingDataFormComponent } from './form/banking-data-form.component';

@Component({
  selector: 'app-banking-data',
  standalone: true,
  imports: [MaterialModule, BankingDataFormComponent],
  templateUrl: './banking-data.component.html',
  styleUrl: './banking-data.component.scss'
})
export class BankingDataComponent {

}
