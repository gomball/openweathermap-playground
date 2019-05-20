import { NgModule } from '@angular/core';
import { MatDialogModule, MatListModule, MatSliderModule, MatTableModule, MatToolbarModule } from '@angular/material';
import { ModalService } from 'src/app/core/services/modal/modal.service';
import { SharedModule } from '../../shared/shared.module';
import { CityHistoryComponent } from './components/city-history/city-history.component';
import { CityMapComponent } from './components/city-map/city-map.component';
import { CityWeatherComponent } from './components/city-weather/city-weather.component';
import { OwmService } from './services/owm/owm-service';
import { WeatherDashboardComponent } from './views/weather-dashboard/weather-dashboard.component';
import { WeatherDashboardRoutingModule } from './weather-dashboard-routing.module';

@NgModule({
  imports: [MatDialogModule, MatListModule, MatSliderModule, MatTableModule, MatToolbarModule, SharedModule, WeatherDashboardRoutingModule],
  declarations: [CityHistoryComponent, CityMapComponent, CityWeatherComponent, WeatherDashboardComponent],
  entryComponents: [CityHistoryComponent, CityMapComponent],
  exports: [],
  providers: [
    ModalService, // => provided here again intenttionally
    OwmService
  ]
})
export class WeatherDashboardModule {}
