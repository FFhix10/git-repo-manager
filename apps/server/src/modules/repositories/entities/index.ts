import { RepositoriesEntity } from './repositories.entity';
import { CompanyEntity } from '../../company/entities';
import { AvailableDependenciesEntity, UpdatedDependenciesEntity } from '../../dependencies/entities';
import { VcsServicesEntity } from '../../vcs-services/entities/vcs-services.entity';

export * from './repositories.entity';

export const REPOSITORIES_ENTITIES = [
  RepositoriesEntity,
  CompanyEntity,
  AvailableDependenciesEntity,
  UpdatedDependenciesEntity,
  VcsServicesEntity
];
