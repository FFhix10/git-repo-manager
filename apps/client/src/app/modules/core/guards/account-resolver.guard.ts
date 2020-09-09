import { Injectable } from '@angular/core';
import {
  Router,
  UrlTree,
  CanActivate,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';

import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { RoutingURLs } from '../constants';
import { AccountService } from '../../auth/states/account';

@Injectable({ providedIn: 'root' })
export class AccountResolverGuard implements CanActivate {

  constructor(
    private readonly router: Router,
    private readonly accountService: AccountService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | boolean | UrlTree {
    return this.accountService.getOrFetchAccountOnce().pipe(
      catchError(() => of(false)),
      map(account => {
        if (account) {
          return this.router.parseUrl(RoutingURLs.REPOSITORIES);
        }

        return true;
      })
    );
  }
}
