import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { QueryEntity } from '@datorama/akita';

import { SettingsStore } from './settings.store';
import { SettingsState } from './settings.state';
import { Settings, SettingsNames } from '../models';

@Injectable({ providedIn: 'root' })
export class SettingsQuery extends QueryEntity<SettingsState> {
  settings$: Observable<Settings[]> = this.selectAll();

  constructor(protected readonly settingsStore: SettingsStore) {
    super(settingsStore);
  }

  settingSnapshot(name: SettingsNames): Settings {
    return this.getEntity(name);
  }

  getSetting(name: SettingsNames): Observable<Settings> {
    return this.selectEntity(name);
  }
}
