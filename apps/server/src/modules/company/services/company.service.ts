import { Injectable, HttpService, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository, SelectQueryBuilder } from 'typeorm';

import { CompanyEntity } from '../entities';
import { VcsServicesNames, BranchTypes } from '../../shared/models';
import { VcsServicesService } from '../../vcs-services/services';
import { CompanyWithRepositories } from '../models';
import { RepositoriesForMainPage } from '../../repositories/models';
import { DependencyForMainPage } from '../../dependencies/models';

@Injectable()
export class CompanyService {

  constructor(
    private readonly http: HttpService,
    @InjectRepository (CompanyEntity)
    private readonly companyRepository: Repository<CompanyEntity>,
    private readonly vcsServicesService: VcsServicesService
  ) {}

  repository(): Repository<CompanyEntity> {
    return this.companyRepository;
  }

  getCompanyByOptions(options, selection: string[]): Promise<CompanyEntity> {
    return this.queryBuilder('cm')
      .where(options)
      .select(selection)
      .getOne();
  }

  getCompanies(accountId: number): Promise<CompanyEntity[]> {
    return this.queryBuilder('cm')
      .innerJoin('cm.account', 'account')
      .where('account.id = :accountId', { accountId })
      .select(['cm.uuid', 'cm.companyName', 'cm.email'])
      .getMany();
  }

  getAllUserCompaniesFromVcs(
    userName: string,
    vcsService: string,
    accessToken: string
  ): Promise<any> {
    let url;

    switch (vcsService) {
      case VcsServicesNames.GITHUB:
        url = `https://api.github.com/user/orgs`;
        break;
      default:
        throw new BadRequestException('VCS Not Defined');
    }

    const headsOptions = {
      headers: {
        authorization: `token ${accessToken}`
      }
    };

    return this.http.get(url, headsOptions)
      .toPromise();
  }

  getCompanyFromVcs(
    companyName: string,
    userName: string,
    vcsService: string,
    accessToken: string
  ): Promise<any> {
    let url;

    switch (vcsService) {
      case VcsServicesNames.GITHUB:
        url = `https://api.github.com/orgs/${companyName}/memberships/${userName}`;
        break;
      default:
        throw new BadRequestException('VCS Not Defined');
    }

    const headsOptions = {
      headers: {
        authorization: `token ${accessToken}`
      }
    };

    return this.http.get(url, headsOptions).toPromise();
  }

  addCompany() {}

  async getCompanyByVcsId(vcsId: number, vcsService: string): Promise<CompanyWithRepositories> {
    const { id } = await this.vcsServicesService.queryBuilder('vcsServices')
      .where('vcsServices.name = :vcsService', { vcsService })
      .select('vcsServices.id')
      .getOne();

    if (!id) {
      throw new BadRequestException();
    }

    return this.queryBuilder('cm')
      .where('cm.vcsId = :vcsId', { vcsId })
      .innerJoin('cm.repository', 'repositories')
      .innerJoin('repositories.updatedDependency', 'updatedDependencies')
      .innerJoin(
        'cm.availableDependency',
        'availableDependencies',
        'availableDependencies.vcsServiceId = :id',
        { id }
        )
      .innerJoin(
        'updatedDependencies.branch',
        'branches',
        'branches.vscServiceId = :id AND branches.isPrivate = :isPrivate',
        { id, isPrivate: false }
        )
      .select([
        'cm.uuid',
        'cm.companyName',
        'cm.email',
        'cm.vcsId',
        'cm.logoUrl',

        'repositories.name',
        'repositories.isPrivate',
        'repositories.isCompanyRepository',

        'availableDependencies.name',
        'availableDependencies.minVersion',

        'updatedDependencies.name',
        'updatedDependencies.value',
        'updatedDependencies.updatedAt',

        'branches.id',
        'branches.type',
        'branches.name'
      ])
      .getOne()
      .then(company => {
        const repositories = company.repository.map(repositoryObj => {
          const baseBranchDependencies = repositoryObj.updatedDependency
            .filter(dependency => dependency.branch.type === BranchTypes.BASE)
            .map(filteredDependency => ({
              branchName: filteredDependency.branch.name,
              name: filteredDependency.name,
              value: filteredDependency.value,
              updatedAt: +filteredDependency.updatedAt
            })) as DependencyForMainPage[];

          const compareBranchDependencies = repositoryObj.updatedDependency
            .filter(dependency => dependency.branch.type === BranchTypes.COMPARE)
            .map(filteredDependency => ({
              branchName: filteredDependency.branch.name,
              name: filteredDependency.name,
              value: filteredDependency.value,
              updatedAt: +filteredDependency.updatedAt
            })) as DependencyForMainPage[];

          return {
            name: repositoryObj.name,
            isPrivate: repositoryObj.isPrivate,
            isCompanyRepository: repositoryObj.isCompanyRepository,
            baseBranchDependencies,
            compareBranchDependencies
          } as RepositoriesForMainPage;
        });

        return {
          uuid: company.uuid,
          companyName: company.companyName,
          email: company.email,
          vcsId: +company.vcsId,
          logoUrl: company.logoUrl,
          availableDependency: company.availableDependency,
          repositories
        } as CompanyWithRepositories;
      });
  }

  queryBuilder(alias: string): SelectQueryBuilder<CompanyEntity> {
    return this.companyRepository.createQueryBuilder(alias);
  }
}
