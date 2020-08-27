import { Injectable } from '@nestjs/common';
import { CronJob } from 'cron';

import { GithubRepositoriesService } from '../../repositories/+github/services';

@Injectable()
export class CronService {

  constructor(
    private readonly githubRepositoriesService: GithubRepositoriesService,
  ) {
    this.updateMorning();
    this.updateEvening();
  }

  private updateMorning() {
    return new CronJob('00 00 09 * * 1-5', async () => {
      await this.githubRepositoriesService.getCompaniesRepositoriesToUpdate();
    }, null, true, 'Europe/Kiev');
  }

  private async updateEvening() {
    return new CronJob('00 00 19 * * 1-5', async () => {
      await this.githubRepositoriesService.getCompaniesRepositoriesToUpdate();
    }, null, true, 'Europe/Kiev');
  }
}
