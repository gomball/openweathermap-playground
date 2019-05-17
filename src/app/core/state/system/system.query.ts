import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { toLower } from 'lodash';
import { SystemState, SystemStore } from './system.store';

@Injectable({ providedIn: 'root' })
export class SystemQuery extends Query<SystemState> {
  screenSize$ = this.select((state) => state.screenSize);
  screenSizeStyleClass$ = this.select((state) => 'screen-size-' + toLower(state.screenSize));
  pendingHttpRequest$ = this.select((state) => state.pendingHttpRequest);

  constructor(protected store: SystemStore) {
    super(store);
  }
}