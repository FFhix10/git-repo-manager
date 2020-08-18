// tslint:disable-next-line
export const GitHubConfig = {
  get clientId(): string {
    return process.env.GITHUB_CLIENT_ID;
  },

  get clientSecret(): string {
    return process.env.GITHUB_CLIENT_SECRET;
  }
};
