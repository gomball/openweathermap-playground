import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { AbstractControl, FormControl, ValidatorFn } from '@angular/forms';
import { Subject } from 'rxjs';
import { filter, first, takeUntil } from 'rxjs/operators';
import { CityQuery } from '../../state/city.query';
import { CityService } from '../../state/city.service';

const SELECTED_CITIES_INITAL_VALUE_IDS = [3435910, 3936456, 3871336, 3448439];

@Component({
  selector: 'owm-pg-city-selector',
  templateUrl: './city-selector.component.html',
  styleUrls: ['./city-selector.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CitySelectorComponent implements OnDestroy {
  private _destrotSubj = new Subject<void>();
  citiesFormControl = new FormControl([], [lengthValidator(1, 'min'), lengthValidator(4, 'max')]);

  constructor(cityService: CityService, cityQuery: CityQuery) {
    this.citiesFormControl.valueChanges
      .pipe(takeUntil(this._destrotSubj.asObservable()))
      .subscribe((cities) => cityService.setSelectedCities(cities));
    cityQuery.available$
      .pipe(
        takeUntil(this._destrotSubj.asObservable()),
        filter((availableCities) => !!availableCities && !!availableCities.length),
        first()
      )
      .subscribe((availableCities) => {
        this.citiesFormControl.setValue(availableCities.filter((c) => SELECTED_CITIES_INITAL_VALUE_IDS.includes(c.id)));
      });
  }

  ngOnDestroy(): void {
    this._destrotSubj.next();
    this._destrotSubj.unsubscribe();
  }
}

const lengthValidator: (length: number, mode: 'max' | 'min') => ValidatorFn = (length: number, mode: 'max' | 'min') => {
  return (control: AbstractControl): { [key: string]: any } => {
    const value = control.value as any[];
    const valid = mode === 'max' ? value.length <= length : value.length >= length;
    return valid ? null : { minLength: { value } };
  };
};
