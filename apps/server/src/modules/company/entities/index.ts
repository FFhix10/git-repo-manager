import { CompanyEntity } from './company.entity';
import { VcsServicesEntity } from '../../vcs-services/entities';

export * from './company.entity';

export const COMPANY_ENTITIES = [
  CompanyEntity,
  VcsServicesEntity
];
