import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';

import { AccountEntity } from './account.entity';
import { CompanyEntity } from '../../company/entities/company.entity';

@Entity('accountCompany')
export class AccountCompanyEntity {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ type: 'int', nullable: false })
  accountId: number;

  @Column({ type: 'int', nullable: false })
  companyId: number;

  @ManyToOne(() => AccountEntity, data => data.accountCompany)
  @JoinColumn()
  account: AccountEntity;

  @ManyToOne(() => CompanyEntity, data => data.accountCompany)
  @JoinColumn()
  company: CompanyEntity;
}

