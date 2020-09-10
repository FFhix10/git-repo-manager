import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AccountQuery } from '../../auth/states/account';
import { LocalStorageService } from '../../../../shared/services/local-storage.service';

@Component({
  selector: 'companies-list',
  templateUrl: './companies-list.component.html',
  styleUrls: ['./companies-list.component.scss']
})

export class CompaniesListComponent {
  companies$ = this.accountQuery.accountCompanies$;
  readonly vcsService = this.lsService.getItem('vcs_service');

  constructor(
    private readonly accountQuery: AccountQuery,
    private readonly lsService: LocalStorageService,
    private readonly router: Router
  ) {}

  navigateToRepositories(uuid: string, vcsId: number): void {
    this.router.navigate([`/companies/${uuid}/repositories`], { queryParams: { vcsId } });
  }
}
