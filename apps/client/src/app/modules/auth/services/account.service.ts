import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { environment } from '../../../../environments/environment';

const appUrl = environment.url;

@Injectable({ providedIn: 'root' })
export class AccountService {
  constructor(
    private readonly http: HttpClient
  ) {}

  getAccountData(accessToken: string) {
    const params: HttpParams = new HttpParams({ fromObject: { access_token: accessToken } });

    return this.http.get(`${appUrl}/api/account`, { params }).subscribe();
  }
}
