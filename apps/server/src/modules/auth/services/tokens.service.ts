import { Injectable } from '@nestjs/common';

import { sign, decode } from 'jsonwebtoken';
import * as ms from 'ms';

import { AccountEntity } from '../../account/entities';
import { AppConfig } from '../../../configs';

@Injectable()
export class TokensService {
  async createAuthAccessToken(account: AccountEntity): Promise<{ accessToken: string; expiresAt: number }> {
    const expiresAt = Date.now() + +ms(AppConfig.accessTokenExpiresIn);
    const { id, name, vcsId, email } = account;

    return { accessToken: sign(
        { id, name, vcsId, email },
        AppConfig.jwtPrivateKey,
        { expiresIn: AppConfig.accessTokenExpiresIn }
      ),
      expiresAt
    };
  }

  decode(accessToken: string): { id: number; name: string; vcsId: string; email: string } {
    return decode(accessToken, AppConfig.jwtPrivateKey);
  }
}
