import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository, SelectQueryBuilder } from 'typeorm';

import { VcsServicesEntity } from '../entities';

@Injectable()
export class VcsServicesService {
  constructor(
    @InjectRepository(VcsServicesEntity)
    private readonly vcsServicesRepository: Repository<VcsServicesEntity>
  ) {}

  getVcsServiceIdByName(vcsServiceName: string): Promise<VcsServicesEntity> {
    return this.queryBuilder('vcs')
      .where('vcs.name = :vcsServiceName', { vcsServiceName })
      .select('vcs.id')
      .getOne();
  }

  queryBuilder(alias: string): SelectQueryBuilder<VcsServicesEntity> {
    return this.vcsServicesRepository.createQueryBuilder(alias);
  }
}
