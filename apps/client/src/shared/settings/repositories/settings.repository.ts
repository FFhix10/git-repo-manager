import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { Settings } from '../models';

@Injectable({ providedIn: 'root' })
export class SettingsRepository {
  private readonly pathUrl: string = 'api/settings';

  constructor(private readonly http: HttpClient) {}

  getSettings(): Observable<Settings[]> {
    return this.http.get<Settings[]>(this.pathUrl);
  }
}
