import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { AbstractControl, FormControl, ValidatorFn } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CityService } from '../../state/city.service';

const lengthValidator: (length: number, mode: 'max' | 'min') => ValidatorFn = (length: number, mode: 'max' | 'min') => {
  return (control: AbstractControl): { [key: string]: any } => {
    const value = control.value as any[];
    const valid = mode === 'max' ? value.length <= length : value.length >= length;
    return valid ? null : { minLength: { value } };
  };
};

@Component({
  selector: 'owm-pg-city-selector',
  templateUrl: './city-selector.component.html',
  styleUrls: ['./city-selector.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CitySelectorComponent implements OnDestroy {
  private _destrotSubj = new Subject<void>();
  citiesFormControl = new FormControl([], [lengthValidator(1, 'min'), lengthValidator(4, 'max')]);

  constructor(cityService: CityService) {
    this.citiesFormControl.valueChanges
      .pipe(takeUntil(this._destrotSubj.asObservable()))
      .subscribe((cities) => cityService.setSelectedCities(cities));
  }

  ngOnDestroy(): void {
    this._destrotSubj.next();
    this._destrotSubj.unsubscribe();
  }
}
