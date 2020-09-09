import { TokensService } from './tokens.service';
import { CompanyService } from '../../company/services';
import {
  AccountService,
  AccessTokenService
} from '../../account/services';
import { VcsServicesService } from '../../vcs-services/services/vcs-services.service';
import { AccountCompanyService } from '../../account/services/account-company.service';

export * from './tokens.service';

export const AUTH_SERVICES = [
  TokensService,
  CompanyService,
  AccountService,
  AccessTokenService,
  VcsServicesService,
  AccountCompanyService
];
