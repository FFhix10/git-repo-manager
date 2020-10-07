import { Injectable, HttpService } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository, SelectQueryBuilder } from 'typeorm';

import { CompanyService } from '../../../company/services';
import { UpdateGitHubRepositoriesService } from './update-repositories.service';
import { RepositoriesEntity } from '../../entities';
import { Repositories } from '../models';

@Injectable()
export class GithubRepositoriesService {
  constructor(
    @InjectRepository(RepositoriesEntity)
    private readonly repository: Repository<RepositoriesEntity>,
    private readonly http: HttpService,
    private readonly companyService: CompanyService,
    private readonly updateGitHubRepositoriesService: UpdateGitHubRepositoriesService
  ) {}

  async getCompaniesRepositoriesToUpdate() {
    const companies = await this.companyService.queryBuilder('cm')
      .where('cm.vcsServiceId = :vcsServiceId', { vcsServiceId: 1 })
      .innerJoin('cm.accessToken', 'accessToken', 'accessToken.isCompanyAccessToken = true')
      .leftJoin('cm.availableDependency', 'availableDependencies')
      .leftJoin('cm.repository', 'repositories')
      .leftJoin(
        'cm.branches',
        'branches'
      )
      .select([
        'cm.vcsId',
        'cm.companyName',

        'repositories.id',
        'repositories.name',

        'branches.id',
        'branches.name',
        'branches.type',
        'branches.aliases',

        'accessToken.token',
        'availableDependencies.name'
      ])
      .getMany()
      .then(companiesData => companiesData.map(company => {
        const companyObject = {
          name: company.companyName,
          vcsId: +company.vcsId,
          companyAccessToken: company.accessToken.token,
          repositories: [],
          availableDependencies: []
        };

        const heads = {
          headers: {
            authorization: `token ${companyObject.companyAccessToken}`
          }
        };

        companyObject.availableDependencies = company.availableDependency.map(dependency => dependency.name);

        for (let repository of company.repository) {
          const repositoryObject = {
            id: repository.id,
            name: repository.name,
            branches: {
              base: { name: '', httpRequests: [], id: null },
              compare: { name: '', httpRequests: [], id: null }
            }
          };

          for (let branch of company.branches) {
            const aliases = JSON.parse(branch.aliases);

            switch (branch.type) {
              case 'base':
              case 'compare':
                repositoryObject.branches[branch.type].id = branch.id;
                repositoryObject.branches[branch.type].name = branch.name;
                repositoryObject.branches[branch.type].httpRequests
                  .push(
                    this.http
                      .get(`https://raw.githubusercontent.com/${repository.name}/${branch.name}/package.json`, heads)
                      .toPromise()
                      .catch(err => {
                        if (err.response.status !== 404) {
                          console.warn(err.response.data);
                        }
                      })
                  );
                break;

              default:
                break;
            }

            if (aliases) {
              for (const alias of aliases) {
                switch (branch.type) {
                  case 'base':
                  case 'compare':
                    repositoryObject.branches[branch.type].id = branch.id;
                    repositoryObject.branches[branch.type].name = branch.name;
                    repositoryObject.branches[branch.type].httpRequests
                      .push(
                        this.http
                          .get(`https://raw.githubusercontent.com/${repository.name}/${alias}/package.json`, heads)
                          .toPromise()
                          .catch(err => {
                            if (err.response.status !== 404) {
                              console.warn(err.response.data);
                            }
                          })
                      );
                    break;

                  default:
                    break;
                }
              }
            }
          }

          companyObject.repositories.push(repositoryObject);
        }

        return companyObject;
      }));

    return this.updateGitHubRepositoriesService.updateRepositories(companies);
  }

  getRepositoriesByCompany(companyId: number): Promise<Repositories[]> {
    return this.queryBuilder('repositories')
      .where('repositories.companyId = :companyId', { companyId })
      .innerJoin(
        'repositories.company',
        'cm',
        'cm.id = :companyId',
        { companyId })
      .leftJoin(
        'cm.branches',
        'branches')
      .leftJoin(
        'branches.updatedDependency',
        'updatedDependency',
        'updatedDependency.repositoryId = repositories.id AND updatedDependency.branchId = branches.id'
      )
      .select([
        'repositories.id',
        'repositories.name',
        'repositories.isPrivate',
        'repositories.updatedAt',

        'cm.companyName',

        'branches.name',
        'branches.type',

        'updatedDependency.name',
        'updatedDependency.value'
      ])
      .getMany()
      .then(repositories => repositories.map(repository => {
        const repositoryObject = {
          id: repository.id,
          name: repository.name,
          isPrivate: repository.isPrivate,
          updatedAt: +repository.updatedAt,
          branches: {
            base: {
              name: '',
              dependencies: []
            },
            compare: {
              name: '',
              dependencies: []
            }
          }
        };

        for (const branch of repository.company.branches) {
          switch (branch.type) {
            case 'base':
            case 'compare':
              repositoryObject.branches[branch.type].name = branch.name;
              repositoryObject.branches[branch.type].dependencies = branch.updatedDependency;

              break;

            default:
              break;
          }
        }

        return repositoryObject;
      }));
  }

  queryBuilder(alias: string): SelectQueryBuilder<RepositoriesEntity> {
    return this.repository.createQueryBuilder(alias);
  }
}
