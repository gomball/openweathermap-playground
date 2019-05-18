import { NgModule } from '@angular/core';
import { MatAutocompleteModule, MatChipsModule, MatFormFieldModule } from '@angular/material';
import { SharedModule } from '../../shared/shared.module';
import { CitySelectorRoutingModule } from './city-selector-routing.module';
import { CitySelectionInputComponent } from './components/city-selection-input/city-selection-input.component';
import { CityService } from './state/city.service';
import { CitySelectorComponent } from './views/city-selector/city-selector.component';

@NgModule({
  imports: [
    MatAutocompleteModule,
    MatFormFieldModule,
    MatChipsModule,
    SharedModule,
    CitySelectorRoutingModule
  ],
  declarations: [CitySelectionInputComponent, CitySelectorComponent],
  exports: []
})
export class CitySelectorModule {
  constructor(cityService: CityService) {
    cityService.loadCityDb();
  }
}
