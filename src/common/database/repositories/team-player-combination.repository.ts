import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { TeamPlayerCombinationEntity } from '../entities/team-player-combination.entity';

export class TeamPlayerCombinationRepository extends Repository<TeamPlayerCombinationEntity> {
  constructor(
    @InjectRepository(TeamPlayerCombinationEntity)
    private repository: Repository<TeamPlayerCombinationEntity>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
}
