import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompanyRoutingModule } from './company-routing.module';
import { CompaniesListComponent } from './companies-list/companies-list.component';

const COMPANY_MODULES = [
  CommonModule,
  CompanyRoutingModule
];

const COMPANY_DECLARATIONS = [
  CompaniesListComponent
];

@NgModule({
  declarations: COMPANY_DECLARATIONS,
  imports: COMPANY_MODULES
})

export class CompanyModule {}
