import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository, SelectQueryBuilder } from 'typeorm';
import { v4 } from 'uuid';

import { AccessTokensEntity, AccountEntity } from '../entities';
import { CompanyService } from '../../company/services';
import { AccessTokenService } from './access-token.service';
import { TokensService } from '../../auth/services/tokens.service';

@Injectable()
export class AccountService {

  constructor(
    @InjectRepository(AccountEntity)
    private readonly accountRepository: Repository<AccountEntity>,
    private readonly companyService: CompanyService,
    private readonly accessTokensService: AccessTokenService,
    private readonly tokensService: TokensService
  ) {}

  repository(): Repository<AccountEntity> {
    return this.accountRepository;
  }

  async addAccount(data: {
    name: string;
    email: string;
    userName: string;
    vcsId: number;
    accessToken: string;
  }): Promise<{ accessToken: string; expiresAt: number }> {
    const { name, email, userName, vcsId, accessToken } = data;
    let  account = await this.getAccountByVcsId(vcsId);

    const allAvailableCompanies = await this.companyService
      .getAllUserCompaniesFromVcs(
        userName,
        'github',
        accessToken
      ).then(companies => companies.data.reduce((pv, cv, index, array) => {
        if (index + 1 === array.length) {
           return `cm.vcsId = ${cv.id} AND cm.companyName = '${cv.login}'`;
        }

        return `cm.vcsId = ${cv.id} AND cm.companyName = '${cv.login}' OR `;
      }, ''));

    const company = await this.companyService
      .getCompanyByOptions(allAvailableCompanies, ['cm.id', 'cm.companyName']);

    if (!account) {
      const entity = this.accountRepository.create({
        uuid: v4(),
        name,
        email,
        username: userName,
        vcsId,
        company
      });

      account = await this.accountRepository.save(entity);

      await this.accessTokensService
        .create({
          token: accessToken,
          isCompanyAccessToken: false,
          account,
          company,
          vcsServiceId: 1
        } as AccessTokensEntity);
    }

    return await this.tokensService.createAuthAccessToken(account);
  }

  getAccountByVcsId(vcsId: number): Promise<AccountEntity> {
    return this.queryBuilder('account')
      .where('account.vcsId = :vcsId', { vcsId })
      .innerJoin('account.accessToken', 'accessToken')
      .innerJoin('account.company', 'company')
      .select([
        'account.id',
        'account.name',
        'account.email',
        'account.vcsId',
        'account.username',
        'accessToken.token',
        'company.companyName'
      ])
      .getOne();
  }

  queryBuilder(alias: string): SelectQueryBuilder<AccountEntity> {
    return this.accountRepository.createQueryBuilder(alias);
  }
}
