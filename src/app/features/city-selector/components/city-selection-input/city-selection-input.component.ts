import { ENTER } from '@angular/cdk/keycodes';
import { ChangeDetectionStrategy, Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { City } from '../../../../domain/city';
import { CityQuery } from '../../state/city.query';
import { CityService } from '../../state/city.service';

@Component({
  selector: 'owm-pg-city-selection-input',
  templateUrl: './city-selection-input.component.html',
  styleUrls: ['./city-selection-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CitySelectionInputComponent {
  ENTER = ENTER;
  citiesFormControl = new FormControl();
  availableFilteredCities$: Observable<City[]>;

  @ViewChild('cityInput') cityInput: ElementRef<HTMLInputElement>;

  constructor(private readonly _cityService: CityService, public readonly cityQuery: CityQuery) {
    this.availableFilteredCities$ = this.citiesFormControl.valueChanges.pipe(
      startWith(null),
      map((searchValue: string) =>
        !!searchValue
          ? this.cityQuery.available.filter((city) => city.name.toLowerCase().includes(searchValue))
          : [...this.cityQuery.available]
      ),
      map((available) => {
        const selectedIds = this.cityQuery.selected.map((s) => s.id);
        return available.filter((a) => !selectedIds.includes(a.id));
      })
    );
  }

  onRemoved(city: City): void {
    this._cityService.removeSelectedCity(city);
  }

  onSelected(event: MatAutocompleteSelectedEvent): void {
    this._cityService.addSelectedCity((event.option.value as unknown) as City);
    this.cityInput.nativeElement.value = '';
    this.citiesFormControl.setValue(null);
  }
}
