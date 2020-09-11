import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CompaniesListComponent, CompanyRepositoriesComponent } from './components';

const routes: Routes = [
  {
    path: '',
    component: CompaniesListComponent
  },
  {
    path: ':uuid/repositories',
    component: CompanyRepositoriesComponent
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})

export class CompanyRoutingModule {}
