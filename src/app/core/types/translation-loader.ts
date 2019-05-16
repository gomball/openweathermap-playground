import { TranslateLoader as NgxTranslateLoader } from '@ngx-translate/core';
import { Observable, from } from 'rxjs';

export class TranslationLoader implements NgxTranslateLoader {
  getTranslation(lang: string): Observable<any> {
    return from(import(`../../../assets/i18n/${lang}.json`));
  }
}
