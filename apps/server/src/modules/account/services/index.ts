import { AccountService } from './account.service';
import { AccessTokenService } from './access-token.service';
import { CompanyService } from '../../company/services/company.service';
import { TokensService } from '../../auth/services/tokens.service';
import { VcsServicesService } from '../../vcs-services/services/vcs-services.service';
import { AccountCompanyService } from './account-company.service';

export * from './account.service';
export * from './access-token.service';
export * from './account-company.service';

export const ACCOUNT_SERVICES = [
  AccountService,
  AccessTokenService,
  CompanyService,
  TokensService,
  VcsServicesService,
  AccountCompanyService
];
