import { HttpModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ACCOUNT_ENTITIES } from './entities';
import { ACCOUNT_SERVICES } from './services';
import { ACCOUNT_CONTROLLERS } from './controllers';

const MODULES = [
  HttpModule,
  TypeOrmModule.forFeature(ACCOUNT_ENTITIES)
];

@Module({
  controllers: ACCOUNT_CONTROLLERS,
  imports: MODULES,
  providers: ACCOUNT_SERVICES
})

export class AccountModule {}
