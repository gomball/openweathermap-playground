import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { WeatherDashboardRoutingModule } from './weather-dashboard-routing.module';

@NgModule({
  imports: [SharedModule, WeatherDashboardRoutingModule],
  declarations: []
})
export class WeatherDashboardModule {}
