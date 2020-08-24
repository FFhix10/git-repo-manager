import { Injectable, HttpService, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { keys, pick } from 'lodash';

import { CompaniesToUpdate } from '../models';
import { RepositoriesEntity } from '../../entities';
import { CompanyService } from '../../../company/services';
import { DependenciesService } from '../../../dependencies/services';

@Injectable()
export class GithubRepositoriesService {
  constructor(
    @InjectRepository(RepositoriesEntity)
    private readonly repositoriesEntity: Repository<RepositoriesEntity>,
    private readonly companyService: CompanyService,
    private readonly dependenciesService: DependenciesService,
    private readonly http: HttpService
  ) {}

  async getRepositoriesToUpdate() {
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
              base: { name: '', httpRequests: []},
              compare: { name: '', httpRequests: [] }
            }
          };

          for (let branch of company.branches) {
            const aliases = JSON.parse(branch.aliases);

            switch (branch.type) {
              case 'base':
              case 'compare':
                repositoryObject.branches[branch.type].name = branch.name;
                repositoryObject.branches[branch.type].httpRequests
                  .push(this.http.get(`https://raw.githubusercontent.com/${repository.name}/${branch.name}/package.json`, heads).toPromise().catch(err => { return; }));
                break;

              default:
                break;
            }

            if (aliases) {
              for (const alias of aliases) {
                switch (branch.type) {
                  case 'base':
                  case 'compare':
                    repositoryObject.branches[branch.type].name = branch.name;
                    repositoryObject.branches[branch.type].httpRequests
                      .push(this.http.get(`https://raw.githubusercontent.com/${repository.name}/${alias}/package.json`, heads).toPromise().catch(err => { return; }));
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

    return this.updateRepositories(companies);
  }

  async updateRepositories(companies: CompaniesToUpdate[]) {
    const start = Date.now();

    for (const company of companies) {
      const updatedDependencies = {
        companyName: company.name,
        repositoryName: '',
        branches: {
          base: [],
          compare: []
        }
      };

      for (const repository of company.repositories) {
        updatedDependencies.repositoryName = repository.name;

        const [baseBranch, compareBranch] = await Promise.all([
          this.getBranchDataFromGitHub(
            repository.name,
            company.companyAccessToken,
            repository.branches.base.httpRequests,
            company.availableDependencies,
            repository.id
          ),
          this.getBranchDataFromGitHub(
            repository.name,
            company.companyAccessToken,
            repository.branches.compare.httpRequests,
            company.availableDependencies,
            repository.id
          )
        ]);

        updatedDependencies.branches.base = baseBranch;
        updatedDependencies.branches.compare = compareBranch;

        console.log(updatedDependencies.branches);
      }
    }

    console.log(`Finished, ${new Date(Date.now() - start).getMinutes()}m ${new Date(Date.now() - start).getSeconds()}s`);
  }

  async getBranchDataFromGitHub(
    repoName: string,
    accessToken: string,
    httpRequests: string[],
    availableDependencies: string[],
    repositoryId: number
  ) {
    const [...repositoriesDependencies] = await Promise.all(httpRequests);

    for (const dependencies of repositoriesDependencies) {
      if (dependencies) {
        // @ts-ignore
        const { data } = dependencies;
        const repositoryDependencies = {...data, ...data.dependencies, ...data.devDependencies };
        const filteredDependencies = pick(repositoryDependencies, availableDependencies);
        const keys = Object.keys(filteredDependencies);

        return keys.map(key => ({ name: key, value: filteredDependencies[key], repositoryId }));
      }
    }
  }
}
