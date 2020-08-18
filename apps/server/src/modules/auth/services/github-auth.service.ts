import { Injectable, HttpService } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { LayerService } from './layer.service';
import { AuthInterface } from '../../../interfaces/auth.interface';
import { UserDataInterface } from '../../../interfaces/user-data.interface';
import { AccessTokensEntity } from '../../account/entities';
import { CompanyEntity } from '../../company/entities';
import { AccountEntity } from '../../account/entities';
import { CompanyService } from '../../company/services';

@Injectable()
export class GithubAuthService {

  public userAuthOrganization: string;

  constructor(
    private readonly layer: LayerService,
    private readonly http: HttpService,
    @InjectRepository (AccessTokensEntity)
    private readonly accessTokenRepository: Repository<AccessTokensEntity>,
    @InjectRepository (AccountEntity)
    private readonly accountEntity: Repository<AccountEntity>,
    @InjectRepository (CompanyEntity)
    private readonly companyRepository: Repository<CompanyEntity>
  ) {  }

  public async checkForOrganization(authData: AuthInterface) {
    this.userAuthOrganization = authData.organization;
    // return await this.layer.getOrgData(authData);
    return 1;
  }

  public async saveLoggedInUser(userData: UserDataInterface) {
    return await this.layer.saveLoggedInUser(userData);
  }

  public async getUserOrgStatus(orgName: string, userLogin: string, accessToken: string) {
    const { data } = await this.http.get(`https://api.github.com/orgs/${orgName}/memberships/${userLogin}?access_token=${accessToken}`)
      .toPromise();

    return data.role;
  }

  public async getUserInfo(authToken: string) {
    return await this.layer.getUserData(authToken);
  }

  public async getUserOrganizations(accessToken: string) {
    const headsOptions = {
      headers: {
        authorization: `token ${accessToken}`
      }
    };

    const orgs = await this.http
      .get('https://api.github.com/user/orgs', headsOptions)
      .toPromise();

    return orgs.data;
  }
}
