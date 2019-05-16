import { HttpClientModule } from '@angular/common/http';
import { Injector, ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { TranslateModule as NgxTranslateModule } from '@ngx-translate/core';
import { APP_CONFIGURATION, AppConfigurationContract } from './configuration/app-configuration.contract';
import { APP_INITIALIZER_PROVIDERS, HTTP_INTERCEPTORS_PROVIDERS, NGX_TRANSLATE_CONFIGURAION } from './core.providers';
import { AppServiceLocator } from './services/app-service-locator';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatSnackBarModule,
    MatToolbarModule,
    NgxTranslateModule.forRoot(NGX_TRANSLATE_CONFIGURAION)
  ],
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

  static forRoot(appConfiguration: AppConfigurationContract): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [{ provide: APP_CONFIGURATION, useValue: appConfiguration }, ...APP_INITIALIZER_PROVIDERS, ...HTTP_INTERCEPTORS_PROVIDERS]
    };
  }
}
