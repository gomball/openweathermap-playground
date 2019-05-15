import { HttpClientModule } from '@angular/common/http';
import { Injector, ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { APP_INITIALIZER_PROVIDERS } from './core.providers';
import { AppServiceLocator } from './services/app-service.locator';

@NgModule({
  imports: [BrowserModule, BrowserAnimationsModule, HttpClientModule, RouterModule],
  declarations: []
})
export class CoreModule {
  constructor(
    @Optional()
    @SkipSelf()
    parentModule: CoreModule,
    injector: Injector
  ) {
    if (!!parentModule) {
      console.error('"CoreModule" already loaded. Import it _ONLY_ on main "AppModule".');
    }
    AppServiceLocator.injector = injector;
  }

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [APP_INITIALIZER_PROVIDERS]
    };
  }
}
