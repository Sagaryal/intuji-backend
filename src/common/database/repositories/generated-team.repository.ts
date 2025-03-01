import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { GeneratedTeamEntity } from '../entities/generated-team.entity';

export class GeneratedTeamRepository extends Repository<GeneratedTeamEntity> {
  constructor(
    @InjectRepository(GeneratedTeamEntity)
    private repository: Repository<GeneratedTeamEntity>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
}
