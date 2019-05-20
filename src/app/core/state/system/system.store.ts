import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';

export type ScreenSize = 'S' | 'M' | 'L';
export type Theme = 'light' | 'dark';

export interface SystemState {
  screenSize: ScreenSize;
  theme: Theme;
  pendingHttpRequest: number;
  owmAppid: string;
}

export function createInitialSystemState(): SystemState {
  return {
    screenSize: null,
    theme: 'light',
    pendingHttpRequest: 0,
    owmAppid: null
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'system' })
export class SystemStore extends Store<SystemState> {
  constructor() {
    super(createInitialSystemState());
  }
}
