import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRootRoutingModule } from './app-root-routing.module';
import { AppRootComponent } from './app-root.component';

@NgModule({
  imports: [BrowserModule, AppRootRoutingModule],
  declarations: [AppRootComponent],
  bootstrap: [AppRootComponent]
})
export class AppModule {}
