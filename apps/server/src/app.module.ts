import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ClientSideMiddleware } from './middlewares/client-side.middleware';

import { AccountModule } from './modules/account/account.module';
import { AuthModule } from './modules/auth/auth.module';
import { ClientSideModule } from './modules/client-side/client-side.module';
import { CompanyModule } from './modules/company/company.module';
import { DependenciesModule } from './modules/dependencies/dependencies.module';
import { RepositoriesModule } from './modules/repositories/repositories.module';
import { SharedModule } from './modules/shared/shared.module';
import { VcsServicesModule } from './modules/vcs-services/vcs-services.module';
import { SettingsModule } from './modules/settings/settings.module';

const MODULES = [
  AccountModule,
  AuthModule,
  ClientSideModule,
  CompanyModule,
  RepositoriesModule,
  DependenciesModule,
  VcsServicesModule,
  SettingsModule,
  SharedModule,
  TypeOrmModule.forRoot()
];

@Module({
  imports: MODULES,
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
