import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository, SelectQueryBuilder } from 'typeorm';

import { SettingsEntity } from '../entities';
import { Settings, SettingsNames } from '../models';

@Injectable()
export class SettingsService {

  constructor(
    @InjectRepository(SettingsEntity)
    private readonly settingsRepository: Repository<SettingsEntity>
  ) {}

  getSettings(): Promise<Settings[]> {
    return this.queryBuilder('settings')
      .getMany()
      .then(settings => settings.map(setting => {
        switch (setting.name) {
          case SettingsNames.PAGINATION_ITEMS_PER_PAGE:
          case SettingsNames.PAGINATION_MAX_PAGE_NUMBERS_CAPACITY:
            return { ...setting, value: +setting.value };

          default:
            return undefined;
        }
      }));
  }

  getSettingByName(settingName: string): Promise<Settings> {
    return this.queryBuilder('settings')
      .where('settings.name = :name', { name: settingName })
      .getOne()
      .then(setting => {
        switch (setting.name) {
          case SettingsNames.PAGINATION_ITEMS_PER_PAGE:
          case SettingsNames.PAGINATION_MAX_PAGE_NUMBERS_CAPACITY:
            return { ...setting, value: +setting.value };

          default:
            return undefined;
        }
      });
  }

  queryBuilder(alias: string): SelectQueryBuilder<SettingsEntity> {
    return this.settingsRepository.createQueryBuilder(alias);
  }
}
