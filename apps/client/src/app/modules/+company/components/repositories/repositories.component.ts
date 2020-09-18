import { Component, ViewChild, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Subscription } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import { Table } from 'primeng/table';

import { CompanyQuery, CompanyService } from '../../states/company';
import { LoadingSpinnerService } from '../../../core/services';
import { CompanyWithRepositories, RepositoriesForMainPage } from '../../../core/models';
import { SettingsQuery } from '../../../../../shared/settings/states';
import { Settings, SettingsNames } from '../../../../../shared/settings/models';

@Component({
  selector: 'company-repositories',
  templateUrl: './repositories.component.html',
  styleUrls: ['./repositories.component.scss']
})
export class CompanyRepositoriesComponent implements OnDestroy {
  @ViewChild('dt', { static: true }) table: Table;

  date = Date.now();
  currentPage: number;
  company: CompanyWithRepositories;
  repositories: RepositoriesForMainPage[];
  itemsPerPage: Settings = this.settingsQuery.settingSnapshot(SettingsNames.PAGINATION_ITEMS_PER_PAGE);

  company$ = this.companyQuery.company$;
  availableDependencies$ = this.companyQuery.availableDependencies$;

  private readonly internalSubscriptions = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private readonly router: Router,
    private readonly companyQuery: CompanyQuery,
    private readonly companyService: CompanyService,
    private readonly loadingSpinnerService: LoadingSpinnerService,
    private readonly settingsQuery: SettingsQuery
  ) {
    this.loadingSpinnerService.show();

    const { vcsId, page } = this.route.snapshot.queryParams;
    const companySub$ = this.companyService.getOrfetchCompanyOnce(vcsId)
      .pipe(
        filter(company => !!company.uuid),
        tap(() => {
          this.company = this.companyQuery.companySnapshot();
          this.repositories = this.company.repositories.slice(0, +this.itemsPerPage.value);

          if (page) {
            setTimeout(() => this.currentPage = +page);
            this.pageChanged({ page, itemsPerPage: +this.itemsPerPage.value }, this.company.repositories);
          } else {
            setTimeout(() => this.currentPage = 1);
          }

          this.loadingSpinnerService.hide();
        })
      ).subscribe();

    this.internalSubscriptions.add(companySub$);
  }

  ngOnDestroy(): void {
    this.internalSubscriptions.unsubscribe();
  }

  trackByFn(index: number): number {
    return index;
  }

  pageChanged(event: { page: number, itemsPerPage: number }, repositories: RepositoriesForMainPage[]) {
    this.router.navigate(
      [],
      {
        relativeTo: this.route,
        queryParams: { ...this.route.snapshot.queryParams, page: event.page }
      });

    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = event.page * event.itemsPerPage;

    this.repositories = repositories.slice(startItem, endItem);
  }
}
