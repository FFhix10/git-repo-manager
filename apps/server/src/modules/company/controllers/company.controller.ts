import { Get, Query, Controller } from '@nestjs/common';

import { CompanyService } from '../services';
import { CompanyEntity } from '../entities';

@Controller('/api/companies')
export class CompanyController {

  constructor(private readonly companyService: CompanyService) {}

  @Get('')
  getCompanies(@Query('accountId') accountId: number): Promise<CompanyEntity[]> {
    return this.companyService.getCompanies(accountId);
  }
}
