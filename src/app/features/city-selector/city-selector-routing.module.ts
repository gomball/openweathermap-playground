import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CitySelectorComponent } from './components/city-selector/city-selector.component';

const routes: Routes = [{ path: '', component: CitySelectorComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CitySelectorRoutingModule {}
