import { GithubAuthService } from './github-auth.service';
import { LayerService } from './layer.service';
import { CompanyService } from '../../company/services';
import { AccountService, AccessTokenService } from '../../account/services';

export * from './github-auth.service';
export * from './layer.service';

export const AUTH_SERVICES = [
  GithubAuthService,
  LayerService,
  CompanyService,
  AccountService,
  AccessTokenService
];
