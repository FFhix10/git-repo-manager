import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

import { AccountEntity } from '../../account/entities/account.entity';
import { CompanyEntity } from '../../company/entities/company.entity';
import { VcsServicesEntity } from '../../vcs-services/entities/vcs-services.entity';

@Entity('availableDependencies')
export class AvailableDependenciesEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  minVersion: string;

  @Column({ type: 'boolean', nullable: false, default: false })
  isPrivate: boolean;

  @Column({ type: 'boolean', nullable: false, default: false })
  isRequired: boolean;

  @Column({ type: 'int', nullable: true })
  addedById: number;

  @Column({ type: 'int', nullable: false })
  companyId: number;

  @Column({ type: 'int', nullable: false })
  vcsServiceId: number;

  @ManyToOne(() => AccountEntity, data => data.availableDependency)
  @JoinColumn()
  addedBy: AccountEntity;

  @ManyToOne(() => CompanyEntity, data => data.availableDependency)
  @JoinColumn()
  company: CompanyEntity;

  @ManyToOne(() => VcsServicesEntity, data => data.availableDependency)
  @JoinColumn()
  vcsService: VcsServicesEntity;
}
