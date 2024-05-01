import { Component, EventEmitter, OnInit, Output, Type } from '@angular/core';
import { MaterialModule } from '../../modules/material.module';
import { RouterLink } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';
import { Observable, combineLatest, debounceTime, distinctUntilChanged, map, startWith } from 'rxjs';
import { DatabaseService } from '../../services/database.service';
import { DialogMerchantComponent } from '../dialogs/merchant/dialog-merchant.component';
import { DialogOwnerComponent } from '../dialogs/owner/dialog-owner.component';
import { DialogFunderComponent } from '../dialogs/funder/dialog-funder.component';
import { DialogKeyComponent } from '../dialogs/key/dialog-key.component';
import { DialogGuidelineComponent } from '../dialogs/guideline/dialog-guideline.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MaterialModule,
    RouterLink
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  public formControl = new FormControl(null);
  public options: Observable<any> = combineLatest([
    this.formControl.valueChanges,
    this.databaseService.data
  ]).pipe(
      startWith(''),
      debounceTime(50),
      distinctUntilChanged(),
      map(([filter, database]) => _filter(filter, database).slice(0, 5))
    );
  @Output() sidebar = new EventEmitter<void>();

  constructor(private databaseService: DatabaseService, public dialog: MatDialog) { }

  public openForm(component: string) {
    switch (component) {
      case 'merchant':
        this.dialog.open(DialogMerchantComponent);
        break;
      case 'owner':
        this.dialog.open(DialogOwnerComponent);
        break;
      case 'funder':
        this.dialog.open(DialogFunderComponent);
        break;
      case 'key':
        this.dialog.open(DialogKeyComponent);
        break;
      case 'guideline':
        this.dialog.open(DialogGuidelineComponent);
        break;
    }
  }
}

function _filter(filter: string, database: any[]): any[] {
  filter = filter ? filter.toLowerCase() : '';
  return database && filter !== '' ? database.filter(element =>
    (element.ein ? element.ein.toLowerCase().includes(filter) : false) ||
    (element.ssn ? element.ssn.toLowerCase().includes(filter) : false) ||
    (element.name ? element.name.toLowerCase().includes(filter) : false) ||
    (element.email ? element.email.toLowerCase().includes(filter) : false) ||
    (element.phone ? element.phone.toLowerCase().includes(filter) : false) ||
    (element.address ? element.address.toLowerCase().includes(filter) : false)
  ) : [];
}