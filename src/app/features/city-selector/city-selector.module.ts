import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { CitySelectorRoutingModule } from './city-selector-routing.module';
import { CitySelectorComponent } from './components/city-selector/city-selector.component';

@NgModule({
  imports: [SharedModule, CitySelectorRoutingModule],
  declarations: [CitySelectorComponent],
  exports: [CitySelectorComponent]
})
export class CitySelectorModule {}
