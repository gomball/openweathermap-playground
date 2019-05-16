import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule, MatChipsModule, MatFormFieldModule } from '@angular/material';
import { SharedModule } from '../../shared/shared.module';
import { CitySelectorRoutingModule } from './city-selector-routing.module';
import { CitySelectorComponent } from './components/city-selector/city-selector.component';

@NgModule({
  imports: [ReactiveFormsModule, MatAutocompleteModule, MatFormFieldModule, MatChipsModule, SharedModule, CitySelectorRoutingModule],
  declarations: [CitySelectorComponent],
  exports: [CitySelectorComponent]
})
export class CitySelectorModule {}
