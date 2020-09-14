import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableModule } from 'primeng/table';

import { CompanyRoutingModule } from './company-routing.module';
import { COMPANY_COMPONENTS } from './components';
import { COMPANY_CONTAINERS } from './containers';
import { HeaderModule } from '../../../shared/header/header.module';
import { TimestampPipe } from '../../../shared/pipes/timestamp.pipe';
import { PipesModule } from '../../../shared/pipes/pipes.module';

const COMPANY_MODULES = [
  CommonModule,
  HeaderModule,
  PipesModule,
  TableModule,
  CompanyRoutingModule
];

@NgModule({
  declarations: [ ...COMPANY_COMPONENTS, COMPANY_CONTAINERS ],
  imports: COMPANY_MODULES
})

export class CompanyModule {}
