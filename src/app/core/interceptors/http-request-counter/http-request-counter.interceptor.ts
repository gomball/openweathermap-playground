import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { APP_CONFIGURATION } from '../../configuration/app-configuration.contract';
import { AppServiceLocator } from '../../services/app-service-locator';
import { SystemService } from '../../state/system/system.service';

@Injectable()
export class HttpRequestCounterInterceptor implements HttpInterceptor {
  private readonly _owmApiRoot: string;

  constructor(private readonly _systemService: SystemService) {
    this._owmApiRoot = AppServiceLocator.injector.get(APP_CONFIGURATION).owmApiRoot;
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const shouldIntercept = req.url.startsWith(this._owmApiRoot);
    if (shouldIntercept) {
      this._systemService.setPendingHttpRequestCount('increase');
      return next.handle(req).pipe(finalize(() => this._systemService.setPendingHttpRequestCount('decrease')));
    } else {
      return next.handle(req);
    }
  }
}
