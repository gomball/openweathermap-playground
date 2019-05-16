import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'owm-pg-city-selector',
  templateUrl: './city-selector.component.html',
  styleUrls: ['./city-selector.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CitySelectorComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
