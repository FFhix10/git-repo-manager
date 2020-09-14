import { BranchesRowComponent } from './branches-row/branches-row.component';
import { DynamicHeaderValueComponent } from './dynamic-header-value/dynamic-header-value.component';
import { DynamicRowValueComponent } from './dynamic-row-value/dynamic-row-value.component';

export * from './branches-row/branches-row.component';
export * from './dynamic-header-value/dynamic-header-value.component';
export * from './dynamic-row-value/dynamic-row-value.component';

export const COMPANY_CONTAINERS = [
  BranchesRowComponent,
  DynamicHeaderValueComponent,
  DynamicRowValueComponent
];
