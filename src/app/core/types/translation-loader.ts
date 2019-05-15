declare var System: System;
interface System {
  import(request: string): Promise<any>;
}

import { TranslateLoader as NgxTranslateLoader } from '@ngx-translate/core';
import { Observable, from } from 'rxjs';

export class TranslationLoader implements NgxTranslateLoader {
  getTranslation(lang: string): Observable<any> {
    return from(System.import(`../assets/i18n/${lang}.json`));
  }
}
