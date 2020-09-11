import { CompanyService } from './company.service';
import { VcsServicesService } from '../../vcs-services/services';

export * from './company.service';

export const COMPANY_SERVICES = [CompanyService, VcsServicesService];
