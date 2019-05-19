import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { City } from '../../../../domain/city';
import { CityHistoryRecord } from '../../state/city-history.store';

export interface CityHistoryComponentInput {
  city: City;
  data: CityHistoryRecord[];
}

@Component({
  selector: 'owm-pg-city-history',
  templateUrl: './city-history.component.html',
  styleUrls: ['./city-history.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CityHistoryComponent {
  constructor(
    public readonly dialogRef: MatDialogRef<CityHistoryComponent>,
    @Inject(MAT_DIALOG_DATA) public readonly data: CityHistoryComponentInput
  ) {}
}
