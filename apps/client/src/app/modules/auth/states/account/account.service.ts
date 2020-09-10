import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { filter, finalize, switchMap, take, tap } from 'rxjs/operators';

import { AccountQuery } from './account.query';
import { AccountStore } from './account.store';
import { AccountRepository } from '../../../core/repositories';
import { Account } from '../../../core/models';

@Injectable({ providedIn: 'root' })
export class AccountService {
  private readonly fetchingInProgress$ = new BehaviorSubject<boolean>(false);

  constructor(
    private readonly accountQuery: AccountQuery,
    private readonly accountStore: AccountStore,
    private readonly accountRepository: AccountRepository
  ) {}

  getOrFetchAccountOnce(): Observable<Account> {
    return this.getOrFetchAccount().pipe(take(1));
  }

  private getOrFetchAccount(): Observable<Account> {
    return this.fetchingInProgress$.pipe(
      filter(inProgress => !inProgress),
      switchMap(() => this.accountQuery.account$),
      switchMap(accountFromStore => {
        if (!accountFromStore.uuid) {
          return this.fetchAccount().pipe(
            filter(account => !!account.uuid),
            switchMap(() => this.accountQuery.account$)
          );
        }

        return of(accountFromStore);
      })
    );
  }

  private fetchAccount(): Observable<Account> {
    this.fetchingInProgress$.next(true);

    return this.accountRepository.getAccount().pipe(
      finalize(() => this.fetchingInProgress$.next(false)),
      tap(account => this.accountStore.update(account))
    );
  }
}

function noAccountError(): Observable<never> {
  return throwError(new Error('Account not found'));
}
