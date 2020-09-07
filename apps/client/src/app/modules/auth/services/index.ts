import { AuthService } from './auth.service';
import { AccountService } from './account.service';
import { TokensService } from './tokens.service';

export * from './account.service';
export * from './auth.service';
export * from './tokens.service';

export const AUTH_SERVICES = [AccountService, AuthService, TokensService];
