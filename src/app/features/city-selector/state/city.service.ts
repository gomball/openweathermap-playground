import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppServiceLocator } from '../../../core/services/app-service-locator';
import { City } from '../../../domain/city';
import { CityStore } from './city.store';

@Injectable({ providedIn: 'root' })
export class CityService {
  private readonly _httpClient: HttpClient;

  constructor(private readonly _store: CityStore) {
    this._httpClient = AppServiceLocator.injector.get(HttpClient);
  }

  loadCityDb(): void {
    const url = 'assets/data/cities.json';
    this._httpClient.get<City[]>(url).subscribe((available) => this._store.update((state) => ({ ...state, available })));
  }

  addSelectedCity(city: City): void {
    this._store.update((state) => {
      const selected = [...state.selected, city];
      return { ...state, selected };
    });
  }

  removeSelectedCity(city: City): void {
    this._store.update((state) => {
      const selected = state.selected.filter((c) => c.id !== city.id);
      return { ...state, selected };
    });
  }
}
