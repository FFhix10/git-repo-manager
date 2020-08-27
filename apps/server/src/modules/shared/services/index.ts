import { CronService } from './cron.service';
import { CompanyService } from '../../company/services';
import {
  GithubRepositoriesService,
  UpdateGitHubRepositoriesService
} from '../../repositories/+github/services';
import { DependenciesService } from '../../dependencies/services';

export * from './cron.service';

export const SHARED_SERVICES = [
  CronService,
  CompanyService,
  UpdateGitHubRepositoriesService,
  DependenciesService,
  GithubRepositoriesService
];
