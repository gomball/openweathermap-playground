import { Injectable } from '@angular/core';
import { cloneDeep, forEach, forIn } from 'lodash';

const ISO_DATE_REGEX = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.*/;

@Injectable({ providedIn: 'root' })
export class SerializationService {
  private static _manageRecursion(obj: any, recursionLevel: number): any {
    if (recursionLevel === 0) {
      return cloneDeep(obj);
    } else {
      return obj;
    }
  }

  json2js(obj: any): any {
    return this._json2js(obj, 0);
  }

  js2json(obj: any): any {
    return this._js2json(obj, 0);
  }

  private _json2js(obj: any, recursionLevel: number): any {
    let _obj = SerializationService._manageRecursion(obj, recursionLevel);
    switch (Object.prototype.toString.call(_obj)) {
      case '[object String]':
        if (ISO_DATE_REGEX.test(_obj)) {
          _obj = Date.parse(_obj); // new Date(Date.parse(obj.substr(0, 19)));
        }
        break;
      case '[object Object]':
        forIn(_obj, (v, k) => {
          _obj[k] = this._json2js(v, recursionLevel++);
          return true;
        });
        break;
      case '[object Array]':
        forEach(_obj, (v, i) => {
          _obj[i] = this._json2js(v, recursionLevel++);
          return true;
        });
        break;
    }
    return _obj;
  }

  private _js2json(obj: any, recursionLevel: number = 0): any {
    let _obj = SerializationService._manageRecursion(obj, recursionLevel);
    switch (Object.prototype.toString.call(_obj)) {
      case '[object Date]':
        _obj = (_obj as Date).toISOString(); // .toISOString();
        break;
      case '[object Object]':
        forIn(_obj, (v, k) => {
          _obj[k] = this._js2json(v, recursionLevel++);
          return true;
        });
        break;
      case '[object Array]':
        forEach(_obj, (v, i) => {
          _obj[i] = this._js2json(v, recursionLevel++);
          return true;
        });
        break;
    }
    return _obj;
  }
}
