import { Component } from '@angular/core';
import { MaterialModule } from '../../../modules/material.module';
import { UnderwritingStatsComponent } from './stats/underwriting-stats.component';
import { UnderwritingFundersComponent } from './funders/underwriting-funders.component';
import { UnderwritingProposedComponent } from './proposed/underwriting-proposed.component';
import { UnderwritingSuggestedComponent } from './suggested/underwriting-suggested.component';
import { TemplateChartComponent } from '../../../templates/chart/template-chart.component';

@Component({
  selector: 'app-underwriting',
  standalone: true,
  imports: [
    MaterialModule,
    UnderwritingStatsComponent,
    UnderwritingFundersComponent,
    UnderwritingProposedComponent,
    UnderwritingSuggestedComponent,
    TemplateChartComponent
  ],
  templateUrl: './underwriting.component.html',
  styleUrl: './underwriting.component.scss'
})
export class UnderwritingComponent {

}
