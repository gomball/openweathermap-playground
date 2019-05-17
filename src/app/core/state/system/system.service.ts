import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Injectable } from '@angular/core';
import { distinctUntilChanged, filter, map } from 'rxjs/operators';
import { ScreenSize, SystemStore } from './system.store';

@Injectable({ providedIn: 'root' })
export class SystemService {
  constructor(private readonly _store: SystemStore, breakpointObserver: BreakpointObserver) {
    breakpointObserver
      .observe([Breakpoints.XSmall, Breakpoints.Small, Breakpoints.Medium, Breakpoints.Large])
      .pipe(
        filter((bp) => bp.matches),
        map((bp) => this._getScreenSize(bp)),
        distinctUntilChanged()
      )
      .subscribe((screenSize) => this._store.update((state) => ({ ...state, screenSize })));
  }

  setPendingHttpRequestCount(operation: 'increase' | 'decrease'): void {
    this._store.update((state) => ({
      ...state,
      pendingHttpRequest: operation === 'increase' ? state.pendingHttpRequest + 1 : state.pendingHttpRequest - 1
    }));
  }

  private _getScreenSize(bp: BreakpointState): ScreenSize {
    let retVal: ScreenSize = null;
    if (bp.breakpoints[Breakpoints.XSmall]) {
      retVal = 'S';
    } else if (bp.breakpoints[Breakpoints.Small]) {
      retVal = 'M';
    } else if (bp.breakpoints[Breakpoints.Medium] || bp.breakpoints[Breakpoints.Large]) {
      retVal = 'L';
    }
    return retVal;
  }
}