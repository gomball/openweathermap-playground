import { HttpClientModule } from '@angular/common/http';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [BrowserModule, BrowserAnimationsModule, HttpClientModule, RouterModule],
  declarations: []
})
export class CoreModule {
  constructor(
    @Optional()
    @SkipSelf()
    parentModule: CoreModule
  ) {
    if (!!parentModule) {
      console.error('"CoreModule" already loaded. Import it _ONLY_ on main "AppModule".');
    }
  }
}
