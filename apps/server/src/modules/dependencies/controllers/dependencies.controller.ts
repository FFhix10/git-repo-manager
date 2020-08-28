import { Get, Query, Controller} from '@nestjs/common';

import { DependenciesService } from '../services';
import { AvailableDependenciesEntity } from '../entities';
import { VcsServicesIds } from '../../shared/models';

@Controller('api/dependencies')
export class DependenciesController {
  constructor(private readonly dependenciesService: DependenciesService) {}

  @Get('/available-dependencies')
  getAvailableDependencies(
    @Query('companyId') companyId: number,
    @Query('vcsServiceId') vcsServiceId: VcsServicesIds
  ): Promise<AvailableDependenciesEntity[]> {
    return this.dependenciesService.getAvailableRepositoriesForCompany(companyId, vcsServiceId);
  }
}
