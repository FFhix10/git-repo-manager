import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';

import { CompanyWithRepositories } from '../models';
import { LocalStorageService } from '../../../../shared/services/local-storage.service';

const url = 'api/companies';

@Injectable({ providedIn: 'root' })
export class CompanyRepository {
  constructor(
    private readonly http: HttpClient,
    private readonly lsService: LocalStorageService
  ) {}

  getCompany(vcsId: number): Observable<CompanyWithRepositories> {
    const vcsService = this.lsService.getItem('vcs_service');
    const params: HttpParams = new HttpParams({ fromObject: { vcsService } });

    return this.http.get<CompanyWithRepositories>(`${url}/${vcsId}`, { params });
  }
}
