import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRootRoutingModule } from './app-root-routing.module';
import { AppRootComponent } from './app-root.component';
import { environment } from '../../environments/environment';
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';

@NgModule({
  imports: [CommonModule, environment.production ? [] : AkitaNgDevtools.forRoot(), AppRootRoutingModule],
  declarations: [AppRootComponent],
  bootstrap: [AppRootComponent]
})
export class AppModule {}
