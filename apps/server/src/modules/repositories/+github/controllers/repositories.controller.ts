import { Controller, Get, Query } from '@nestjs/common';

import { GithubRepositoriesService } from '../services';

@Controller('api/github/repositories')
export class GithubRepositoriesController {
  constructor(
    private readonly repositoriesService: GithubRepositoriesService
  ) {}

  @Get('')
  getRepositories(@Query('companyId') companyId: number) {
    return this.repositoriesService.getRepositoriesByCompany(companyId);
  }
}
