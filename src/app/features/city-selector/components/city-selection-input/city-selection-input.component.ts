import { ENTER } from '@angular/cdk/keycodes';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { City } from '../../../../domain/city';
import { CityQuery } from '../../state/city.query';

@Component({
  selector: 'owm-pg-city-selection-input',
  templateUrl: './city-selection-input.component.html',
  styleUrls: ['./city-selection-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CitySelectionInputComponent implements ControlValueAccessor {
  emitChange: (v: City[]) => void;
  emitTouched: () => void;

  private _model: City[] = [];
  get model(): City[] {
    return this._model;
  }
  ENTER = ENTER;
  formControl = new FormControl();
  availableFilteredCities$: Observable<City[]>;

  @ViewChild('cityInput') cityInput: ElementRef<HTMLInputElement>;

  constructor(
    private readonly _controlDirective: NgControl,
    private readonly _cdr: ChangeDetectorRef,
    public readonly cityQuery: CityQuery
  ) {
    this._controlDirective.valueAccessor = this;
    this.availableFilteredCities$ = this.formControl.valueChanges.pipe(
      startWith(null),
      map((searchValue: string) =>
        !!searchValue
          ? this.cityQuery.available.filter((city) => city.name.toLowerCase().includes(searchValue))
          : [...this.cityQuery.available]
      ),
      map((available) => {
        const selectedIds = this._model.map((s) => s.id);
        return available.filter((a) => !selectedIds.includes(a.id));
      })
    );
  }

  registerOnChange(fn) {
    this.emitChange = fn;
  }

  registerOnTouched(fn) {
    this.emitTouched = fn;
  }

  writeValue(value: City[]): void {
    this._model = !!value && !!value.length ? value : [];
    setTimeout(() => {
      this.emitChange(value);
      this._cdr.markForCheck();
    });
  }

  onRemoved(city: City): void {
    this._model = this._model.filter((c) => c.id !== city.id);
    this._emit();
  }

  onSelected(event: MatAutocompleteSelectedEvent): void {
    this._model = [(event.option.value as unknown) as City, ...this._model];
    this._emit();
    this.cityInput.nativeElement.value = '';
    this.formControl.setValue(null);
  }

  private _emit(): void {
    this.emitChange(this._model);
    this.emitTouched();
  }
}
