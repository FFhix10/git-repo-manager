import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../shared/guards/auth.guard';
import { RepositoryDetailsGuard } from '../shared/guards/repository-details.guard';
import { AppComponent } from './app.component';

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
    path: '',
    // canActivate: [ AuthGuard ],
    loadChildren: './modules/company-projects/company-projects.module#CompanyProjectsModule'
  },
  {
    path: '',
    // canActivate: [ AuthGuard, RepositoryDetailsGuard ],
    loadChildren: './modules/repository-details/repository-details.module#RepositoryDetailsModule'
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(appRoutes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {  }
