import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { tap } from 'rxjs/operators';

import { RoutingURLs } from './modules/core/constants';
import { Account } from './modules/core/models';
import { AccountService } from './modules/auth/states/account';
import { LocalStorageService } from '../shared/services/local-storage.service';

@Component({
  selector: 'app-root',
  template: ``
})

export class AppComponent {
  private account: Account;

  constructor(
    private readonly router: Router,
    private readonly accountService: AccountService
  ) {
    this.accountService.getOrFetchAccountOnce()
      .pipe(tap(account => this.account = account))
      .subscribe(
        () => {
          if (this.account) {
            return this.router.navigateByUrl(RoutingURLs.REPOSITORIES);
          }

          return this.router.navigateByUrl(RoutingURLs.AUTH_LOGIN);
        },
        () => {
          this.router.navigateByUrl(RoutingURLs.AUTH_LOGIN);
        }
      );
  }
}
