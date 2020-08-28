import { Injectable } from '@nestjs/common';

import { pick } from 'lodash';

import { CompaniesToUpdate } from '../models';
import { DependenciesService } from '../../../dependencies/services';

@Injectable()
export class UpdateGitHubRepositoriesService {
  constructor(
    private readonly dependenciesService: DependenciesService
  ) {}

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
            repository.id,
            repository.branches.base.id,
            repository.branches.compare.httpRequests,
            company.availableDependencies,
          ),
          this.getBranchDataFromGitHub(
            repository.id,
            repository.branches.compare.id,
            repository.branches.compare.httpRequests,
            company.availableDependencies
          )
        ]);

        updatedDependencies.branches.base = baseBranch;
        updatedDependencies.branches.compare = compareBranch;

        if (updatedDependencies.branches.base) {
          const { branches: { base } } = updatedDependencies;

          for (const data of base) {
            await this.dependenciesService.updateDependencies(data);
          }
        }

        if (updatedDependencies.branches.compare) {
          const { branches: { compare } } = updatedDependencies;

          for (const data of compare) {
            await this.dependenciesService.updateDependencies(data);
          }
        }
      }
    }

    console.log(`GitHub data updating finished - took ${new Date(Date.now() - start).getMinutes()}m ${new Date(Date.now() - start).getSeconds()}s`);
  }

  private async getBranchDataFromGitHub(
    repositoryId: number,
    branchId: number,
    httpRequests: string[],
    availableDependencies: string[]
  ) {
    const [...repositoriesDependencies] = await Promise.all(httpRequests);

    for (const dependencies of repositoriesDependencies) {
      if (dependencies) {
        // @ts-ignore
        const { data } = dependencies;
        const repositoryDependencies = {...data, ...data.dependencies, ...data.devDependencies };
        const filteredDependencies = pick(repositoryDependencies, availableDependencies);
        const keys = Object.keys(filteredDependencies);

        return keys.map(key => ({
          name: key,
          value: filteredDependencies[key],
          repositoryId,
          branchId,
          updatedAt: Date.now()
        }));
      }
    }
  }
}
