import { Injectable } from '@nestjs/common';
import { UpdateRepositoriesService } from './update-repositories.service';
import { CronJob } from 'cron';
import { GithubRepositoriesService } from '../../repositories/+github/services';

@Injectable()
export class CronService {

  constructor(
    private readonly updateRepositories: UpdateRepositoriesService,
    private readonly githubRepositoriesService: GithubRepositoriesService
  ) {
    this.updateMorning();
    this.updateEvening();
    this.update();
  }

  private updateMorning() {
    return new CronJob('00 00 09 * * 1-5',  async () => {
      await this.updateRepositories.updateRepositories();
    }, null, true, 'Europe/Kiev');
  }

  private async update() {
    await this.githubRepositoriesService.getRepositoriesToUpdate();

    return new CronJob('00 09 17 * * 1-5',  async () => {
      await this.githubRepositoriesService.getRepositoriesToUpdate();
    }, null, true, 'Europe/Kiev');
  }

  private updateEvening() {
    return new CronJob('00 00 19 * * 1-5', async () => {
      await this.updateRepositories.updateRepositories();
    }, null, true, 'Europe/Kiev');
  }

}
