import { DependencyForMainPage } from './dependency-for-main-page.model';

export interface RepositoriesForMainPage {
  name: string;
  isPrivate: boolean;
  isCompanyRepository: boolean;
  baseBranchDependencies: DependencyForMainPage[];
  compareBranchDependencies: DependencyForMainPage[];
}
