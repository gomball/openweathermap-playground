import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { CityWeatherComponent } from './components/city-weather/city-weather.component';
import { WeatherDashboardComponent } from './views/weather-dashboard/weather-dashboard.component';
import { WeatherDashboardRoutingModule } from './weather-dashboard-routing.module';

@NgModule({
  imports: [SharedModule, WeatherDashboardRoutingModule],
  declarations: [CityWeatherComponent, WeatherDashboardComponent],
  exports: []
})
export class WeatherDashboardModule {}
