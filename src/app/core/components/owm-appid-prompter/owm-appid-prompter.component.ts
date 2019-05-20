import { Component, Inject } from '@angular/core';
import { AbstractControl, FormControl, ValidatorFn } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

const regexpVaidator: (regexp: RegExp) => ValidatorFn = (regexp: RegExp) => {
  return (control: AbstractControl): { [key: string]: any } => {
    const value = control.value as string;
    const valid = regexp.test(value || '');
    return valid ? null : { regex: { value } };
  };
};

@Component({
  selector: 'owm-pg-owm-appid-prompter',
  templateUrl: './owm-appid-prompter.component.html',
  styleUrls: ['./owm-appid-prompter.component.scss']
})
export class OwmAppidPrompterComponent {
  formControl = new FormControl(null, [regexpVaidator(/^[0-9a-f]{32}$/i)]);

  constructor(public readonly dialogRef: MatDialogRef<void>, @Inject(MAT_DIALOG_DATA) public readonly initialOwmAppid: string) {
    this.formControl.setValue(initialOwmAppid || null);
  }

  close(): void {
    this.dialogRef.close(this.formControl.value);
  }
}
