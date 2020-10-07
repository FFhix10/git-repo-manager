import { CompaniesListComponent } from './companies-list/companies-list.component';
import { CompanyRepositoriesComponent } from './repositories/repositories.component';
import { RepositoryDetailsComponent } from './repository-details/repository-details.component';

export * from './companies-list/companies-list.component';
export * from './repositories/repositories.component';
export * from './repository-details/repository-details.component';

export const COMPANY_COMPONENTS = [
  CompaniesListComponent,
  CompanyRepositoriesComponent,
  RepositoryDetailsComponent
];
