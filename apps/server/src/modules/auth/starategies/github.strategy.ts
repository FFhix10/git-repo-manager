import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-github2';

import { Request } from 'express';

import { GitHubConfig } from '../../../configs';

interface GitHubProfile {
  id: string;
  displayName: string;
  username: string;
  profileUrl: string;
  emails: { value: string }[];
  photos: { value: string }[];
  provider: string;
  _raw: string;
  _json: {
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
    gravatar_id: string;
    url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    received_events_url: string;
    type: string;
    site_admin: boolean,
    name: string;
    company: string;
    blog: string;
    location: string;
    email: string;
    hireable: null;
    bio: string;
    twitter_username: string;
    public_repos: number;
    public_gists: number;
    followers: number;
    following: number;
    created_at: string;
    updated_at: string;
    private_gists: number;
    total_private_repos: number;
    owned_private_repos: number;
    disk_usage: string;
    collaborators: string;
    two_factor_authentication: boolean;
    plan: {
      name: string;
      space: number;
      collaborators: number;
      private_repos: number;
    }
  };
}

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
  constructor() {
    super(
      {
        callbackURL: `${process.env.APP_URL}/api/github/callback`,
        clientID: GitHubConfig.clientId,
        clientSecret: GitHubConfig.clientSecret,
      },
      async (
        accessToken: string,
        refreshToken: string,
        profile: GitHubProfile,
        done: (
          err: null | boolean,
          obj?: {
            name: string;
            email: string,
            userName: string;
            vcsId: number;
            accessToken: string;
          }
        ) => void
      ) => {
        const { _json: json } = profile;

        return done(null, {
          name: json.name,
          email: json.email,
          userName: json.login,
          vcsId: json.id,
          accessToken
        });
      }
    );
  }
}
