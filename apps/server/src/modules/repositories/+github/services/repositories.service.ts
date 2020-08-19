import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

const { Worker, workerData } = require('worker_threads');

import { RepositoriesEntity } from '../../entities';
import { CompanyService } from '../../../company/services';
import { DependenciesService } from '../../../dependencies/services';

@Injectable()
export class GithubRepositoriesService {
  constructor(
    @InjectRepository(RepositoriesEntity)
    private readonly repositoriesEntity: Repository<RepositoriesEntity>,
    private readonly companyService: CompanyService,
    private readonly dependenciesService: DependenciesService
  ) {}



  async updateRepositories() {
    const companies = await this.companyService.queryBuilder('cm')
      .where('cm.vcsServiceId = :vcsServiceId', { vcsServiceId: 1 })
      .leftJoin('cm.repository', 'repositories')
      .leftJoin(
        'cm.branches',
        'branches',
        'branches.companyId = cm.id AND vcsServiceId = 1'
      )
      .select([
        'cm.companyName',
        'repositories.name',
        'branches.name',
        'branches.type',
        'branches.aliases'
      ])
      .getMany()
      .then(companiesData => companiesData.map(company => {
        const companyObject = {
          name: company.companyName,
          repositories: []
        };

        // @ts-ignore
        for (let repository of company.repository) {
          const repositoryObject = {
            name: repository.name,
            branches: {
              base: { name: '', httpRequests: []},
              compare: { name: '', httpRequests: [] }
            }
          };

          // @ts-ignore
          for (let branch of company.branches) {
            const aliases = JSON.parse(branch.aliases);

            switch (branch.type) {
              case 'base':
              case 'compare':
                repositoryObject.branches[branch.type].name = branch.name;
                repositoryObject.branches[branch.type].httpRequests
                  .push(`https://raw.githubusercontent.com/${repository.name}/${branch.name}/package.json`);
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
                      .push(`https://raw.githubusercontent.com/${repository.name}/${alias}/package.json`);
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

    console.log(companies);
  }
}
