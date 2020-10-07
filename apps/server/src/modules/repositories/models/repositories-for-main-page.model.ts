import { DependencyForMainPage } from '../../dependencies/models';

export interface RepositoriesForMainPage {
  name: string;
  isPrivate: boolean;
  updatedAt: number;
  isCompanyRepository: boolean;
  baseBranchDependencies: DependencyForMainPage[];
  compareBranchDependencies: DependencyForMainPage[];
}
