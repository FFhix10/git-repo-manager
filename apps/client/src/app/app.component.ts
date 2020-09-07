import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { RoutingURLs } from './modules/core/constants';
import { AccountService } from './modules/auth/services';
import { LocalStorageService } from '../shared/services/local-storage.service';

@Component({
  selector: 'app-root',
  template: ``
})

export class AppComponent {
  constructor(
    private readonly router: Router,
    private readonly accountService: AccountService,
    private readonly lsService: LocalStorageService
  ) {
    try {
      const accessToken = this.lsService.getItem('access_token');
      this.accountService.getAccountData(accessToken);

      this.router.navigateByUrl(RoutingURLs.AUTH_LOGIN);
    } catch (e) {
      this.router.navigateByUrl(RoutingURLs.AUTH_LOGIN);
    }
  }
}
