import { AccountService } from './account.service';
import { AccessTokenService } from './access-token.service';
import { CompanyService } from '../../company/services/company.service';
import { TokensService } from '../../auth/services/tokens.service';

export * from './account.service';
export * from './access-token.service';

export const ACCOUNT_SERVICES = [
  AccountService,
  AccessTokenService,
  CompanyService,
  TokensService
];
