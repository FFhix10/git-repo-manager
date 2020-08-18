import { Controller, Post, Get, Body, UseGuards, Req, Res, Next } from '@nestjs/common';
import { GithubAuthService } from '../services/github-auth.service';
import { AuthGuard } from '@nestjs/passport';

import { authenticate } from 'passport';
import { NextFunction, Request, Response } from 'express';

import { Cookies } from '../../../decorators/cookies.decorator';
import { AccountService } from '../../account/services';

@Controller('api/github')
export class GithubAuthController {

  constructor(
    private readonly githubAuth: GithubAuthService,
    private readonly accountService: AccountService
  ) {  }

  @Get('login')
  @UseGuards(AuthGuard('github'))
  gitHubLogin() {  }

  @Get('callback')
  gitHubAuthCallback(
    @Req() req: Request,
    @Res() res: Response,
    @Next() next: NextFunction
  ): void {
    authenticate(
      'github',
      async (
        err,
        {
          name,
          email,
          userName,
          vcsId,
          accessToken
        }: {
          name: string;
          email: string;
          userName: string;
          vcsId: number;
          accessToken: string
        }
      ) => {
        if (err) {
          return res.redirect('back');
        }

        try {
          const { accessToken: authAccessToken, expiresAt } = await this.accountService
            .addAccount({ name, email, userName, vcsId, accessToken });

          return res.redirect(`../../repositories/?accessToken=${authAccessToken}&expiresAt=${expiresAt}`);
        } catch (error) {
          console.error(error);
          return res.redirect('back');
        }
      }
    )(req, res, next);
  }

  @Get('user')
  async getUser(@Req() req) {
    return await this.githubAuth.getUserInfo(req.cookies['_auth_token']);
  }

  @Get('isAuthenticated')
  checkIfUserAuthenticated(@Cookies() cookies) {
    if (!cookies['_auth_token']) {
      return false;
    }
    else {
      return true;
    }
  }

  @Get('logout')
  logOut(@Res() res) {
    res.clearCookie('_auth_token');
    res.redirect('../../login');
  }
}
