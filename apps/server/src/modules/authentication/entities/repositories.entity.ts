import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';

import { AccountEntity } from './account.entity';
import { BranchesEntity } from './branches.entity';
import { UpdatedDependenciesEntity } from './updated-dependencies.entity';

@Entity('repositories')
export class RepositoriesEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  name: string;

  @Column({ type: 'boolean', nullable: false, default: false })
  isPrivate: boolean;

  @Column({ type: 'boolean', nullable: false, default: true })
  isCompanyRepository: boolean;

  @Column({ type: 'boolean', nullable: false, default: true })
  isChecksSuccess: boolean;

  @Column({ type: 'int', nullable: true })
  accountId: number;

  @Column({ type: 'int', nullable: true })
  baseBranchId: number;

  @Column({ type: 'int', nullable: true })
  compareBranchId: number;

  @ManyToOne(() => AccountEntity, data => data.repository)
  @JoinColumn()
  account: AccountEntity;

  @OneToMany(() => BranchesEntity, data => data.repository)
  branch: BranchesEntity;

  @OneToMany(() => UpdatedDependenciesEntity, data => data.repository)
  updatedDependency: UpdatedDependenciesEntity;
}
