import { Entity, Column, PrimaryGeneratedColumn, OneToMany, OneToOne, Generated } from 'typeorm';

import { AccessTokensEntity } from './access-tokens.entity';
import { AccountEntity } from './account.entity';
import { AvailableDependenciesEntity } from './available-dependencies.entity';
import { BranchesEntity } from './branches.entity';

@Entity('company')
export class CompanyEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Generated('uuid')
  uuid: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  companyName: string;

  @Column({ type: 'varchar', length: 255, nullable: false, unique: true })
  email: string;

  @Column({ type: 'boolean', nullable: false, default: false })
  isGitHubUsed: boolean;

  @Column({ type: 'boolean', nullable: false, default: false })
  isGitLabUsed: boolean;

  @OneToMany(() => AccountEntity, data => data.company)
  account: AccountEntity;

  @OneToMany(() => AvailableDependenciesEntity, data => data.company)
  availableDependency: AvailableDependenciesEntity;

  @OneToMany(() => BranchesEntity, data => data.company)
  branches: BranchesEntity;

  @OneToOne(() => AccessTokensEntity, data => data.company)
  accessToken: AccessTokensEntity;
}
