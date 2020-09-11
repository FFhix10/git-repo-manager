import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Subscription } from 'rxjs';
import { filter, tap } from 'rxjs/operators';

import { CompanyQuery, CompanyService } from '../../states/company';
import { LoadingSpinnerService } from '../../../core/services';

@Component({
  selector: 'company-repositories',
  templateUrl: './repositories.component.html',
  styleUrls: ['./repositories.component.scss']
})
export class CompanyRepositoriesComponent implements OnDestroy {
  date = Date.now();
  company$ = this.companyQuery.company$;
  private readonly internalSubscriptions = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private readonly companyQuery: CompanyQuery,
    private readonly companyService: CompanyService,
    private readonly loadingSpinnerService: LoadingSpinnerService
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
}
