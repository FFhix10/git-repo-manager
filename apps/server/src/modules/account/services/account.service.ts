import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository, SelectQueryBuilder } from 'typeorm';
import { v4 } from 'uuid';

import { VcsServicesNames } from '../../shared/models';
import { AccessTokensEntity, AccountEntity } from '../entities';
import { CompanyService } from '../../company/services';
import { TokensService } from '../../auth/services/tokens.service';
import { VcsServicesService } from '../../vcs-services/services/vcs-services.service';
import { AccessTokenService } from './access-token.service';
import { AccountCompanyService } from './account-company.service';
import { AccountTypes, GetAccount } from '../models';

@Injectable()
export class AccountService {

  constructor(
    @InjectRepository(AccountEntity)
    private readonly accountRepository: Repository<AccountEntity>,
    private readonly companyService: CompanyService,
    private readonly accessTokensService: AccessTokenService,
    private readonly tokensService: TokensService,
    private readonly vcsServicesService: VcsServicesService,
    private readonly accountCompanyService: AccountCompanyService
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
    let accountCompanies = [];

    const allAvailableCompanies = await this.companyService
      .getAllUserCompaniesFromVcs(
        userName,
        VcsServicesNames.GITHUB,
        accessToken
      ).then(companies => companies.data.reduce((pv, cv, index, array) => {
        if (index + 1 === array.length) {
           return `cm.vcsId = ${cv.id} AND cm.companyName = '${cv.login}'`;
        }

        return `cm.vcsId = ${cv.id} AND cm.companyName = '${cv.login}' OR `;
      }, ''));

    const companies = await this.companyService
      .queryBuilder('cm')
      .where(allAvailableCompanies)
      .select(['cm.id', 'cm.companyName'])
      .getMany();

    if (!account) {
      const entity = this.accountRepository.create({
        uuid: v4(),
        name,
        email,
        username: userName,
        vcsId
      });

      account = await this.accountRepository.save(entity);

      for (const company of companies) {
        const accountCompany = await this.accountCompanyService
          .queryBuilder('accountCompany')
          .where(
            'accountCompany.accountId = :accountId AND accountCompany.companyId = :companyId',
            { accountId: account.id, company: company.id }
          )
          .getOne();

        if (!accountCompany) {
          accountCompanies.push({
            accountId: account.id,
            companyId: company.id
          });
        }
      }

      if (accountCompanies.length > 0) {
        this.accountCompanyService.addNewRelations(accountCompanies);
      }

      await this.accessTokensService
        .create({
          token: accessToken,
          isCompanyAccessToken: false,
          account,
          vcsServiceId: 1
        } as AccessTokensEntity);
    }

    return await this.tokensService.createAuthAccessToken(account);
  }

  getAccountByVcsId(vcsId: number): Promise<AccountEntity> {
    return this.queryBuilder('account')
      .where('account.vcsId = :vcsId', { vcsId })
      .innerJoin('account.accessToken', 'accessToken')
      .select([
        'account.id',
        'account.name',
        'account.email',
        'account.vcsId',
        'account.username',
        'accessToken.token'
      ])
      .getOne();
  }

  queryBuilder(alias: string): SelectQueryBuilder<AccountEntity> {
    return this.accountRepository.createQueryBuilder(alias);
  }

  async getAccountByToken(accessToken: string, vcsService: string): Promise<GetAccount> {
    const data = this.tokensService.decode(accessToken);

    const { id } = await this.vcsServicesService.getVcsServiceIdByName(vcsService);

    return this.queryBuilder('account')
      .where(
        'account.vcsId = :vcsId',
        { vcsId: +data.vcsId })
      .leftJoin('account.accountCompany', 'accountCompany')
      .innerJoin(
        'accountCompany.company',
        'company',
        'company.vcsServiceId = :id',
        { id }
        )
      .select([
        'account.id',
        'account.uuid',
        'account.name',
        'account.userName',
        'account.email',
        'account.role',
        'account.vcsId',

        'accountCompany.id',

        'company.uuid',
        'company.companyName',
        'company.vcsId',
        'company.email'
      ])
      .getOne()
      .then(account => {
        const companies = account.accountCompany.map(accountCompanyObj => ({
          uuid: accountCompanyObj.company.uuid,
          companyName: accountCompanyObj.company.companyName,
          email: accountCompanyObj.company.email,
          vcsId: +accountCompanyObj.company.vcsId
        }));

        return {
          uuid: account.uuid,
          name: account.name,
          userName: account.username,
          email: account.email,
          role: account.role,
          vcsId: +account.vcsId,
          companies
        } as GetAccount;
      });
  }
}
