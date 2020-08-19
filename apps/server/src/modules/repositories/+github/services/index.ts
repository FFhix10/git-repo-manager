import { GithubRepositoriesService } from './repositories.service';
import { UpdateRepositoriesService } from './update-repositories.service';
import { DependenciesService } from '../../../dependencies/services';
import { CompanyService } from '../../../company/services';

export * from './repositories.service';
export * from './update-repositories.service';

export const REPOSITORIES_SERVICES = [
  GithubRepositoriesService,
  UpdateRepositoriesService,
  CompanyService,
  DependenciesService
];
