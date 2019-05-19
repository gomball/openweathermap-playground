import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { CityQuery } from '../../../../features/city-selector/state/city.query';

@Injectable({ providedIn: 'root' })
export class ExistSelectedCitiesGuard implements CanActivate {
  constructor(private readonly _router: Router, private readonly _cityQuery: CityQuery) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this._cityQuery.selected$.pipe(
      map((selectedCities) => !!selectedCities.length),
      tap((canNavigate) => !canNavigate && this._router.navigate(['/city-selector']))
    );
  }
}
