import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CityService } from '../../state/city.service';

@Component({
  selector: 'owm-pg-city-selector',
  templateUrl: './city-selector.component.html',
  styleUrls: ['./city-selector.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CitySelectorComponent implements OnDestroy {
  private _destrotSubj = new Subject<void>();
  citiesFormControl = new FormControl();

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
