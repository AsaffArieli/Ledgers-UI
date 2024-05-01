import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormPageComponent } from '../../../templates/form-page/form-page.component';
import { MaterialModule } from '../../../modules/material.module';

@Component({
  selector: 'app-guidelines',
  standalone: true,
  imports: [MaterialModule, FormPageComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './guidelines.component.html',
  styleUrl: './guidelines.component.scss'
})
export class GuidelinesComponent {

  constructor() {}

  public remove(): void {
    
  }

  public refresh(): void {
    
  }
}
