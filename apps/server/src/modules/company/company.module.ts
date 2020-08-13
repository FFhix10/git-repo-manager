import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { COMPANY_ENTITIES } from './entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([...COMPANY_ENTITIES])
  ]
})

export class CompanyModule {  }
