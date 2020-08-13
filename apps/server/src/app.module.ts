import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ClientSideMiddleware } from './middlewares/client-side.middleware';

import { GithubRepositoriesModule } from './modules/github-repositories/github-repositories.module';
import { ClientSideModule } from './modules/client-side/client-side.module';
import { AuthModule } from './modules/authentication/auth.module';

@Module({
  imports: [
    AuthModule,
    ClientSideModule,
    TypeOrmModule.forRoot(),
    GithubRepositoriesModule,
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
