import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

import { AccountEntity } from '../../account/entities/account.entity';
import { CompanyEntity } from '../../company/entities/company.entity';
import { VcsServicesEntity } from './vcs-services.entity';
import { RepositoriesEntity } from '../../repositories/entities';

@Entity('branches')
export class BranchesEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  name: string;

  @Column({ type: 'enum', enum: ['base', 'compare'], nullable: false, default: 'base' })
  type: 'base' | 'compare';

  @Column({ type: 'boolean', nullable: false, default: false })
  isPrivate: boolean;

  @Column({ type: 'text', nullable: true })
  aliases: string;

  @Column({ type: 'int', nullable: true })
  addedById: number;

  @Column({ type: 'int', nullable: false })
  companyId: number;

  @Column({ type: 'int', nullable: false })
  vscServiceId: boolean;

  @Column({ type: 'int', nullable: false })
  repositoryId: number;

  @ManyToOne(() => AccountEntity, data => data.branches)
  @JoinColumn()
  addedBy: AccountEntity;

  @ManyToOne(() => CompanyEntity, data => data.branches)
  @JoinColumn()
  company: CompanyEntity;

  @ManyToOne(() => VcsServicesEntity, data => data.branches)
  @JoinColumn()
  vcsService: VcsServicesEntity;

  @ManyToOne(() => RepositoriesEntity, data => data.branch)
  @JoinColumn()
  repository: RepositoriesEntity;
}
