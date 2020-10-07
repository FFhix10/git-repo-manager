import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Subscription } from 'rxjs';
import { filter, tap } from 'rxjs/operators';

import { CompanyQuery, CompanyService } from '../../states/company';
import { LocalStorageService } from '../../../../../shared/services/local-storage.service';
import { RepositoriesForMainPage } from '../../../core/models';
import { LoadingSpinnerService } from '../../../core/services';

@Component({
  selector: 'repository-details',
  templateUrl: './repository-details.component.html',
  styleUrls: ['./repository-details.component.scss']
})
export class RepositoryDetailsComponent implements OnDestroy {
  repository: RepositoriesForMainPage;

  readonly vcsService: string;

  private repositoryName: string;
  private repositoryUuid: string;
  private readonly internalSubscriptions = new Subscription();

  constructor(
    private readonly route: ActivatedRoute,
    private readonly companyQuery: CompanyQuery,
    private readonly companyService: CompanyService,
    private readonly loadingSpinnerService: LoadingSpinnerService,
    private readonly lsService: LocalStorageService
  ) {
    this.loadingSpinnerService.show();

    try {
      this.vcsService = this.lsService.getItem('vcs_service');
    } catch (e) {
      this.vcsService = '';
    }

    const { uuid,  repository } = this.route.snapshot.params;
    const vcsId = this.lsService.getItem('vcsId');
    const companySub$ = this.companyService.getOrFetchCompany(vcsId)
      .pipe(
        filter(company => !!company.uuid),
        tap(() => {
          this.repositoryUuid = uuid;
          this.repositoryName = repository.replace('%', '/');
          this.repository = this.companyQuery.repositorySnapshot(this.repositoryName);

          this.loadingSpinnerService.hide();
        })
      ).subscribe();

    this.internalSubscriptions.add(companySub$);
  }

  ngOnDestroy(): void {
    this.internalSubscriptions.unsubscribe();
  }
}
