import { HttpModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ACCOUNT_ENTITIES } from './entities';
import { ACCOUNT_SERVICES } from './services';

const MODULES = [
  HttpModule,
  TypeOrmModule.forFeature(ACCOUNT_ENTITIES)
];

@Module({
  controllers: [],
  imports: MODULES,
  providers: ACCOUNT_SERVICES
})

export class AccountModule {}
