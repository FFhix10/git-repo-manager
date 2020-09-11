import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable, of } from 'rxjs';
import { filter, finalize, switchMap, take, tap } from 'rxjs/operators';

import { CompanyQuery } from './company.query';
import { CompanyStore } from './company.store';
import { CompanyRepository } from '../../../core/repositories';
import { CompanyWithRepositories } from '../../../core/models';

@Injectable({ providedIn: 'root' })
export class CompanyService {
  private readonly fetchingInProgress$ = new BehaviorSubject<boolean>(false);

  constructor(
    private readonly companyStore: CompanyStore,
    private readonly companyQuery: CompanyQuery,
    private readonly companyRepository: CompanyRepository
  ) {}

  getOrfetchCompanyOnce(vcsId: number): Observable<CompanyWithRepositories> {
    return this.getOrFetchCompany(vcsId).pipe(take(1));
  }

  getOrFetchCompany(vcsId: number): Observable<CompanyWithRepositories> {
    return this.fetchingInProgress$.pipe(
      filter(inProgress => !inProgress),
      switchMap(() => this.companyQuery.company$),
      switchMap(companyFromStore => {
        if (!companyFromStore.uuid) {
          return this.fetchCompany(vcsId).pipe(
            filter(companyWithRepositories => !!companyWithRepositories.uuid),
            switchMap(() => this.companyQuery.company$)
          );
        }

        return of(companyFromStore);
      })
    );
  }

  fetchCompany(vcsId: number): Observable<CompanyWithRepositories> {
    this.fetchingInProgress$.next(true);

    return this.companyRepository.getCompany(vcsId).pipe(
      finalize(() => this.fetchingInProgress$.next(false)),
      tap(companyWithRepositories => this.companyStore.update(companyWithRepositories))
    );
  }
}
