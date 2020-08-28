import { HttpModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { COMPANY_CONTROLLERS } from './controllers';
import { COMPANY_ENTITIES } from './entities';
import { COMPANY_SERVICES } from './services';

const MODULES = [
  HttpModule,
  TypeOrmModule.forFeature(COMPANY_ENTITIES)
];

@Module({
  controllers: COMPANY_CONTROLLERS,
  imports: MODULES,
  providers: COMPANY_SERVICES
})

export class CompanyModule {  }
