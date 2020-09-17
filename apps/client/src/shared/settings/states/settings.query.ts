import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { HashMap, QueryEntity } from '@datorama/akita';

import { SettingsStore } from './settings.store';
import { SettingsState } from './settings.state';
import { Settings } from '../models';

@Injectable({ providedIn: 'root' })
export class SettingsQuery extends QueryEntity<SettingsState> {
  settings$: Observable<Settings[]> = this.selectAll();

  constructor(protected readonly settingsStore: SettingsStore) {
    super(settingsStore);
  }

  getSetting(name: string): Observable<Settings> {
    return this.selectEntity(name);
  }
}
