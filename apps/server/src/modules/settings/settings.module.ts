import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SETTINGS_CONTROLLERS } from './controllers';
import { SETTINGS_ENTITIES } from './entities';
import { SETTINGS_SERVICES } from './services';

const SETTINGS_MODULES = [
  TypeOrmModule.forFeature(SETTINGS_ENTITIES)
];

@Module({
  controllers: SETTINGS_CONTROLLERS,
  imports: SETTINGS_MODULES,
  providers: SETTINGS_SERVICES
})

export class SettingsModule {}
