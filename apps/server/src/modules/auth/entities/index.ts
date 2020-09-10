import { AccessTokensEntity } from '../../account/entities/access-tokens.entity';
import { AccountEntity } from '../../account/entities/account.entity';
import { AvailableDependenciesEntity } from '../../dependencies/entities/available-dependencies.entity';
import { BranchesEntity } from './branches.entity';
import { RepositoriesEntity } from '../../repositories/entities';
import { VcsServicesEntity } from '../../vcs-services/entities/vcs-services.entity';
import { UpdatedDependenciesEntity } from '../../dependencies/entities/updated-dependencies.entity';
import { CompanyEntity } from '../../company/entities';
import { AccountCompanyEntity } from '../../account/entities/account-company.entity';

export * from './branches.entity';

export const AUTH_ENTITIES = [
  AccessTokensEntity,
  AccountEntity,
  AvailableDependenciesEntity,
  BranchesEntity,
  CompanyEntity,
  RepositoriesEntity,
  VcsServicesEntity,
  UpdatedDependenciesEntity,
  AccountCompanyEntity
];
