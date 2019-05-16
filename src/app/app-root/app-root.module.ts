import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';
import { environment } from '../../environments/environment';
import { CoreModule } from '../core/core.module';
import { AppRootRoutingModule } from './app-root-routing.module';
import { AppRootComponent } from './app-root.component';

@NgModule({
  imports: [CommonModule, CoreModule.forRoot(environment), environment.production ? [] : AkitaNgDevtools.forRoot(), AppRootRoutingModule],
  declarations: [AppRootComponent],
  bootstrap: [AppRootComponent]
})
export class AppModule {}
