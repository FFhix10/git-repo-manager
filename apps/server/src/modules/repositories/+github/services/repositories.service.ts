import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { RepositoriesEntity } from '../../entities';
import { DependenciesService } from '../../../dependencies/services';

@Injectable()
export class RepositoriesService {
  constructor(
    @InjectRepository(RepositoriesEntity)
    private readonly repositoriesEntity: Repository<RepositoriesEntity>,
    private readonly dependenciesService: DependenciesService
  ) {}


  async updateRepositories() {
    
  }
}
