import { HttpStatus, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-github2';
import { v4 } from 'uuid';

import { GithubAuthService } from '../services';
import { TokenBase, TokenGenerator } from 'ts-token-generator';
import { UserDataInterface } from '../../../interfaces/user-data.interface';
import { CompanyService } from '../../company/services';
import { VcsServices } from '../../company/models';
import { AccessTokenService, AccountService } from '../../account/services';
import { AccountTypes } from '../../account/models';

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
  constructor(
    private readonly authService: GithubAuthService,
    private readonly companyService: CompanyService,
    private readonly accountService: AccountService,
    private readonly accessTokenService: AccessTokenService
  ) {
    super({
      callbackURL: `${process.env.APP_URL}/api/github/callback`,
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      scope: [
        'admin:gpg_key',
        'admin:org',
        'admin:org_hook',
        'admin:public_key',
        'admin:repo_hook',
        'read:packages',
        'repo',
        'user'
      ]
    }, async (accessToken, refreshToken, profile, done) => {
      let account;
      const { _json: json } = profile;
      const allAvailableCompanies = await this.companyService
        .getAllUserCompaniesFromVcs(
          json.login,
          VcsServices.GITHUB,
          accessToken
        ).then(
          companies => companies.data.map(company => ({
            vcsId: company.id,
            companyName: company.login
          }))
        );

      if (!allAvailableCompanies.length) {
        done(null, { error: { status: HttpStatus.BAD_REQUEST, text: 'Not available companies defined' } });
      }

      if (!account) {
        const accountData = await allAvailableCompanies.map(async availableCompany => {
          const companyId = await this.companyService.getCompanyByOptions(availableCompany, ['cm.id']);

          return  {
            uuid: v4(),
            name: json.name,
            username: json.login,
            vcsId: json.id,
            role: AccountTypes.MEMBER,
            company: companyId
          };
        });

        done(null, {});
      }

      /*if (!authorizedAccount.accessToken) {
        const newAccessToken = {
          token: accessToken,
          isCompanyAccessToken: false,
          accountId: authorizedAccount.id,
          vcsServiceId: 1
        };

        await this.accessTokenService.addNewToken(newAccessToken);
      }*/

      try {
        const token = new TokenGenerator({ bitSize: 512, baseEncoding: TokenBase.BASE62 });
        const userOrganizations = await this.authService.getUserOrganizations(accessToken);
        const res = userOrganizations.find(userOrg => userOrg.login === this.authService.userAuthOrganization);

        if (!res) {
          const user = { token: '' };
          done(null, user);
        }

        const userStatus = await this.authService.getUserOrgStatus(res.login, profile._json.login, accessToken);

        const user: UserDataInterface = {
          login: profile._json.login,
          role: userStatus,
          accessToken: accessToken,
          authToken: token.generate(),
          expiresTime: Date.now() + (3600 * 5 * 1000)
        };

        await this.authService.saveLoggedInUser(user);

        done(null, user);
      } catch (error) {
        done(error, false);
      }
    });
  }
}
