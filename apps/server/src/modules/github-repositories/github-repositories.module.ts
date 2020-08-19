import { HttpModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RepositoriesData } from './controller/repositories-data';
import { UpdateRepositoriesService } from './services/update-repositories.service';
import { CronService } from './services/cron.service';
import { databaseProviders } from '../../database/database.providers';
import { gitHubRepositoriesProviders } from '../../database/repositories.providers';
import { LayerService } from './services/layer.service';
import { GetRepositoriesDataService } from './services/get-repositories-data.service';
import { PackagesService } from './services/packages.service';
import { BranchesService } from './services/branches.service';
import { GithubRepositoriesService } from '../repositories/+github/services';
import { RepositoriesEntity } from '../repositories/entities';
import { CompanyService } from '../company/services';
import { CompanyEntity } from '../company/entities';
import { DependenciesService } from '../dependencies/services';
import { AvailableDependenciesEntity, UpdatedDependenciesEntity } from '../dependencies/entities';

@Module({
  controllers: [
    RepositoriesData
  ],
  imports: [
    HttpModule,
    TypeOrmModule.forFeature([RepositoriesEntity, CompanyEntity, AvailableDependenciesEntity, UpdatedDependenciesEntity])
  ],
  providers: [
    UpdateRepositoriesService,
    GetRepositoriesDataService,
    PackagesService,
    LayerService,
    CronService,
    BranchesService,
    CompanyService,
    GithubRepositoriesService,
    DependenciesService,
    ...databaseProviders,
    ...gitHubRepositoriesProviders,
  ]
})

export class GithubRepositoriesModule {  }
