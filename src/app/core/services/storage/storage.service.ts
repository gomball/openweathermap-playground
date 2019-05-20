import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isNil } from 'lodash';
import { SerializationService } from '../serialization/serialization.service';

@Injectable({ providedIn: 'root' })
export class StorageService {
  private readonly _localStorage: Storage = null;

  constructor(@Inject(PLATFORM_ID) readonly platformId: any, private readonly _serializationService: SerializationService) {
    if (isPlatformBrowser(platformId)) {
      this._localStorage = window.localStorage;
    }
  }

  getValue(key: string): string | number | boolean {
    const value = this._localStorage.getItem(key);
    return !isNil(value) ? this._serializationService.json2js(value) : null;
  }

  setValue(key: string, value: string | number | boolean): void {
    this._localStorage.setItem(key, this._serializationService.js2json(value));
  }

  getObject<T>(key: string): T {
    const value = this._localStorage.getItem(key);
    return !isNil(value) ? this._serializationService.json2js(JSON.parse(value)) : null;
  }

  setObject<T>(key: string, value: T): void {
    this._localStorage.setItem(key, JSON.stringify(this._serializationService.js2json(value)));
  }

  removeItem(key: string): void {
    this._localStorage.removeItem(key);
  }
}
