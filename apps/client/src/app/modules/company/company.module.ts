import { NgModule } from '@angular/core';

import { CompanyRoutingModule } from './company-routing.module';

const COMPANY_MODULES = [
  CompanyRoutingModule
];

@NgModule({
  imports: COMPANY_MODULES
})

export class CompanyModule {}
