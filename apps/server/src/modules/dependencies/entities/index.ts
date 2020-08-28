import { AvailableDependenciesEntity } from './available-dependencies.entity';
import { UpdatedDependenciesEntity } from './updated-dependencies.entity';
import { BranchesEntity } from '../../auth/entities/branches.entity';

export * from './updated-dependencies.entity';
export * from './available-dependencies.entity';

export const DEPENDENCIES_ENTITIES = [ AvailableDependenciesEntity, UpdatedDependenciesEntity, BranchesEntity ];
