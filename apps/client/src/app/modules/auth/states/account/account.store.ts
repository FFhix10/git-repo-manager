import { Store, StoreConfig } from '@datorama/akita';
import { Account, AccountTypes } from '../../../core/models';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'account', resettable: true })
export class AccountStore extends Store<Account> {
  constructor() {
    const init: Account = {
      uuid: '',
      name: '',
      userName: '',
      vcsId: null,
      role: AccountTypes.MEMBER,
      email: '',
      companies: []
    };

    super(init);
  }
}
