import { HttpModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { REPOSITORIES_ENTITIES } from '../entities';
import { REPOSITORIES_SERVICES } from './services';
import { CONTROLLERS } from './controllers';

const REPOSITORIES_MODULES = [
  HttpModule,
  TypeOrmModule.forFeature(REPOSITORIES_ENTITIES)
];

@Module({
  controllers: CONTROLLERS,
  imports: REPOSITORIES_MODULES,
  providers: REPOSITORIES_SERVICES
})

export class GithubRepositoriesModule {  }
