import { AccountTypes } from './account-types.enum';
import { Company } from './company.model';

export interface Account {
  uuid: string;
  name: string;
  userName: string;
  vcsId: number;
  role: AccountTypes;
  email: string;
  companies: Company[];
}
