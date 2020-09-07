import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../app/modules/auth/services/auth.service';
import { AuthDataInterface } from '../interfaces/auth-data.interface';
import { RoutingURLs } from '../../app/modules/core/constants';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent {
  @Input() lastUpdate: string;
  @Input() dataSource: string;
  @Input() userData: AuthDataInterface;

  constructor(
    private readonly auth: AuthService,
    private readonly router: Router
  ) {}

  public logout() {
    this.auth.logout();
  }

  public setDataSource(dataSource: string) {
    switch (dataSource) {
      case 'github':
        return 'GitHub';
      case 'gitlab':
        return 'GitLab';
    }
  }
}
