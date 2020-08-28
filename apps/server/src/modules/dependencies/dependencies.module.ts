import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DEPENDENCIES_CONTROLLERS } from './controllers';
import { DEPENDENCIES_ENTITIES } from './entities';
import { DEPENDENCIES_SERVICES } from './services';

const DEPENDENCIES_MODULES = [
  TypeOrmModule.forFeature(DEPENDENCIES_ENTITIES)
];

@Module({
  controllers: DEPENDENCIES_CONTROLLERS,
  imports: DEPENDENCIES_MODULES,
  providers: DEPENDENCIES_SERVICES
})

export class DependenciesModule {}
