import { GithubAuthService } from './github-auth.service';
import { LayerService } from './layer.service';
import { TokensService } from './tokens.service';
import { CompanyService } from '../../company/services';
import {
  AccountService,
  AccessTokenService
} from '../../account/services';

export * from './github-auth.service';
export * from './layer.service';
export * from './tokens.service';

export const AUTH_SERVICES = [
  GithubAuthService,
  LayerService,
  TokensService,
  CompanyService,
  AccountService,
  AccessTokenService
];
