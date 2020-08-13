import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

import { AccessTokensEntity } from './access-tokens.entity';
import { AvailableDependenciesEntity } from './available-dependencies.entity';
import { BranchesEntity } from './branches.entity';

@Entity('vcsServices')
export class VcsServicesEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: '255', nullable: false, unique: true })
  name: string;

  @OneToMany(() => AvailableDependenciesEntity, data => data.vcsService)
  availableDependency: AvailableDependenciesEntity;

  @OneToMany(() => BranchesEntity, data => data.vcsService)
  branches: BranchesEntity;

  @OneToMany(() => AccessTokensEntity, data => data.vcsService)
  accessToken: AccessTokensEntity;
}
