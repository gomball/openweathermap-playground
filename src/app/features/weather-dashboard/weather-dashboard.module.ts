import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { WeatherDashboardComponent } from './views/weather-dashboard/weather-dashboard.component';
import { WeatherDashboardRoutingModule } from './weather-dashboard-routing.module';

@NgModule({
  imports: [SharedModule, WeatherDashboardRoutingModule],
  declarations: [WeatherDashboardComponent],
  exports: []
})
export class WeatherDashboardModule {}
