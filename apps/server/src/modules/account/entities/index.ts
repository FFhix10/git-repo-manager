import { AccountEntity } from './account.entity';
import { AccessTokensEntity } from './access-tokens.entity';
import { CompanyEntity } from '../../company/entities/company.entity';

export * from './account.entity';
export * from './access-tokens.entity';

export const ACCOUNT_ENTITIES = [
  AccountEntity,
  AccessTokensEntity,
  CompanyEntity
];
