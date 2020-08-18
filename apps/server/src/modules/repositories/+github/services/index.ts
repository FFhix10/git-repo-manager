import { RepositoriesService } from './repositories.service';
import { UpdateRepositoriesService } from './update-repositories.service';
import { DependenciesService } from '../../../dependencies/services';

export * from './repositories.service';
export * from './update-repositories.service';

export const REPOSITORIES_SERVICES = [
  RepositoriesService,
  UpdateRepositoriesService,
  DependenciesService
];
