import { HttpClientModule } from '@angular/common/http';
import { Injector, ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatMenuModule,
  MatSnackBarModule,
  MatToolbarModule
} from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { TranslateModule as NgxTranslateModule } from '@ngx-translate/core';
import { MainCanvasComponent } from './components/main-canvas/main-canvas.component';
import { OwmAppidPrompterComponent } from './components/owm-appid-prompter/owm-appid-prompter.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { APP_CONFIGURATION, AppConfigurationContract } from './configuration/app-configuration.contract';
import {
  APP_INITIALIZER_PROVIDERS,
  LOCALE_ID_PROVIDER,
  HTTP_INTERCEPTORS_PROVIDERS,
  MATERIAL_PROVIDERS,
  NGX_TRANSLATE_CONFIGURATION
} from './core.providers';
import { AppServiceLocator } from './services/app-service-locator';

const COMPONENTS = [MainCanvasComponent, OwmAppidPrompterComponent, ToolbarComponent];
const ENTRY_COMPONENTS = [OwmAppidPrompterComponent];

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatSnackBarModule,
    MatToolbarModule,
    NgxTranslateModule.forRoot(NGX_TRANSLATE_CONFIGURATION)
  ],
  declarations: [...COMPONENTS],
  entryComponents: [...ENTRY_COMPONENTS],
  exports: [MainCanvasComponent]
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
      providers: [
        { provide: APP_CONFIGURATION, useValue: appConfiguration },
        LOCALE_ID_PROVIDER,
        ...APP_INITIALIZER_PROVIDERS,
        ...HTTP_INTERCEPTORS_PROVIDERS,
        ...MATERIAL_PROVIDERS
      ]
    };
  }
}
