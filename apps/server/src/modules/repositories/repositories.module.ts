import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { REPOSITORIES_ENTITIES } from './entities';
import { GithubRepositoriesModule } from './+github/github-repositories.module';

const REPOSITORIES_MODULES = [
  TypeOrmModule.forFeature(REPOSITORIES_ENTITIES),
  // GithubRepositoriesModule
];

@Module({
  imports: REPOSITORIES_MODULES
})

export class RepositoriesModule {}
