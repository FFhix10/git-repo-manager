import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToOne, Generated, JoinColumn, OneToMany } from 'typeorm';

import { AccessTokensEntity } from './access-tokens.entity';
import { AvailableDependenciesEntity } from '../../dependencies/entities/available-dependencies.entity';
import { BranchesEntity } from '../../auth/entities/branches.entity';
import { CompanyEntity } from '../../company/entities';
import { RepositoriesEntity } from '../../repositories/entities';

@Entity('account')
export class AccountEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Generated('uuid')
  uuid: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  username: string;

  @Column({ type: 'varchar', length: 255, nullable: false, unique: true })
  email: string;

  @Column({ type: 'bigint', nullable: false, unique: true })
  vcsId: number;

  @Column({ type: 'enum', enum: ['member', 'owner'], default: 'member' })
  role: 'member' | 'owner';

  @Column({ type: 'int', nullable: false })
  companyId: number;

  @OneToMany(() => AvailableDependenciesEntity, data => data.addedBy)
  availableDependency: AvailableDependenciesEntity;

  @OneToMany(() => BranchesEntity, data => data.addedBy)
  branches: BranchesEntity;

  @ManyToOne(() => CompanyEntity, data => data.account)
  @JoinColumn()
  company: CompanyEntity;

  @OneToMany(() => RepositoriesEntity, data => data.account)
  repository: RepositoriesEntity;

  @OneToOne(() => AccessTokensEntity, data => data.account)
  accessToken: AccessTokensEntity;
}
