import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Account } from '../models';
import { LocalStorageService } from '../../../../shared/services/local-storage.service';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AccountRepository {
  private readonly pathUser = 'api/account';

  constructor(
    private readonly http: HttpClient,
    private readonly lsService: LocalStorageService
  ) {}

  getAccount(): Observable<Account> {
    const url = `${this.pathUser}`;
    const accessToken = this.lsService.getItem('access_token');
    const vcsService = this.lsService.getItem('vcs_service');
    const params: HttpParams = new HttpParams({ fromObject: { accessToken, vcsService } });

    return this.http.get<Account>(url, { params });
  }
}

