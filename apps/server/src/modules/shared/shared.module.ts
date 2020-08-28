import { Module, HttpModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SHARED_SERVICES } from './services';
import { CompanyEntity } from '../company/entities';
import { AvailableDependenciesEntity, UpdatedDependenciesEntity } from '../dependencies/entities';
import { RepositoriesEntity } from '../repositories/entities';

const MODULES = [
  HttpModule,
  TypeOrmModule.forFeature([
    CompanyEntity,
    AvailableDependenciesEntity,
    UpdatedDependenciesEntity,
    RepositoriesEntity
  ])
];

@Module({
  imports: MODULES,
  providers: SHARED_SERVICES
})

export class SharedModule {}
