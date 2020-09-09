import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CompanyProjectsComponent } from './template/company-projects.component';

export const valorProjectsRoute: Routes = [
  {
    path: '',
    component: CompanyProjectsComponent,
    children: [
      {
        path: '',
        redirectTo: '/repositories'
      }
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forChild(valorProjectsRoute) ],
  exports: [ RouterModule ]
})

export class ComapnyProjectsRoutingModule {  }
