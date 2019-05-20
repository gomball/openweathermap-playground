import { ChangeDetectionStrategy, Component, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { City } from '../../../../domain/city';
import { CurrentWeatherContract } from '../../services/owm/owm-dto.contracts';
import { CityHistoryQuery } from '../../state/city-history.query';

export interface CityHistoryComponentInput {
  city: City;
}

@Component({
  selector: 'owm-pg-city-history',
  templateUrl: './city-history.component.html',
  styleUrls: ['./city-history.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CityHistoryComponent implements OnDestroy {
  private readonly _destroySubj = new Subject<void>();
  gridColumns = ['dateTime', 'condition', 'temperature', 'pressure', 'humidity', 'cloudiness', 'wind'];
  history$: Observable<CurrentWeatherContract[]>;

  constructor(
    cityHistoryQuery: CityHistoryQuery,
    public readonly dialogRef: MatDialogRef<CityHistoryComponent>,
    @Inject(MAT_DIALOG_DATA) public readonly data: CityHistoryComponentInput
  ) {
    this.history$ = cityHistoryQuery.getCityHistory$(data.city.id).pipe(takeUntil(this._destroySubj.asObservable()));
  }

  ngOnDestroy(): void {
    this._destroySubj.next();
    this._destroySubj.unsubscribe();
  }
}
