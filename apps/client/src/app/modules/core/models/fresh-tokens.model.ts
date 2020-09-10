import { VcsServicesNames } from './vcs-services-names.enum';

export interface FreshTokens {
  accessToken: string;
  expiresAt: string;
  vcsService: VcsServicesNames;
}
