import { TokensService } from './tokens.service';
import { CompanyService } from '../../company/services';
import {
  AccountService,
  AccessTokenService
} from '../../account/services';

export * from './tokens.service';

export const AUTH_SERVICES = [
  TokensService,
  CompanyService,
  AccountService,
  AccessTokenService
];
