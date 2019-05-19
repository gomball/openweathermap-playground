import { NgModule } from '@angular/core';
import { MatListModule, MatSliderModule } from '@angular/material';
import { SharedModule } from '../../shared/shared.module';
import { CityWeatherComponent } from './components/city-weather/city-weather.component';
import { OwmService } from './services/owm/owm-service';
import { WeatherDashboardComponent } from './views/weather-dashboard/weather-dashboard.component';
import { WeatherDashboardRoutingModule } from './weather-dashboard-routing.module';

@NgModule({
  imports: [MatListModule, MatSliderModule, SharedModule, WeatherDashboardRoutingModule],
  declarations: [CityWeatherComponent, WeatherDashboardComponent],
  exports: [],
  providers: [OwmService]
})
export class WeatherDashboardModule {}
