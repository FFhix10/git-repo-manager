import { Injectable, ErrorHandler } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { NotificationService } from '../../../../shared/notifications/notification.service';
import { LocalStorageService } from '../../../../shared/services/local-storage.service';
import { StoreService } from '../../../../shared/services/store.service';
import { RoutingURLs } from '../../core/constants';
import { FreshTokens } from '../../core/models';
import { AccountStore } from '../states/account';

@Injectable()
export class AuthService implements ErrorHandler {
  private errorText: string;

  constructor(
    private readonly http: HttpClient,
    private readonly notificationService: NotificationService,
    private readonly store: StoreService,
    private readonly lsService: LocalStorageService,
    private readonly router: Router,
    private readonly accountStore: AccountStore
  ) {  }

  public authenticateUser(url: string) {
    window.location.href = url;
  }

  public check(): Observable<any> {
    return this.http.get(`${environment.url}/api/github/isAuthenticated`);
  }

  handleError(err: HttpErrorResponse) {
    if (err.error instanceof ErrorEvent) {
      this.errorText = `${err.error.message}`;
      console.error('An error occurred:', err.error.message);
    } else {
      this.errorText = `${err.error.error}: ${err.error.message}`;
      console.error(
        `Backend returned code ${err.status}, ` +
        `body was: ${err.error}`);
    }

    return throwError(this.errorText);
  }

  public logout() {
    this.lsService.removeItem('access_token');
    this.lsService.removeItem('expires_at');
    this.lsService.removeItem('vcs_service');
    this.accountStore.reset();
    this.router.navigate([RoutingURLs.APP_ROOT]);
  }

  parseFreshTokens(tokens: FreshTokens): void {
    const { accessToken, expiresAt, vcsService } = tokens;

    if (!accessToken || !expiresAt || !vcsService) {
      throw new Error(`Can't parse tokens: insufficient data`);
    }

    this.lsService.setItem('access_token', accessToken);
    this.lsService.setItem('expires_at', expiresAt);
    this.lsService.setItem('vcs_service', vcsService);
  }
}
