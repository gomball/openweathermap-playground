import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { APP_INITIALIZER, Provider } from '@angular/core';
import { GestureConfig, MatIconRegistry } from '@angular/material';
import { DomSanitizer, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import {
  MissingTranslationHandler as NgxMissingTranslationHandler,
  TranslateLoader as NgxTranslateLoader,
  TranslateModuleConfig as NgxTranslateModuleConfig
} from '@ngx-translate/core';
import { HttpErrorInterceptor } from './interceptors/http-error/http-error.interceptor';
import { HttpRequestCounterInterceptor } from './interceptors/http-request-counter/http-request-counter.interceptor';
import { I18nService } from './services/i18n/i18n.service';
import { MissingTranslationHandler } from './types/missing-translation-handler';
import { TranslationLoader } from './types/translation-loader';

export const initializeLangFnFactory = (i18nService: I18nService): (() => Promise<any>) => () =>
  new Promise((resolve, reject) => {
    setTimeout(() => resolve());
  });

export const registerMdiIconsFnFactory = (matIconRegistry: MatIconRegistry, domSanitizer: DomSanitizer): (() => Promise<any>) => () =>
  new Promise((resolve, reject) => {
    matIconRegistry.addSvgIconSet(domSanitizer.bypassSecurityTrustResourceUrl('./assets/icons/mdi.svg'));
    resolve();
  });

export const APP_INITIALIZER_PROVIDERS: Provider[] = [
  {
    provide: APP_INITIALIZER,
    useFactory: registerMdiIconsFnFactory,
    deps: [MatIconRegistry, DomSanitizer],
    multi: true
  }
];

export const HTTP_INTERCEPTORS_PROVIDERS: Provider[] = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: HttpRequestCounterInterceptor,
    multi: true
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: HttpErrorInterceptor,
    multi: true
  }
];

export const MATERIAL_PROVIDERS: Provider[] = [{ provide: HAMMER_GESTURE_CONFIG, useClass: GestureConfig }];

export const NGX_TRANSLATE_TRANSLATION_LOADER_PROVIDER: Provider = {
  provide: NgxTranslateLoader,
  useClass: TranslationLoader
};

export const ngxTranslateMissingTranslationHandlerFactory = () => new MissingTranslationHandler();

export const NGX_TRANSLATE_MISSING_TRANSLATION_HANDLER_PROVIDER: Provider = {
  provide: NgxMissingTranslationHandler,
  useFactory: ngxTranslateMissingTranslationHandlerFactory,
  deps: []
};

export const NGX_TRANSLATE_CONFIGURATION: NgxTranslateModuleConfig = {
  loader: NGX_TRANSLATE_TRANSLATION_LOADER_PROVIDER,
  missingTranslationHandler: NGX_TRANSLATE_MISSING_TRANSLATION_HANDLER_PROVIDER
};
