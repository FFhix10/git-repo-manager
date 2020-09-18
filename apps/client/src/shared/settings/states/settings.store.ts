import { Injectable } from '@angular/core';
import { EntityStore, StoreConfig } from '@datorama/akita';

import { SettingsState } from './settings.state';

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'settings', resettable: true, idKey: 'name' })
export class SettingsStore extends EntityStore<SettingsState> {
  constructor() {
    super();
  }
}
