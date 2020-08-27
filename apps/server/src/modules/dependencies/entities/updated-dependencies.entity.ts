import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

import { BranchesEntity } from '../../auth/entities/branches.entity';
import { RepositoriesEntity } from '../../repositories/entities/repositories.entity';

@Entity('updatedDependencies')
export class UpdatedDependenciesEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  name: string;

  @Column({ type: 'text', nullable: true })
  value: string;

  @Column({ type: 'int', nullable: false })
  repositoryId: number;

  @Column({ type: 'int', nullable: false })
  branchId: number;

  @Column({ type: 'bigint', nullable: false })
  updatedAt: number;

  @ManyToOne(() => RepositoriesEntity, data => data.updatedDependency)
  @JoinColumn()
  repository: RepositoriesEntity;

  @ManyToOne(() => BranchesEntity, data => data.updatedDependency)
  @JoinColumn()
  branch: BranchesEntity;
}
