import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExistSelectedCitiesGuard } from './guards/exist-selected-cities/exist-selected-cities.guard';
import { WeatherDashboardComponent } from './views/weather-dashboard/weather-dashboard.component';

const routes: Routes = [{ path: '', component: WeatherDashboardComponent, canActivate: [ExistSelectedCitiesGuard] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WeatherDashboardRoutingModule {}
