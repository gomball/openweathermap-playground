import { Component } from '@angular/core';
import { AbstractControl, FormControl, ValidatorFn } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { StorageService } from '../../services/storage/storage.service';

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

  constructor(private readonly _storageService: StorageService, public readonly dialogRef: MatDialogRef<void>) {
    const initialOwmAppid = _storageService.getValue('owmAppid');
    this.formControl.setValue(initialOwmAppid || null);
  }

  close(): void {
    this._storageService.setValue('owmAppid', this.formControl.value);
    this.dialogRef.close(this.formControl.value);
  }
}
