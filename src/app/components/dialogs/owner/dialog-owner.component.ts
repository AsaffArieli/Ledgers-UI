import { Component } from '@angular/core';
import { MaterialModule } from '../../../modules/material.module';
import { DatabaseService } from '../../../services/database.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, FormGroup, Validators } from '@angular/forms';

const NAME_PATTERN = "^[a-zA-Z]+(?:[-' ][a-zA-Z]+)*$"
const NUMBER_PATTERN = "^[0-9]*$"

@Component({
  selector: 'app-dialog-owner',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './dialog-owner.component.html',
  styleUrl: './dialog-owner.component.scss'
})
export class DialogOwnerComponent {

  public formGroup = new FormGroup({
    ssn: new FormControl(null, [
      Validators.required,
      Validators.minLength(9),
      Validators.maxLength(9),
      Validators.pattern(NUMBER_PATTERN)
    ]),
    name: new FormControl(null, [
      Validators.required,
      Validators.pattern(NAME_PATTERN)
    ]),
    birth_date: new FormControl(null, [
      Validators.required
    ]),
    phone: new FormControl(null, [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(10),
      Validators.pattern(NUMBER_PATTERN)
    ]),
    email: new FormControl(null, [
      Validators.email
    ]),
    fico: new FormControl(null, [
      Validators.required,
      Validators.pattern(NUMBER_PATTERN)
    ]),
    address: new FormControl(null, [])
  });

  constructor(private database: DatabaseService, private snackbar: MatSnackBar) {}

  public create(): void {
    this.database.insert({
      'owners': [{
        ssn: this.formGroup.controls.ssn.value,
        name: this.formGroup.controls.name.value,
        birth_date: this.formGroup.controls.birth_date.value,
        address: this.formGroup.controls.address.value,
        phone: this.formGroup.controls.phone.value,
        email: this.formGroup.controls.email.value,
        fico: this.formGroup.controls.fico.value
      }]
    }).then(() => {
      this.database.read();
      this.snackbar.open('Owner added', 'Dismiss', { duration: 5 * 1000 });
    });
  }
}
