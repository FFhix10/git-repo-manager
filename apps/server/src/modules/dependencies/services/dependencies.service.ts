import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { AvailableDependenciesEntity, UpdatedDependenciesEntity } from '../entities';

@Injectable()
export class DependenciesService {
  constructor(
    @InjectRepository(AvailableDependenciesEntity)
    private readonly availableDependenciesRepository: Repository<AvailableDependenciesEntity>,
    @InjectRepository(UpdatedDependenciesEntity)
    private readonly updatedDependenciesRepository: Repository<UpdatedDependenciesEntity>
  ) {}

  getAvailableRepositoriesForCompany(companyId: number, vcsServiceId: number) {
    return this.availableDependenciesRepository
      .createQueryBuilder('availableRepositories')
      .where(
        'availableRepositories.companyId = :companyId AND availableRepositories.vcsServiceId = :vcsServiceId',
        { companyId, vcsServiceId })
      .getMany();
  }
}
