import { CompanyEntity } from './company.entity';
import { AccessTokensEntity } from '../../auth/entities';
import { AccountEntity } from '../../auth/entities';
import { BranchesEntity } from '../../auth/entities';

export * from './company.entity';

export const COMPANY_ENTITIES = [
  CompanyEntity,
  AccessTokensEntity,
  AccountEntity,
  BranchesEntity
];
