import { registerLocaleData } from '@angular/common';
import locale_en from '@angular/common/locales/en';
import locale_es from '@angular/common/locales/es';
import { Inject, Injectable } from '@angular/core';
import { TranslateService as NgxTranslateService } from '@ngx-translate/core';
import { forIn } from 'lodash';
import { Observable } from 'rxjs';
import { APP_CONFIGURATION, AppConfigurationContract } from '../../configuration/app-configuration.contract';

export type LocaleCode = 'en' | 'es';

const LOCALE_LOCALE_MAP: { [flag in LocaleCode]: any } = {
  en: locale_en,
  es: locale_es
};

@Injectable({ providedIn: 'root' })
export class I18nService {
  constructor(
    private readonly _translateService: NgxTranslateService,
    @Inject(APP_CONFIGURATION) private readonly _appConfiguration: AppConfigurationContract
  ) {
    this._translateService.setDefaultLang(this._normalizeLocaleCode(this._appConfiguration.defaultLocale));
    forIn(LOCALE_LOCALE_MAP, (v, k) => registerLocaleData(v, k));
    this.setLocale$();
  }

  setLocale$(locale: LocaleCode = this._appConfiguration.defaultLocale as LocaleCode): Observable<void> {
    return this._translateService.use(this._normalizeLocaleCode(locale));
  }

  translate$(key: string, params?: any): Observable<string> {
    return this._translateService.get(key, params);
  }

  translate(key: string, params?: any): string {
    return this._translateService.instant(key, params);
  }

  private _normalizeLocaleCode(code: string): LocaleCode {
    return code.split('-')[0] as LocaleCode;
  }
}
