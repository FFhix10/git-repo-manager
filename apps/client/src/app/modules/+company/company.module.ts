import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompanyRoutingModule } from './company-routing.module';
import { COMPANY_COMPONENTS } from './components';
import { HeaderModule } from '../../../shared/header/header.module';
import { TimestampPipe } from '../../../shared/pipes/timestamp.pipe';
import { PipesModule } from '../../../shared/pipes/pipes.module';

const COMPANY_MODULES = [
  CommonModule,
  HeaderModule,
  PipesModule,
  CompanyRoutingModule
];

@NgModule({
  declarations: COMPANY_COMPONENTS,
  imports: COMPANY_MODULES
})

export class CompanyModule {}
