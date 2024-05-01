import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormPageComponent } from '../../templates/form-page/form-page.component';
import { MaterialModule } from '../../modules/material.module';
import { DatabaseTableComponent } from './table/database-table.component';
import { DatabaseFormComponent } from './form/database-form.component';
import { RouterOutlet } from '@angular/router';
import { DatabaseService } from '../../services/database.service';

@Component({
  selector: 'app-database',
  standalone: true,
  imports: [
    MaterialModule,
    FormPageComponent,
    DatabaseTableComponent,
    DatabaseFormComponent,
    RouterOutlet
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './database.component.html',
  styleUrl: './database.component.scss'
})
export class DatabaseComponent {

  constructor(private databaseService: DatabaseService) {}

  public remove(): void {
    this.databaseService.delete().then(() => this.databaseService.readDatabase());
  }

  public refresh(): void {
    this.databaseService.readDatabase();
  }
}
