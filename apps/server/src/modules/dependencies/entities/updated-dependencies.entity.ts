import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

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

  @ManyToOne(() => RepositoriesEntity, data => data.updatedDependency)
  @JoinColumn()
  repository: RepositoriesEntity;
}
