import { Component } from '@angular/core';
import { MaterialModule } from '../../../../modules/material.module';
import { BankingMonthlyComponent } from '../monthly/banking-monthly.component';
import { BankingStatsComponent } from '../stats/banking-stats.component';
import { TemplateChartComponent } from '../../../../templates/chart/template-chart.component';

@Component({
  selector: 'app-banking-overview',
  standalone: true,
  imports: [MaterialModule, BankingMonthlyComponent, BankingStatsComponent, TemplateChartComponent],
  templateUrl: './banking-overview.component.html',
  styleUrl: './banking-overview.component.scss'
})
export class BankingOverviewComponent {

}
