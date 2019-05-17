import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'owm-pg-weather-dashboard',
  templateUrl: './weather-dashboard.component.html',
  styleUrls: ['./weather-dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WeatherDashboardComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
