import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { APP_INITIALIZER, Provider } from '@angular/core';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import {
  MissingTranslationHandler as NgxMissingTranslationHandler,
  TranslateLoader as NgxTranslateLoader,
  TranslateModuleConfig as NgxTranslateModuleConfig
} from '@ngx-translate/core';
import { HttpRequestCounterInterceptor } from './interceptors/http-request-counter/http-request-counter.interceptor';
import { MissingTranslationHandler } from './types/missing-translation-handler';
import { TranslationLoader } from './types/translation-loader';

export const appInitializerFnFactory = (matIconRegistry: MatIconRegistry, domSanitizer: DomSanitizer): (() => Promise<any>) => () =>
  new Promise((resolve, reject) => {
    matIconRegistry.addSvgIconSet(domSanitizer.bypassSecurityTrustResourceUrl('./assets/icons/mdi.svg'));
    resolve();
  });

export const APP_INITIALIZER_PROVIDERS: Provider[] = [
  {
    provide: APP_INITIALIZER,
    useFactory: appInitializerFnFactory,
    deps: [MatIconRegistry, DomSanitizer],
    multi: true
  }
];

export const HTTP_INTERCEPTORS_PROVIDERS: Provider[] = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: HttpRequestCounterInterceptor,
    multi: true
  }
];

export const ngxHttpTranslationsLoaderFactory = () => new TranslationLoader();

export const NGX_TRANSLATE_HTTP_LOADER_PROVIDER: Provider = {
  provide: NgxTranslateLoader,
  useFactory: ngxHttpTranslationsLoaderFactory,
  deps: []
};

export const ngxTranslateMissingTranslationHandlerFactory = () => new MissingTranslationHandler();

export const NGX_TRANSLATE_MISSING_TRANSLATION_HANDLER_PROVIDER: Provider = {
  provide: NgxMissingTranslationHandler,
  useFactory: ngxTranslateMissingTranslationHandlerFactory,
  deps: []
};

export const NGX_TRANSLATE_CONFIGURAION: NgxTranslateModuleConfig = {
  loader: NGX_TRANSLATE_HTTP_LOADER_PROVIDER,
  missingTranslationHandler: NGX_TRANSLATE_MISSING_TRANSLATION_HANDLER_PROVIDER
};
