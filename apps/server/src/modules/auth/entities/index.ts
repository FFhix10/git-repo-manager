import { AccessTokensEntity } from '../../account/entities/access-tokens.entity';
import { AccountEntity } from '../../account/entities/account.entity';
import { AvailableDependenciesEntity } from './available-dependencies.entity';
import { BranchesEntity } from './branches.entity';
import { RepositoriesEntity } from '../../repositories/entities';
import { VcsServicesEntity } from './vcs-services.entity';
import { UpdatedDependenciesEntity } from '../../repositories/entities/updated-dependencies.entity';
import { CompanyEntity } from '../../company/entities/company.entity';

export * from './available-dependencies.entity';
export * from './branches.entity';
export * from './vcs-services.entity';

export const AUTH_ENTITIES = [
  AccessTokensEntity,
  AccountEntity,
  AvailableDependenciesEntity,
  BranchesEntity,
  CompanyEntity,
  RepositoriesEntity,
  VcsServicesEntity,
  UpdatedDependenciesEntity
];
