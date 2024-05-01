import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MaterialModule } from '../../modules/material.module';
import { ParserFormComponent } from './form/parser-form.component';
import { FormPageComponent } from '../../templates/form-page/form-page.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-parser',
  standalone: true,
  imports: [MaterialModule, FormPageComponent, ParserFormComponent, RouterOutlet],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './parser.component.html',
  styleUrl: './parser.component.scss'
})
export class ParserComponent {

}