import { Controller, Query, Get, BadRequestException } from '@nestjs/common';

import { AccountService } from '../services';
import { GetAccount } from '../models';

@Controller('api/account')
export class AccountController {

  constructor(private readonly accountService: AccountService) {}

  @Get('')
  getAccount(
    @Query('accessToken') accessToken: string,
    @Query('vcsService') vcsService: string
  ): Promise<GetAccount> {
    if (!accessToken || accessToken === 'null') {
      throw new BadRequestException();
    }

    return this.accountService.getAccountByToken(accessToken, vcsService);
  }
}
