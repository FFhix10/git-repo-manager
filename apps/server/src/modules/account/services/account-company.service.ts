import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository, SelectQueryBuilder } from 'typeorm';

import { AccountCompanyEntity } from '../entities';

@Injectable()
export class AccountCompanyService {
  constructor(
    @InjectRepository(AccountCompanyEntity)
    private readonly accountCompanyEntityRepository: Repository<AccountCompanyEntity>
  ) {}

  addNewRelations(data: { accountId: number, companyId: number }[]): AccountCompanyEntity[] {
    return this.accountCompanyEntityRepository.create(data);
  }

  queryBuilder(alias: string): SelectQueryBuilder<AccountCompanyEntity> {
    return this.accountCompanyEntityRepository.createQueryBuilder(alias);
  }
}
