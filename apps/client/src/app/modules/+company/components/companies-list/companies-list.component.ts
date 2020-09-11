import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AccountQuery } from '../../../auth/states/account';

@Component({
  selector: 'companies-list',
  templateUrl: './companies-list.component.html',
  styleUrls: ['./companies-list.component.scss']
})

export class CompaniesListComponent {
  companies$ = this.accountQuery.accountCompanies$;

  constructor(
    private readonly router: Router,
    private readonly accountQuery: AccountQuery
  ) {}

  navigateToRepositories(uuid: string, vcsId: number): void {
    this.router.navigate([`/companies/${uuid}/repositories`], { queryParams: { vcsId } });
  }
}
