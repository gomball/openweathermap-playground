import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { City } from '../../../../domain/city';
import { OwmService } from '../../services/owm/owm-service';

export interface CityMapComponentInput {
  city: City;
}

@Component({
  selector: 'owm-pg-city-map',
  templateUrl: './city-map.component.html',
  styleUrls: ['./city-map.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CityMapComponent implements OnInit {
  readonly mapId = 'cityMap';
  map;

  constructor(
    private readonly _owmService: OwmService,
    public readonly dialogRef: MatDialogRef<CityMapComponent>,
    @Inject(MAT_DIALOG_DATA) public readonly data: CityMapComponentInput
  ) {}

  ngOnInit(): void {
    setTimeout(() => (this.map = this._owmService.getMap(this.mapId, this.data.city)), 100);
  }
}
