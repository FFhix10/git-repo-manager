import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
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

  canActivate(): Observable<boolean> | boolean {
    return this.accountService.getOrFetchAccountOnce()
      .pipe(
        catchError(() => of (false)),
        map(account => {
          if (account) {
            return true;
          }

          this.router.navigate([RoutingURLs.AUTH_LOGIN]);
          return false;
        })
      );
  }
}
