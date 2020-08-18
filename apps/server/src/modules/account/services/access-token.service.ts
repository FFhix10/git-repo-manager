import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository, SelectQueryBuilder } from 'typeorm';

import { AccessTokensEntity } from '../entities';

@Injectable()
export class AccessTokenService {
  constructor(
    @InjectRepository(AccessTokensEntity)
    private readonly accessTokenRepository: Repository<AccessTokensEntity>
  ) {}

  addNewToken(tokenData): Promise<AccessTokensEntity[]> {
    const entity = this.accessTokenRepository.create(tokenData);

    return this.accessTokenRepository.save(entity);
  }

  queryBuilder(alias: string): SelectQueryBuilder<AccessTokensEntity> {
    return this.queryBuilder(alias);
  }

  create(data: AccessTokensEntity): Promise<AccessTokensEntity> {
    const entity = this.repository.create(data);

    return this.repository.save(entity);
  }

  get repository(): Repository<AccessTokensEntity> {
    return this.accessTokenRepository;
  }
}
