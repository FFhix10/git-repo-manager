import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { Query } from '@datorama/akita';

import { AccountStore } from './account.store';
import { Account } from '../../../core/models';

@Injectable({ providedIn: 'root' })
export class AccountQuery extends Query<Account> {
  account$ = this.select();
  accountCompanies$ = this.select('companies');

  constructor(protected readonly store: AccountStore) {
    super(store);
  }
}
