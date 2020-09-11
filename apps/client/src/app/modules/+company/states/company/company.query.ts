import { Injectable } from '@angular/core';

import { Query } from '@datorama/akita';

import { CompanyStore } from './company.store';
import { CompanyWithRepositories } from '../../../core/models';

@Injectable({ providedIn: 'root' })
export class CompanyQuery extends Query<CompanyWithRepositories> {
  company$ = this.select();
  repositories$ = this.select('repositories');

  constructor(protected readonly store: CompanyStore) {
    super(store);
  }
}
