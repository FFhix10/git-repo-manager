import { AccountEntity } from './account.entity';
import { AccessTokensEntity } from './access-tokens.entity';
import { CompanyEntity } from '../../company/entities/company.entity';
import { VcsServicesEntity } from '../../vcs-services/entities/vcs-services.entity';
import { AccountCompanyEntity } from './account-company.entity';

export * from './account.entity';
export * from './access-tokens.entity';
export * from './account-company.entity';

export const ACCOUNT_ENTITIES = [
  AccountEntity,
  AccessTokensEntity,
  CompanyEntity,
  VcsServicesEntity,
  AccountCompanyEntity
];
