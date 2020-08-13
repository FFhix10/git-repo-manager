import { AccessTokensEntity } from './access-tokens.entity';
import { AccountEntity } from './account.entity';
import { AvailableDependenciesEntity } from './available-dependencies.entity';
import { BranchesEntity } from './branches.entity';
import { CompanyEntity } from './company.entity';
import { RepositoriesEntity } from './repositories.entity';
import { VcsServicesEntity } from './vcs-services.entity';
import { UpdatedDependenciesEntity } from './updated-dependencies.entity';

export * from './access-tokens.entity';
export * from './account.entity';
export * from './available-dependencies.entity';
export * from './branches.entity';
export * from './company.entity';
export * from './repositories.entity';
export * from './vcs-services.entity';
export * from './updated-dependencies.entity';

export const ENTITIES = [
  AccessTokensEntity,
  AccountEntity,
  AvailableDependenciesEntity,
  BranchesEntity,
  CompanyEntity,
  RepositoriesEntity,
  VcsServicesEntity,
  UpdatedDependenciesEntity
];
