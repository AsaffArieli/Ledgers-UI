import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MaterialModule } from '../../../modules/material.module';
import { BankingFormComponent } from './form/banking-form.component';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { FormPageComponent } from '../../../templates/form-page/form-page.component';

@Component({
  selector: 'app-banking',
  standalone: true,
  imports: [MaterialModule, BankingFormComponent, RouterOutlet, FormPageComponent, RouterLink ,RouterLinkActive],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './banking.component.html',
  styleUrl: './banking.component.scss'
})
export class BankingComponent {

  optionsToggle: boolean = false;
}
