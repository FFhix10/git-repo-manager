import { Module, HttpModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SHARED_SERVICES } from './services';
import { CompanyEntity } from '../company/entities';
import { AvailableDependenciesEntity, UpdatedDependenciesEntity } from '../dependencies/entities';

const MODULES = [
  HttpModule,
  TypeOrmModule.forFeature([
    CompanyEntity,
    AvailableDependenciesEntity,
    UpdatedDependenciesEntity
  ])
];

@Module({
  imports: MODULES,
  providers: SHARED_SERVICES
})

export class SharedModule {}
