import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../shared/guards/auth.guard';
import { RepositoryDetailsGuard } from '../shared/guards/repository-details.guard';
import { AppComponent } from './app.component';
import { AccountResolverGuard } from './modules/core/guards/account-resolver.guard';

export const appRoutes: Routes = [
  {
    path: '',
    component: AppComponent
  },
  {
    path: 'auth',
    loadChildren: './modules/auth/auth.module#AuthModule'
  },
  {
    path: 'companies',
    canActivate: [ AccountResolverGuard ],
    loadChildren: './modules/company/company.module#CompanyModule'
  },
  {
    path: 'companies/:uuid/repositories',
    canActivate: [AccountResolverGuard],
    loadChildren: './modules/company-projects/company-projects.module#CompanyProjectsModule'
  },
  {
    path: 'repositories/:repository',
    // canActivate: [ AuthGuard, RepositoryDetailsGuard ],
    loadChildren: './modules/repository-details/repository-details.module#RepositoryDetailsModule'
  },
  {
    path: '**',
    redirectTo: '404'
  },
  {
    path: '404',
    loadChildren: './modules/+not-found/not-found.module#NotFoundModule'
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(appRoutes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {  }
