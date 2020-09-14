import { RepositoriesForMainPage } from './repositories-for-main-page.model';

export interface CompanyWithRepositories {
  uuid: string;
  companyName: string;
  email: string;
  vcsId: number;
  logoUrl: string;
  availableDependency: {
    name: string;
    isRequired: boolean;
    minVersion: string;
  }[];
  repositories: RepositoriesForMainPage[];
}
