import { AccountService } from './account.service';
import { AccessTokenService } from './access-token.service';

export * from './account.service';
export * from './access-token.service';

export const ACCOUNT_SERVICES = [
  AccountService,
  AccessTokenService
];
