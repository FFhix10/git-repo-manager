import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthService } from '../../services';
import { RoutingURLs } from '../../../core/constants';
import { FreshTokens } from '../../../core/models';

@Component({
  selector: 'callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.scss']
})

export class CallbackComponent {
  constructor(
    private readonly router: Router,
    private readonly authService: AuthService,
    private readonly activatedRoute: ActivatedRoute
  ) {
    const tokens = this.activatedRoute.snapshot.queryParams;

    try {
      this.authService.parseFreshTokens(tokens as FreshTokens);
      this.router.navigateByUrl(RoutingURLs.COMPANIES_LIST);
    } catch (e) {
      this.router.navigateByUrl(RoutingURLs.AUTH_LOGIN);
    }
  }
}
