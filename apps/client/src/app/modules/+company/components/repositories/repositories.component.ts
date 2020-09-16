import { Component, ViewChild, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Subscription } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import { Table } from 'primeng/table';

import { CompanyQuery, CompanyService } from '../../states/company';
import { LoadingSpinnerService, SetCssClassesService } from '../../../core/services';

@Component({
  selector: 'company-repositories',
  templateUrl: './repositories.component.html',
  styleUrls: ['./repositories.component.scss']
})
export class CompanyRepositoriesComponent implements OnDestroy {
  @ViewChild('dt', { static: true }) table: Table;

  date = Date.now();
  company$ = this.companyQuery.company$;
  availableDependencies$ = this.companyQuery.availableDependencies$;
  private readonly internalSubscriptions = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private readonly companyQuery: CompanyQuery,
    private readonly companyService: CompanyService,
    private readonly loadingSpinnerService: LoadingSpinnerService,
    private readonly setCssClassesService: SetCssClassesService
  ) {
    this.loadingSpinnerService.show();

    const { vcsId } = this.route.snapshot.queryParams;
    const companySub$ = this.companyService.getOrfetchCompanyOnce(vcsId)
      .pipe(
        filter(company => !!company.uuid),
        tap(() => {
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
}
