import { RepositoriesToUpdate } from './repositories-to-update.model';

export interface CompaniesToUpdate {
  name: string;
  vcsId: number;
  repositories: RepositoriesToUpdate[];
  companyAccessToken: string;
  availableDependencies: string[];
}
