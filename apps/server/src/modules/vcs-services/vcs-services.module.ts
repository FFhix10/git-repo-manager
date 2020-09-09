import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { VCS_SERVICES_ENTITIES } from './entities';
import { VCS_SERVICES_SERVICES } from './services';

const VCS_SERVICES_MODULES = [
  TypeOrmModule.forFeature(VCS_SERVICES_ENTITIES)
];

@Module({
  imports: VCS_SERVICES_MODULES,
  providers: [ ...VCS_SERVICES_SERVICES ]
})

export class VcsServicesModule {}
