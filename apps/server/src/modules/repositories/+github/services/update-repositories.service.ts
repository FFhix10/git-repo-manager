import { Injectable, HttpService } from '@nestjs/common';

import { CompaniesToUpdate } from '../models';
import { GithubRepositoriesService } from './repositories.service';

@Injectable()
export class UpdateRepositoriesService {
  constructor(
    private readonly http: HttpService,
    private readonly githubRepositoriesService: GithubRepositoriesService
  ) {}

  /*async updateCompanyRepositories(): Promise<any> {
    const companies: CompaniesToUpdate[] = await this.githubRepositoriesService.getRepositoriesToUpdate().then().catch();

    console.log(companies);

    return 1;
  }*/
}
