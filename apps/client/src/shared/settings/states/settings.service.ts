import { Injectable } from '@angular/core';

import { SettingsStore } from './settings.store';
import { SettingsRepository } from '../repositories';

@Injectable({ providedIn: 'root' })
export class SettingsService {

  constructor(
    private readonly settingsRepository: SettingsRepository,
    private readonly settingsStore: SettingsStore,
  ) {}

  getSettings(): void {
    this.settingsRepository.getSettings().subscribe(settings => this.settingsStore.add(settings));
  }
}
