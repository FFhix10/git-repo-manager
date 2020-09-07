// tslint:disable-next-line
export const AppConfig = {
  get accessTokenExpiresIn(): string {
    return '20m';
  },

  get jwtPrivateKey(): string {
    return process.env.JWT || '';
  }
};
