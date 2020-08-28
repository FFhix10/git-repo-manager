import { RepositoriesEntity } from './repositories.entity';
import { CompanyEntity } from '../../company/entities';
import { AvailableDependenciesEntity, UpdatedDependenciesEntity } from '../../dependencies/entities';

export * from './repositories.entity';

export const REPOSITORIES_ENTITIES = [
  RepositoriesEntity,
  CompanyEntity,
  AvailableDependenciesEntity,
  UpdatedDependenciesEntity
];
