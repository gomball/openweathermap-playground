import {
  MissingTranslationHandler as NgxMissingTranslationHandler,
  MissingTranslationHandlerParams as NgxMissingTranslationHandlerParams
} from '@ngx-translate/core';

export class MissingTranslationHandler extends NgxMissingTranslationHandler {
  private readonly _missingTranslationsWarned: string[] = [];

  constructor(public readonly missingTranslationMark: string = '!') {
    super();
  }

  handle(params: NgxMissingTranslationHandlerParams) {
    const missingTranslationMessage = `'${params.translateService.currentLang}'::'${params.key}'`;
    if (!this._missingTranslationsWarned.includes(missingTranslationMessage)) {
      this._missingTranslationsWarned.push(missingTranslationMessage);
      console.warn('missing translation =>', missingTranslationMessage);
    }
    return `${this.missingTranslationMark}${params.key}`;
  }
}
