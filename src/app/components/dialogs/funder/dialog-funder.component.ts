import { Component } from '@angular/core';
import { MaterialModule } from '../../../modules/material.module';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DatabaseService } from '../../../services/database.service';
import { MatSnackBar } from '@angular/material/snack-bar';

const NAME_PATTERN = "^[a-zA-Z]+(?:[-' ][a-zA-Z]+)*$"
const NUMBER_PATTERN = "^[0-9]*$"

@Component({
  selector: 'app-dialog-funder',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './dialog-funder.component.html',
  styleUrl: './dialog-funder.component.scss'
})
export class DialogFunderComponent {
  
  formGroup = new FormGroup({
    name: new FormControl(null, [
      Validators.required,
      Validators.pattern(NAME_PATTERN)
    ]),
    website: new FormControl(null, [
      Validators.required,
      Validators.pattern(NAME_PATTERN)
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
    address: new FormControl(null, [])
  });

  constructor(private database: DatabaseService, private snackbar: MatSnackBar) {}

  public insert(): void {
    this.database.insert({
      'funders': [{
        name: this.formGroup.controls.name.value,
        website: this.formGroup.controls.website.value,
        address: this.formGroup.controls.address.value,
        phone: this.formGroup.controls.phone.value,
        email: this.formGroup.controls.email.value
      }]
    }).then(() => {
      this.database.readDatabase();
      this.snackbar.open('Funder added', 'Dismiss', { duration: 5 * 1000 });
    });
  }

}
