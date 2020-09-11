import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';

import { CompanyWithRepositories, RepositoriesForMainPage } from '../../../core/models';

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'company', resettable: true })
export class CompanyStore extends Store<CompanyWithRepositories>{
  constructor() {
    const init: CompanyWithRepositories = {
      uuid: '',
      companyName: '',
      email: '',
      vcsId: null,
      logoUrl: '',
      availableDependency: [],
      repositories: []
    };

    super(init);
  }
}
