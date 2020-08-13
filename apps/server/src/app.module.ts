import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ClientSideMiddleware } from './middlewares/client-side.middleware';

import { AuthModule } from './modules/auth/auth.module';
import { ClientSideModule } from './modules/client-side/client-side.module';
import { CompanyModule } from './modules/company/company.module';
import { GithubRepositoriesModule } from './modules/github-repositories/github-repositories.module';

const MODULES = [
  AuthModule,
  ClientSideModule,
  CompanyModule,
  GithubRepositoriesModule
];

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    ...MODULES
  ],
  exports: [],
  providers: []
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(ClientSideMiddleware)
      .forRoutes({
        path: '/',
        method: RequestMethod.ALL
      });
  }
}
