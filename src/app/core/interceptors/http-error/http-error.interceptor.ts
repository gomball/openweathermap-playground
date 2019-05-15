import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { get } from 'lodash';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { APP_CONFIGURATION } from '../../configuration/app-configuration.contract';
import { AppServiceLocator } from '../../services/app-service-locator';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  private readonly _owmApiRoot: string;

  constructor(private readonly _matSnackBarService: MatSnackBar) {
    this._owmApiRoot = AppServiceLocator.injector.get(APP_CONFIGURATION).owmApiRoot;
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const shouldIntercept = req.url.startsWith(this._owmApiRoot);
    if (shouldIntercept) {
      return next.handle(req).pipe(
        catchError((errorResponse: HttpErrorResponse) => {
          const code = get(errorResponse, 'status');
          const message = get(errorResponse, 'error.type') || get(errorResponse, 'statusText') || '';
          return this._matSnackBarService
            .open(`${code}: ${message}`, null, { duration: 3000, verticalPosition: 'top' })
            .afterOpened()
            .pipe(switchMap(() => throwError(errorResponse)));
        })
      );
    } else {
      return next.handle(req);
    }
  }
}
