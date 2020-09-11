import { RepositoriesForMainPage } from '../../repositories/models';

export interface CompanyWithRepositories {
  uuid: string;
  companyName: string;
  email: string;
  vcsId: number;
  logoUrl: string;
  availableDependency: {
    name: string;
    minVersion: string;
  }[];
  repositories: RepositoriesForMainPage[];
}
