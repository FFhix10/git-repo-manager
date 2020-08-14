import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository, SelectQueryBuilder } from 'typeorm';

import { AccountEntity } from '../entities';

@Injectable()
export class AccountService {

  constructor(
    @InjectRepository(AccountEntity)
    private readonly accountRepository: Repository<AccountEntity>
  ) {}

  repository(): Repository<AccountEntity> {
    return this.accountRepository;
  }

  getAccountByVcsId(vcsId: number): Promise<AccountEntity> {
    return this.queryBuilder('account')
      .where('vcsId = :vcsId', { vcsId })
      .leftJoin('account.accessToken', 'accessToken')
      .select([
        'account.id',
        'account.username',
        'accessToken.token'
      ])
      .getOne();
  }

  queryBuilder(alias: string): SelectQueryBuilder<AccountEntity> {
    return this.accountRepository.createQueryBuilder(alias);
  }
}
