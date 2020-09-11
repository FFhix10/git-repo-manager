import { Get, Query, Param, Controller, BadRequestException } from '@nestjs/common';

import { CompanyService } from '../services';
import { CompanyEntity } from '../entities';
import { CompanyWithRepositories } from '../models';

@Controller('/api/companies')
export class CompanyController {

  constructor(private readonly companyService: CompanyService) {}

  @Get('')
  getCompanies(@Query('accountId') accountId: number): Promise<CompanyEntity[]> {
    return this.companyService.getCompanies(accountId);
  }

  @Get(':vcsId')
  getCompanyByVcsId(
    @Param('vcsId') vcsId: number,
    @Query('vcsService') vcsService: string
  ): Promise<CompanyWithRepositories> {
    if (!vcsId) {
      throw  new BadRequestException('No vcsId was provided');
    }

    return this.companyService.getCompanyByVcsId(vcsId, vcsService);
  }
}
