import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TableModule } from 'primeng/table';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { PaginationModule } from 'ngx-bootstrap/pagination';

import { CompanyRoutingModule } from './company-routing.module';
import { COMPANY_COMPONENTS } from './components';
import { COMPANY_CONTAINERS } from './containers';
import { HeaderModule } from '../../../shared/header/header.module';
import { PipesModule } from '../../../shared/pipes/pipes.module';

const COMPANY_MODULES = [
  CommonModule,
  HeaderModule,
  PipesModule,
  TableModule,
  FormsModule,
  TooltipModule.forRoot(),
  PaginationModule.forRoot(),
  ReactiveFormsModule,
  CompanyRoutingModule
];

@NgModule({
  declarations: [ ...COMPANY_COMPONENTS, COMPANY_CONTAINERS ],
  imports: COMPANY_MODULES
})

export class CompanyModule {}
