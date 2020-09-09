import { AccountTypes } from './account-types.enum';

export interface GetAccount {
  uuid: string;
  name: string;
  userName: string;
  vcsId: number;
  role: AccountTypes;
  email: string;
  companies: Company[];
}

interface Company {
  uuid: string;
  companyName: string;
  email: string;
  vcsId: number;
}
