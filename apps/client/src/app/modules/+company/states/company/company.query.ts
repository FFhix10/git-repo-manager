import { Injectable } from '@angular/core';

import { Query } from '@datorama/akita';

import { CompanyStore } from './company.store';
import { CompanyWithRepositories, RepositoriesForMainPage } from '../../../core/models';

@Injectable({ providedIn: 'root' })
export class CompanyQuery extends Query<CompanyWithRepositories> {
  company$ = this.select();
  repositories$ = this.select('repositories');
  availableDependencies$ = this.select('availableDependency');

  constructor(protected readonly store: CompanyStore) {
    super(store);
  }

  companySnapshot(): CompanyWithRepositories {
    return this.getValue();
  }

  repositorySnapshot(repositoryName: string): RepositoriesForMainPage {
    return this.companySnapshot().repositories.find(repository => repository.name === repositoryName);
  }
}
