import { Controller, Query, Get, BadRequestException } from '@nestjs/common';

import { AccountService } from '../services';

@Controller('api/account')
export class AccountController {

  constructor(private readonly accountService: AccountService) {}

  @Get('')
  getAccount(@Query('access_token') accessToken: string) {
    if (!accessToken) {
      throw new BadRequestException();
    }

    return this.accountService.getAccountByToken(accessToken);
  }
}
