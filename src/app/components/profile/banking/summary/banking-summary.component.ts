import { Component } from '@angular/core';
import { MaterialModule } from '../../../../modules/material.module';
import { BankingStatementsComponent } from '../statements/banking-statements.component';
import { BankingDataComponent } from '../data/banking-data.component';

@Component({
  selector: 'app-banking-summary',
  standalone: true,
  imports: [MaterialModule, BankingStatementsComponent, BankingDataComponent],
  templateUrl: './banking-summary.component.html',
  styleUrl: './banking-summary.component.scss'
})
export class BankingSummaryComponent {

}
