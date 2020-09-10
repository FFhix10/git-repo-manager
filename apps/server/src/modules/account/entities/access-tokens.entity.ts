import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';

import { AccountEntity } from './account.entity';
import { CompanyEntity } from '../../company/entities/company.entity';
import { VcsServicesEntity } from '../../vcs-services/entities/vcs-services.entity';

@Entity('accessTokens')
export class AccessTokensEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  token: string;

  @Column({ type: 'boolean', nullable: false, default: true })
  isCompanyAccessToken: boolean;

  @Column({ type: 'int', nullable: true })
  accountId: number;

  @Column({ type: 'int', nullable: true })
  companyId: number;

  @Column({ type: 'int', nullable: false })
  vcsServiceId: number;

  @OneToOne(() => AccountEntity, data => data.accessToken)
  @JoinColumn()
  account: AccountEntity;

  @OneToOne(() => CompanyEntity, data => data.accessToken)
  @JoinColumn()
  company: CompanyEntity;

  @OneToOne(() => VcsServicesEntity, data => data.accessToken)
  @JoinColumn()
  vcsService: VcsServicesEntity;
}
