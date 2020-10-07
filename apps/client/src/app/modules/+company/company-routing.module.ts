import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CompaniesListComponent, CompanyRepositoriesComponent, RepositoryDetailsComponent } from './components';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: CompaniesListComponent
  },
  {
    path: ':uuid/repositories',
    component: CompanyRepositoriesComponent
  },
  {
    path: ':uuid/repositories/:repository',
    component: RepositoryDetailsComponent
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})

export class CompanyRoutingModule {}
