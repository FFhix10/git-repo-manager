import { Injectable, HttpService, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository, SelectQueryBuilder } from 'typeorm';

import { CompanyEntity } from '../entities';
import { VcsServices } from '../models';

@Injectable()
export class CompanyService {

  constructor(
    private readonly http: HttpService,
    @InjectRepository (CompanyEntity)
    private readonly companyRepository: Repository<CompanyEntity>
  ) {}

  repository(): Repository<CompanyEntity> {
    return this.companyRepository;
  }

  getCompanyByOptions(options, selection: string[]): Promise<CompanyEntity> {
    return this.queryBuilder('cm')
      .where(options)
      .select(selection)
      .getOne();
  }

  getAllUserCompaniesFromVcs(
    userName: string,
    vcsService: string,
    accessToken: string
  ): Promise<any> {
    let url;

    switch (vcsService) {
      case VcsServices.GITHUB:
        url = `https://api.github.com/user/orgs`;
        break;
      default:
        throw new BadRequestException('VCS Not Defined');
    }

    const headsOptions = {
      headers: {
        authorization: `token ${accessToken}`
      }
    };

    return this.http.get(url, headsOptions)
      .toPromise();
  }

  getCompanyFromVcs(
    companyName: string,
    userName: string,
    vcsService: string,
    accessToken: string
  ): Promise<any> {
    let url;

    switch (vcsService) {
      case VcsServices.GITHUB:
        url = `https://api.github.com/orgs/${companyName}/memberships/${userName}`;
        break;
      default:
        throw new BadRequestException('VCS Not Defined');
    }

    const headsOptions = {
      headers: {
        authorization: `token ${accessToken}`
      }
    };

    return this.http.get(url, headsOptions).toPromise();
  }

  addCompany() {}

  queryBuilder(alias: string): SelectQueryBuilder<CompanyEntity> {
    return this.companyRepository.createQueryBuilder(alias);
  }
}
