import { GithubRepositoriesService } from './repositories.service';
import { UpdateGitHubRepositoriesService } from './update-repositories.service';
import { DependenciesService } from '../../../dependencies/services';
import { CompanyService } from '../../../company/services';
import { VcsServicesService } from '../../../vcs-services/services/vcs-services.service';

export * from './repositories.service';
export * from './update-repositories.service';

export const REPOSITORIES_SERVICES = [
  GithubRepositoriesService,
  UpdateGitHubRepositoriesService,
  CompanyService,
  DependenciesService,
  VcsServicesService
];
