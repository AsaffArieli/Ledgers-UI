import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { MaterialModule } from '../../../modules/material.module';
import { FormPageComponent } from '../../../templates/form-page/form-page.component';

@Component({
  selector: 'app-keys',
  standalone: true,
  imports: [MaterialModule, FormPageComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './keys.component.html',
  styleUrl: './keys.component.scss'
})
export class KeysComponent {

  constructor() {}

  public remove(): void {
    
  }

  public refresh(): void {
    
  }
}
