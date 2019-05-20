import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';

export type ScreenSize = 'S' | 'M' | 'L';

export interface SystemState {
  screenSize: ScreenSize;
  pendingHttpRequest: number;
  owmAppid: string;
}

export function createInitialSystemState(): SystemState {
  return {
    screenSize: null,
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
