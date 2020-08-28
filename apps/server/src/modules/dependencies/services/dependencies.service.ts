import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository, SelectQueryBuilder, UpdateResult } from 'typeorm';

import { AvailableDependenciesEntity, UpdatedDependenciesEntity } from '../entities';

@Injectable()
export class DependenciesService {
  constructor(
    @InjectRepository(AvailableDependenciesEntity)
    private readonly availableDependenciesRepository: Repository<AvailableDependenciesEntity>,
    @InjectRepository(UpdatedDependenciesEntity)
    private readonly updatedDependenciesRepository: Repository<UpdatedDependenciesEntity>
  ) {}

  getAvailableRepositoriesForCompany(companyId: number, vcsServiceId: number): Promise<AvailableDependenciesEntity[]> {
    return this.availableDependenciesRepository
      .createQueryBuilder('availableDependencies')
      .where(
        'availableDependencies.companyId = :companyId AND availableDependencies.vcsServiceId = :vcsServiceId',
        { companyId, vcsServiceId })
      .select([
        'availableDependencies.name',
        'availableDependencies.minVersion',
        'availableDependencies.isRequired'
      ])
      .getMany();
  }

  async updateDependencies(dependency: UpdatedDependenciesEntity): Promise<UpdatedDependenciesEntity | UpdateResult> {
    const { name, repositoryId, branchId } = dependency;
    const dependencyFromDb = await this.updatedDependenciesQueryBuilder('updatedDependency')
      .where(
        'updatedDependency.name = :name AND updatedDependency.repositoryId = :repositoryId AND updatedDependency.branchId = :branchId',
        { name, repositoryId, branchId }
      ).getOne();

    if (dependencyFromDb) {
      return this.updatedDependenciesRepository.update(dependencyFromDb.id, dependency);
    }

    return this.updatedDependenciesRepository.save(dependency);
  }

  availableDependenciesQueryBuilder(alias: string): SelectQueryBuilder<AvailableDependenciesEntity> {
    return this.availableDependenciesRepository.createQueryBuilder(alias);
  }

  updatedDependenciesQueryBuilder(alias: string): SelectQueryBuilder<UpdatedDependenciesEntity> {
    return this.updatedDependenciesRepository.createQueryBuilder(alias);
  }
}
