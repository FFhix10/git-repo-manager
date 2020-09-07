import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthService } from '../../services';
import { LocalStorageService } from '../../../../../shared/services/local-storage.service';
import { RoutingURLs } from '../../../core/constants';

@Component({
  selector: 'callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.scss']
})

export class CallbackComponent {
  constructor(
    private readonly router: Router,
    private readonly authService: AuthService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly lsService: LocalStorageService
  ) {
    const tokens = this.activatedRoute.snapshot.queryParams;

    try {
      const { accessToken, expiresAt } = tokens;

      this.lsService.setItem('access_token', accessToken);
      this.lsService.setItem('expires_at', expiresAt);

      this.router.navigateByUrl(RoutingURLs.REPOSITORIES);
    } catch (e) {
      this.router.navigateByUrl(RoutingURLs.AUTH_LOGIN);
    }
  }
}
