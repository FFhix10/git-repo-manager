import { HttpModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AUTH_CONLTOLLERS } from './controllers';
import { AUTH_STRATEGIES } from './starategies';
import { AUTH_ENTITIES } from './entities';
import { AUTH_SERVICES } from './services';

const MODULES = [
  HttpModule,
  TypeOrmModule.forFeature(AUTH_ENTITIES)
];

@Module({
  controllers: AUTH_CONLTOLLERS,
  imports: MODULES,
  exports: [],
  providers: [
    ...AUTH_STRATEGIES,
    ...AUTH_SERVICES,
  ]
})

export class AuthModule {  }
