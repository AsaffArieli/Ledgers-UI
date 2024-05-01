import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatTabsModule } from '@angular/material/tabs';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatSortModule } from '@angular/material/sort';
import { ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatChipsModule } from '@angular/material/chips';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTreeModule } from '@angular/material/tree'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

const materliaModule = [
  MatToolbarModule,
  MatButtonModule,
  MatIconModule,
  MatSidenavModule,
  MatButtonToggleModule,
  MatTabsModule,
  MatAutocompleteModule,
  MatInputModule,
  MatFormFieldModule,
  MatTableModule,
  MatCardModule,
  MatSortModule,
  CommonModule,
  ReactiveFormsModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatSelectModule,
  MatListModule,
  MatButtonModule,
  MatExpansionModule,
  MatChipsModule,
  MatSlideToggleModule,
  MatCheckboxModule,
  MatDividerModule,
  MatTooltipModule,
  MatMenuModule,
  MatDialogModule,
  MatTreeModule,
  MatProgressSpinnerModule,
]

@NgModule({
  declarations: [],
  imports: [
    ...materliaModule
  ],
  exports: [
    ...materliaModule
  ]
})
export class MaterialModule { }
