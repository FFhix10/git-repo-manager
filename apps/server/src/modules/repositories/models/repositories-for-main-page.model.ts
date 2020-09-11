import { DependencyForMainPage } from '../../dependencies/models';

export interface RepositoriesForMainPage {
  name: string;
  isPrivate: boolean;
  isCompanyRepository: boolean;
  baseBranchDependencies: DependencyForMainPage[];
  compareBranchDependencies: DependencyForMainPage[];
}
